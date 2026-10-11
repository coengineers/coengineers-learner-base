import { brand } from "../brand";
import { brandIdentity } from "./brandIdentity";
export function Brand({
  compact = false,
  showName = false,
}: {
  compact?: boolean;
  showName?: boolean;
}) {
  const { showLogo, showText, logoAlt } = brandIdentity(brand, showName);
  return (
    <span className={"brand-identity " + (compact ? "compact" : "")}>
      {showLogo && brand.logoUrl && (
        <img className="brand-logo" src={brand.logoUrl} alt={logoAlt} />
      )}
      {showText && (
        <span className="wordmark">
          {brand.wordmarkAccent &&
          brand.name.startsWith(brand.wordmarkAccent) ? (
            <>
              <span className="wordmark-accent">{brand.wordmarkAccent}</span>
              {brand.name.slice(brand.wordmarkAccent.length)}
            </>
          ) : (
            brand.name
          )}
        </span>
      )}
      {!compact && brand.appLabel !== brand.name && (
        <small>{brand.appLabel}</small>
      )}
    </span>
  );
}
