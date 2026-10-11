#!/usr/bin/env python3
"""Maintainer: vendor reviewed Ship skills so learner app copies work in Code.

No network, producer credential or learner file operation is required. Run against
an exact, clean plugin checkout before publishing the reviewed base version.
"""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

TASKS = ["product-prd-builder", "base-app-setup", "app-make-it-yours", "feature-planner", "feature-builder",
         "feature-checker", "uat-builder", "go-live", "product-hardener", "pilot-reviewer"]
SKILLS = TASKS + ["start-app-setup"] + [f"start-week-{week}" for week in range(13, 22)]


def changed_since_vendored(output: Path, receipt: Path):
    """Files in the vendored folders that no longer match the last receipt (edited, added or removed)."""
    if not receipt.exists():
        return ["no receipt: these skill folders were not put here by this script"]
    last = json.loads(receipt.read_text())
    changed = [file for file, digest in last["files"].items()
               if not (output / file).is_file() or hashlib.sha256((output / file).read_bytes()).hexdigest() != digest]
    for name in last["skills"]:
        for file in sorted((output / name).rglob("*")):
            relative = str(file.relative_to(output))
            if file.is_file() and file.name != ".DS_Store" and relative not in last["files"]:
                changed.append(relative)
    return changed


def check(destination: Path):
    """Read-only drift check for CI: the installed skills must match the manifest, byte for byte."""
    destination = destination.resolve()
    receipt = destination / ".claude" / "ship-skills-manifest.json"
    if not receipt.is_file():
        raise ValueError("No .claude/ship-skills-manifest.json: the vendored skills have no receipt.")
    manifest = json.loads(receipt.read_text())
    if manifest["skills"] != SKILLS:
        raise ValueError("The manifest's skill list differs from SKILLS in scripts/vendor-ship-skills.py.")
    drift = changed_since_vendored(destination / ".claude" / "skills", receipt)
    if drift:
        raise ValueError(f"{len(drift)} vendored skill file(s) differ from the manifest (edited, added or missing): "
                         + ", ".join(drift[:10]) + ". Skills are changed only by running this script against the plugin.")
    print(f"Vendored Ship skills match the manifest: {len(SKILLS)} skills / {len(manifest['files'])} files, "
          f"plugin {manifest['version']} at {manifest['sourceCommit']}.")


def vendor(source: Path, destination: Path, replace: bool = False):
    source = source.resolve()
    destination = destination.resolve()
    commit = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=source, text=True).strip()
    dirty = subprocess.check_output(["git", "status", "--porcelain", "--", ".claude-plugin/plugin.json", "skills"], cwd=source, text=True)
    if dirty:
        raise ValueError("Commit the reviewed plugin source first; refusing an unrecorded snapshot.")
    plugin = json.loads((source / ".claude-plugin/plugin.json").read_text())
    inventory = {}
    for name in SKILLS:
        folder = source / "skills" / name
        if not (folder / "SKILL.md").is_file():
            raise ValueError(f"Missing required Ship skill: {name}")
        for file in sorted(folder.rglob("*")):
            if file.is_symlink():
                raise ValueError(f"Refusing linked skill resource: {file.name}")
            if file.is_file() and file.name != ".DS_Store":
                relative = str(file.relative_to(source / "skills"))
                inventory[relative] = hashlib.sha256(file.read_bytes()).hexdigest()
    manifest = {"plugin": plugin["name"], "version": plugin["version"],
                "sourceCommit": commit, "skills": SKILLS, "files": inventory}
    receipt = destination / ".claude" / "ship-skills-manifest.json"
    output = destination / ".claude" / "skills"
    if any((output / name).exists() for name in SKILLS):
        if receipt.exists() and json.loads(receipt.read_text()) == manifest:
            if all((output / file).is_file() and hashlib.sha256((output / file).read_bytes()).hexdigest() == digest for file, digest in inventory.items()):
                print("Ship skills already match the reviewed snapshot; no files changed.")
                return
        if not replace:
            raise ValueError("Existing Ship skills differ. Run again with --replace to bring them up to date.")
        changed = changed_since_vendored(output, receipt)
        if changed:
            raise ValueError("These skill files were changed by hand since they were last brought in; "
                             "nothing was replaced: " + ", ".join(changed[:10]))
        for name in set(SKILLS) | set(json.loads(receipt.read_text())["skills"]):
            shutil.rmtree(output / name, ignore_errors=True)
    output.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ship-skills-") as staging:
        stage = Path(staging)
        for relative, digest in inventory.items():
            target = stage / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source / "skills" / relative, target)
            if hashlib.sha256(target.read_bytes()).hexdigest() != digest:
                raise ValueError("Copied resource failed read-back.")
        for name in SKILLS:
            shutil.move(str(stage / name), str(output / name))
    receipt.write_text(json.dumps(manifest, indent=2) + "\n")
    for relative, digest in inventory.items():
        if hashlib.sha256((output / relative).read_bytes()).hexdigest() != digest:
            raise ValueError("Installed resource failed read-back.")
    print(f"Vendored and read back {len(SKILLS)} Ship skills / {len(inventory)} files from {plugin['version']} at {commit}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, nargs="?", help="Clean reviewed plugin checkout")
    parser.add_argument("--check", action="store_true",
                        help="Only check that the installed skills match the manifest (no plugin checkout needed)")
    parser.add_argument("--destination", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--replace", action="store_true",
                        help="Replace skills brought in earlier, if nobody has edited them since")
    args = parser.parse_args()
    try:
        if args.check:
            check(args.destination)
        elif args.source is None:
            parser.error("a plugin checkout is required unless --check is used")
        else:
            vendor(args.source, args.destination, args.replace)
    except ValueError as error:
        raise SystemExit(f"error: {error}")
