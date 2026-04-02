import type { ReactNode } from "react";

import { getFallbackText, type AHIPItem } from "@ahip/core";

import { AHIPActionBar } from "./AHIPActionBar.js";
import { AHIPApprovalList } from "./AHIPApprovalList.js";
import { AHIPArtifactList } from "./AHIPArtifactList.js";
import { AHIPContentRenderer } from "./AHIPContentRenderer.js";
import { AHIPFallbackRenderer } from "./AHIPFallback.js";
import { AHIPStatePatchList } from "./AHIPStatePatchList.js";
import { AHIPToolIntentList } from "./AHIPToolIntentList.js";
import { defaultBlockRendererRegistry } from "../registry/createBlockRegistry.js";
import { defaultWidgetRegistry } from "../registry/createWidgetRegistry.js";
import type {
  AHIPBlockRendererRegistry,
  AHIPFallbackRendererComponent,
  AHIPHostContext,
  AHIPWidgetRegistry
} from "../types/host.js";
import { renderSafely } from "../utils/render.js";
import { WidgetHost } from "../widgets/WidgetHost.js";

export interface AHIPItemRendererProps extends AHIPHostContext {
  item: AHIPItem;
  blockRendererRegistry?: AHIPBlockRendererRegistry;
  widgetRegistry?: AHIPWidgetRegistry;
  fallbackRenderer?: AHIPFallbackRendererComponent;
}

function renderItemFallback(
  item: AHIPItem,
  FallbackRenderer: AHIPFallbackRendererComponent
): ReactNode {
  return (
    <FallbackRenderer
      fallbackText={item.fallback_text ?? getFallbackText(item)}
      kind="item"
      rawValue={item}
      reason="Item could not be fully rendered"
      title={item.kind}
    />
  );
}

export function AHIPItemRenderer({
  item,
  blockRendererRegistry = defaultBlockRendererRegistry,
  widgetRegistry = defaultWidgetRegistry,
  fallbackRenderer: FallbackRenderer = AHIPFallbackRenderer,
  actionDispatcher,
  artifactOpener,
  appletRegistry,
  capabilities,
  onRenderError
}: AHIPItemRendererProps): ReactNode {
  const host: AHIPHostContext = {
    actionDispatcher,
    artifactOpener,
    appletRegistry,
    capabilities,
    onRenderError
  };

  const itemFallback = renderItemFallback(item, FallbackRenderer);
  const actions = item.actions;
  const approvals = item.approvals;
  const toolIntents = item.tool_intents;
  const artifacts = item.artifacts;
  const statePatches = item.state_patches;

  return (
    <article data-ahip-item-kind={item.kind}>
      {item.content?.length
        ? renderSafely({
            area: "content",
            identifier: `${item.item_id}:content`,
            item,
            host,
            render: () => (
              <AHIPContentRenderer
                blockRendererRegistry={blockRendererRegistry}
                fallbackRenderer={FallbackRenderer}
                host={host}
                item={item}
              />
            ),
            fallback: itemFallback
          })
        : null}

      {actions?.length
        ? renderSafely({
            area: "action",
            identifier: `${item.item_id}:actions`,
            item,
            host,
            render: () => <AHIPActionBar actions={actions} host={host} item={item} />,
            fallback: itemFallback
          })
        : null}

      {approvals?.length
        ? renderSafely({
            area: "approval",
            identifier: `${item.item_id}:approvals`,
            item,
            host,
            render: () => <AHIPApprovalList approvals={approvals} item={item} />,
            fallback: itemFallback
          })
        : null}

      {toolIntents?.length
        ? renderSafely({
            area: "tool_intent",
            identifier: `${item.item_id}:tool_intents`,
            item,
            host,
            render: () => <AHIPToolIntentList toolIntents={toolIntents} />,
            fallback: itemFallback
          })
        : null}

      {item.widgets?.length ? (
        <div data-ahip-section="widgets">
          {item.widgets.map((widget) => (
            <div key={widget.id}>
              <WidgetHost
                fallbackRenderer={FallbackRenderer}
                host={host}
                item={item}
                widget={widget}
                widgetRegistry={widgetRegistry}
              />
            </div>
          ))}
        </div>
      ) : null}

      {artifacts?.length
        ? renderSafely({
            area: "artifact",
            identifier: `${item.item_id}:artifacts`,
            item,
            host,
            render: () => <AHIPArtifactList artifacts={artifacts} host={host} item={item} />,
            fallback: itemFallback
          })
        : null}

      {statePatches?.length
        ? renderSafely({
            area: "state_patch",
            identifier: `${item.item_id}:state_patches`,
            item,
            host,
            render: () => <AHIPStatePatchList statePatches={statePatches} />,
            fallback: itemFallback
          })
        : null}

      {!item.content?.length &&
      !actions?.length &&
      !approvals?.length &&
      !item.widgets?.length &&
      !artifacts?.length &&
      !statePatches?.length &&
      !toolIntents?.length
        ? itemFallback
        : null}
    </article>
  );
}
