import type { ReactNode } from "react";

import type { AHIPItem, ContentBlock } from "@ahip/core";

import { AHIPFallbackRenderer } from "./AHIPFallback.js";
import { defaultBlockRendererRegistry } from "../registry/createBlockRegistry.js";
import { renderSafely } from "../utils/render.js";
import type {
  AHIPBlockRendererRegistry,
  AHIPFallbackRendererComponent,
  AHIPHostContext
} from "../types/host.js";

export interface AHIPContentRendererProps {
  item: AHIPItem;
  host?: AHIPHostContext;
  blockRendererRegistry?: AHIPBlockRendererRegistry;
  fallbackRenderer?: AHIPFallbackRendererComponent;
}

function getBlockFallbackText(block: ContentBlock): string | undefined {
  return block.fallback_text ?? block.title ?? block.caption;
}

export function AHIPContentRenderer({
  item,
  host,
  blockRendererRegistry = defaultBlockRendererRegistry,
  fallbackRenderer: FallbackRenderer = AHIPFallbackRenderer
}: AHIPContentRendererProps): ReactNode {
  const safeHost = host ?? {};

  return (
    <div data-ahip-section="content">
      {item.content?.map((block) => {
        const fallback = (
          <FallbackRenderer
            fallbackText={getBlockFallbackText(block)}
            kind="block"
            rawValue={block}
            reason={`No renderer registered for block type "${block.type}"`}
            title={block.title ?? block.type}
          />
        );

        const renderer = blockRendererRegistry.get(block.type);
        if (!renderer) {
          return <div key={block.id}>{fallback}</div>;
        }

        return (
          <div key={block.id}>
            {renderSafely({
              area: "block",
              identifier: block.id,
              item,
              host: safeHost,
              render: () => renderer({ block, item, host: safeHost, fallback }),
              fallback
            })}
          </div>
        );
      })}
    </div>
  );
}
