import type { ReactNode } from "react";

import type { AHIPStatePatchListProps } from "../types/host.js";
import { stringifyForDebug } from "../utils/render.js";

export function AHIPStatePatchList({
  statePatches
}: AHIPStatePatchListProps): ReactNode {
  return (
    <div data-ahip-section="state_patches">
      {statePatches.map((patch) => (
        <section data-ahip-state-op={patch.op} key={patch.patch_id}>
          <strong>{patch.target}</strong>
          <div>
            {patch.op} {patch.path}
          </div>
          {patch.value !== undefined ? <pre>{stringifyForDebug(patch.value)}</pre> : null}
        </section>
      ))}
    </div>
  );
}
