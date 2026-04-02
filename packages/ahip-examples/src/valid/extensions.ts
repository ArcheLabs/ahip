import type { AHIPItem } from "@ahip/core";

import type { AHIPExampleFixture } from "../types.js";
import { createExampleId } from "../helpers/ids.js";
import { EXAMPLE_TIMESTAMPS } from "../helpers/timestamps.js";

export const CUSTOM_PROFILE_BLOCK_TYPE = "org.ahip.examples/profile.card";
export const REGISTRY_WIDGET_TYPE = "org.ahip.examples/counter.widget";
export const UNSUPPORTED_WIDGET_TYPE = "org.ahip.examples/unsupported.widget";
export const UNSUPPORTED_BLOCK_TYPE = "org.ahip.examples/unsupported.block";
export const THROWING_PANEL_BLOCK_TYPE = "org.ahip.examples/throwing.panel";

const agentActor = {
  actor_id: "agent-demo",
  actor_kind: "agent" as const,
  display_name: "Example Agent"
};

export const customBlockRegistryItem: AHIPExampleFixture<AHIPItem> = {
  id: "custom-block-registry-item",
  title: "Custom block rendered through registry",
  description: "A custom block that is expected to be rendered by a host-supplied registry entry.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "custom-block-registry-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusOneMinute,
    content: [
      {
        id: "profile-card",
        type: CUSTOM_PROFILE_BLOCK_TYPE,
        title: "Profile card",
        fallback_text: "Profile card for Casey Example.",
        data: {
          name: "Casey Example",
          role: "Protocol maintainer",
          tags: ["ahip", "examples"]
        }
      }
    ],
    fallback_text: "Custom profile card example."
  }
};

export const unsupportedBlockFallbackItem: AHIPExampleFixture<AHIPItem> = {
  id: "unsupported-block-fallback-item",
  title: "Unsupported block fallback item",
  description: "A valid item whose custom block should fall back cleanly on unsupported hosts.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "unsupported-block-fallback-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusTwoMinutes,
    content: [
      {
        id: "unsupported-block",
        type: UNSUPPORTED_BLOCK_TYPE,
        title: "Unsupported custom block",
        fallback_text: "Unsupported custom block: render this summary instead.",
        data: {
          summary: "Hosts without this renderer should show fallback text."
        }
      }
    ],
    fallback_text: "Unsupported custom block example with safe fallback."
  }
};

export const widgetRegistryItem: AHIPExampleFixture<AHIPItem> = {
  id: "widget-registry-item",
  title: "Widget rendered through registry",
  description: "A widget reference that a host can resolve through its widget registry.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "widget-registry-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusThreeMinutes,
    content: [
      {
        id: "text-1",
        type: "text",
        text: "This widget should render through the host widget registry."
      }
    ],
    widgets: [
      {
        id: "counter-widget",
        widget_id: "counter-widget-local",
        widget_type: REGISTRY_WIDGET_TYPE,
        props: {
          count: 7
        },
        permissions: {
          network: "none",
          storage: "session"
        },
        fallback_text: "Counter widget unavailable. Current count: 7."
      }
    ],
    fallback_text: "Counter widget example."
  }
};

export const unsupportedWidgetFallbackItem: AHIPExampleFixture<AHIPItem> = {
  id: "unsupported-widget-fallback-item",
  title: "Unsupported widget fallback item",
  description: "A valid widget reference that should degrade to fallback text when no renderer is available.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "unsupported-widget-fallback-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusFourMinutes,
    widgets: [
      {
        id: "unsupported-widget",
        widget_id: "unsupported-widget-local",
        widget_type: UNSUPPORTED_WIDGET_TYPE,
        props: {
          value: "demo"
        },
        permissions: {
          network: "none"
        },
        fallback_text: "Unsupported widget fallback text for safe rendering."
      }
    ],
    fallback_text: "Unsupported widget example."
  }
};

export const partialFailureRenderItem: AHIPExampleFixture<AHIPItem> = {
  id: "partial-failure-render-item",
  title: "Partial failure render item",
  description: "An item that still renders because only one custom renderer fails.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "partial-failure-render-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusFourMinutes,
    content: [
      {
        id: "before",
        type: "text",
        text: "Before failure"
      },
      {
        id: "explosive-panel",
        type: THROWING_PANEL_BLOCK_TYPE,
        fallback_text: "Explosive panel fallback"
      },
      {
        id: "after",
        type: "text",
        text: "After failure"
      }
    ],
    fallback_text: "Partial failure example item."
  }
};

export const extensionFixtures = [
  customBlockRegistryItem,
  unsupportedBlockFallbackItem,
  widgetRegistryItem,
  unsupportedWidgetFallbackItem,
  partialFailureRenderItem
] as const;
