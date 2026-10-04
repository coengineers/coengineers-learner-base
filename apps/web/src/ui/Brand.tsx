import { brand } from "../brand";
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={"brand-identity " + (compact ? "compact" : "")}>
      {brand.logoUrl ? (
        <img className="brand-logo" src={brand.logoUrl} alt={brand.name} />
      ) : (
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
