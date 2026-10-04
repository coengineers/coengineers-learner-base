import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  UserRound,
  Folder,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { api } from "../../lib/client";
import { PageHeading } from "../../ui/primitives";
import { brand } from "../../brand";
import { RoughIcon } from "../../ui/RoughIcon";
export function Overview() {
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.profile.query(),
  });
  const name = profile.data?.displayName?.split(" ")[0];
  return (
    <>
      <PageHeading
        eyebrow={brand.homeEyebrow}
        title={name ? brand.homeGreeting + name + "." : brand.homeHeading}
      >
        {brand.homeDescription}
      </PageHeading>
      <section className="welcome-panel">
        <div>
          <span className="pill">
            <span />
            {brand.homePill}
          </span>
          <h2>
            {brand.homePanelFirst}
            <br />
            {brand.homePanelSecond}
          </h2>
          <p>{brand.homePanelDescription}</p>
          <Link className="primary" to="/guide">
            {brand.homePanelLink} <ArrowRight size={17} />
          </Link>
        </div>
        {brand.illustrationUrl && (
          <div className="foundation-art" aria-hidden="true">
            <img src={brand.illustrationUrl} alt="" />
          </div>
        )}
      </section>
      <div className="section-heading">
        <h2>{brand.homeCardsHeading}</h2>
        <span>{brand.homeCardsDescription}</span>
      </div>
      <div className="start-cards">
        <Link to="/account" className="start-card">
          <span className="card-icon lavender">
            <RoughIcon name="community" draw={false} />
          </span>
          <span className="card-number">01</span>
          <h3>{brand.accountCardHeading}</h3>
          <p>{brand.accountCardDescription}</p>
          <span className="card-link">
            {brand.accountCardLink} <ArrowUpRight size={18} />
          </span>
        </Link>
        <Link to="/files" className="start-card">
          <span className="card-icon peach">
            <RoughIcon name="vault" draw={false} />
          </span>
          <span className="card-number">02</span>
          <h3>{brand.filesCardHeading}</h3>
          <p>{brand.filesCardDescription}</p>
          <span className="card-link">
            {brand.filesCardLink} <ArrowUpRight size={18} />
          </span>
        </Link>
        <Link to="/guide" className="start-card">
          <span className="card-icon mint">
            <RoughIcon name="map-pin" draw={false} />
          </span>
          <span className="card-number">03</span>
          <h3>{brand.guideCardHeading}</h3>
          <p>{brand.guideCardDescription}</p>
          <span className="card-link">
            {brand.guideCardLink} <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
      <section className="quiet-banner">
        <ShieldCheck size={25} />
        <div>
          <h3>{brand.homeBannerHeading}</h3>
          <p>{brand.homeBannerDescription}</p>
        </div>
        <span className="small-tag">{brand.homeBannerTag}</span>
      </section>
    </>
  );
}
