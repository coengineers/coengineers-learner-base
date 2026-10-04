import { Layers, Sparkles } from "lucide-react";
import { brand } from "../../brand";
import { PageHeading } from "../../ui/primitives";
export function Guide() {
  return (
    <>
      <PageHeading eyebrow={brand.guideEyebrow} title={brand.guideHeading}>
        {brand.guideDescription}
      </PageHeading>
      <section className="panel guide-intro">
        <span className="card-icon mint">
          <Layers size={24} />
        </span>
        <div>
          <h2>{brand.guideIntroHeading}</h2>
          <p>{brand.guideIntroDescription}</p>
        </div>
      </section>
      <div className="guide-steps">
        {brand.guideSteps.map(([n, title, body]) => (
          <section className="guide-step" key={n}>
            <span>{n}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="quiet-banner">
        <Sparkles size={27} />
        <div>
          <h3>{brand.guideBannerHeading}</h3>
          <p>{brand.guideBannerDescription}</p>
        </div>
      </section>
      <section className="panel support-panel">
        <h2>{brand.guideSupportHeading}</h2>
        <p>{brand.guideSupportDescription}</p>
        <p>{brand.guideSupportContact}</p>
      </section>
    </>
  );
}
