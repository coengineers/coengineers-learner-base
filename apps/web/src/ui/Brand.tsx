import { brand } from "../brand";
export function Brand({
  compact = false,
  showName = false,
}: {
  compact?: boolean;
  showName?: boolean;
}) {
  return (
    <span className={"brand-identity " + (compact ? "compact" : "")}>
      {brand.logoUrl && (
        <img
          className="brand-logo"
          src={brand.logoUrl}
          alt={showName ? "" : brand.name}
        />
      )}
      {(!brand.logoUrl || showName) && (
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
      {!compact && <small>{brand.appLabel}</small>}
    </span>
  );
}
