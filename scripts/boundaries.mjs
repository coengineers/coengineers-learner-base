import ts from "typescript";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
export async function sourceFiles(dir) {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...(await sourceFiles(full)));
    else if (/\.[cm]?[jt]sx?$/.test(full)) result.push(full);
  }
  return result;
}
export function violation(file, dependency, typeOnly = false) {
  const target = dependency.startsWith(".")
    ? path.normalize(path.join(path.dirname(file), dependency))
    : dependency;
  const layer = file.match(
    /modules\/([^/]+)\/(domain|application|infrastructure|transport)\//,
  );
  if (layer) {
    const [, module, kind] = layer;
    if (kind === "domain" && !target.includes("modules/" + module + "/domain/"))
      return "Domain must be independent.";
    if (
      kind === "application" &&
      !target.includes("modules/" + module + "/domain/") &&
      !target.includes("modules/" + module + "/application/")
    )
      return "Application depends only on its domain and ports.";
    const other = target.match(/modules\/([^/]+)\//);
    if (other && other[1] !== module && !target.endsWith("/public"))
      return "Use the other module's public contract.";
  }
  if (
    file.startsWith("apps/web/") &&
    target.includes("apps/api/") &&
    !(typeOnly && target.endsWith("transport/router"))
  )
    return "Browser cannot import server implementation.";
  if (file.startsWith("packages/") && target.startsWith("apps/"))
    return "Shared packages cannot depend on applications.";
  return null;
}
if (process.argv[1]?.endsWith("boundaries.mjs")) {
  const errors = [];
  for (const file of [
    ...(await sourceFiles("apps")),
    ...(await sourceFiles("packages")),
  ]) {
    const tree = ts.createSourceFile(
      file,
      await readFile(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    function walk(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const why = violation(
          file,
          node.moduleSpecifier.text,
          ts.isImportDeclaration(node)
            ? node.importClause?.isTypeOnly
            : node.isTypeOnly,
        );
        if (why)
          errors.push(
            file + ": " + why + " (" + node.moduleSpecifier.text + ")",
          );
      }
      if (
        ts.isCallExpression(node) &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0]) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) &&
            node.expression.text === "require"))
      ) {
        const why = violation(file, node.arguments[0].text);
        if (why) errors.push(file + ": " + why);
      }
      ts.forEachChild(node, walk);
    }
    walk(tree);
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else console.log("Dependency boundaries pass.");
}
