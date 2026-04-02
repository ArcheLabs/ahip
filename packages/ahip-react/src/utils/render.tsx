import type { ReactNode } from "react";

import type { AHIPItem } from "@ahip/core";

import type { AHIPHostContext, AHIPRenderArea } from "../types/host.js";

export function renderSafely(options: {
  area: AHIPRenderArea;
  identifier: string;
  item: AHIPItem;
  host: AHIPHostContext;
  render: () => ReactNode;
  fallback: ReactNode;
}): ReactNode {
  try {
    return options.render();
  } catch (error) {
    options.host.onRenderError?.({
      area: options.area,
      identifier: options.identifier,
      item: options.item,
      error
    });

    return options.fallback;
  }
}

export function stringifyForDebug(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
