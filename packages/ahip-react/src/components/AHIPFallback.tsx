import type { ReactNode } from "react";

import { stringifyForDebug } from "../utils/render.js";
import type { AHIPFallbackRendererProps } from "../types/host.js";

export function AHIPFallbackRenderer({
  kind,
  title,
  reason,
  fallbackText,
  rawValue
}: AHIPFallbackRendererProps): ReactNode {
  return (
    <div data-ahip-fallback={kind}>
      <strong>{title ?? `Unsupported ${kind}`}</strong>
      {reason ? <div>{reason}</div> : null}
      {fallbackText ? <pre>{fallbackText}</pre> : null}
      {!fallbackText && rawValue !== undefined ? (
        <pre>{stringifyForDebug(rawValue)}</pre>
      ) : null}
    </div>
  );
}
