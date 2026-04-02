import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { AHIPItem, ContentBlock, WidgetRef } from "@ahip/core";

import {
  AHIPItemRenderer,
  createBlockRegistry,
  createWidgetRegistry,
  type AHIPAppletRegistry
} from "./index.js";

function createBaseItem(): AHIPItem {
  return {
    protocol: "ahip",
    version: "0.2",
    item_id: "item-1",
    kind: "turn",
    actor: {
      actor_id: "agent-1",
      actor_kind: "agent"
    },
    created_at: "2026-04-02T00:00:00Z"
  };
}

describe("@ahip/react", () => {
  it("looks up standard, custom, and widget renderers through registries", () => {
    const customBlockRenderer = () => "custom";
    const customWidgetRenderer = () => "widget";

    const blockRegistry = createBlockRegistry({
      customBlockRenderers: {
        "org.example/custom_panel": customBlockRenderer
      }
    });
    const widgetRegistry = createWidgetRegistry({
      widgetRenderers: {
        "org.example/widget": customWidgetRenderer
      }
    });

    expect(blockRegistry.has("text")).toBe(true);
    expect(blockRegistry.get("org.example/custom_panel")).toBe(customBlockRenderer);
    expect(blockRegistry.list()).toContain("org.example/custom_panel");
    expect(widgetRegistry.get("org.example/widget")).toBe(customWidgetRenderer);
    expect(widgetRegistry.list()).toContain("org.example/widget");
  });

  it("falls back for unsupported blocks and widgets", () => {
    const item: AHIPItem = {
      ...createBaseItem(),
      content: [
        {
          id: "custom-block",
          type: "org.example/custom_panel",
          fallback_text: "Custom block fallback",
          data: { label: "demo" }
        } as ContentBlock
      ],
      widgets: [
        {
          id: "widget-1",
          widget_id: "widget-1",
          widget_type: "org.example/widget",
          props: {},
          fallback_text: "Unsupported widget fallback"
        } as WidgetRef
      ]
    };

    const html = renderToStaticMarkup(<AHIPItemRenderer item={item} />);

    expect(html).toContain("Custom block fallback");
    expect(html).toContain("Unsupported widget fallback");
  });

  it("renders custom blocks through the block registry", () => {
    const item: AHIPItem = {
      ...createBaseItem(),
      content: [
        {
          id: "custom-block",
          type: "org.example/custom_panel",
          fallback_text: "Custom block fallback",
          data: { label: "custom label" }
        } as ContentBlock
      ]
    };

    const blockRegistry = createBlockRegistry({
      customBlockRenderers: {
        "org.example/custom_panel": ({ block }) => (
          <div>Custom renderer hit {(block as { data?: { label?: string } }).data?.label}</div>
        )
      }
    });

    const html = renderToStaticMarkup(
      <AHIPItemRenderer blockRendererRegistry={blockRegistry} item={item} />
    );

    expect(html).toContain("Custom renderer hit custom label");
    expect(html).not.toContain("Custom block fallback");
  });

  it("resolves widgets through the host applet registry", () => {
    const item: AHIPItem = {
      ...createBaseItem(),
      widgets: [
        {
          id: "widget-1",
          widget_id: "gomoku-applet",
          widget_type: "org.example/widget",
          props: {},
          fallback_text: "Applet widget fallback"
        }
      ]
    };

    const appletRegistry: AHIPAppletRegistry = {
      resolveWidgetRenderer(widget) {
        if (widget.widget_id !== "gomoku-applet") {
          return undefined;
        }

        return ({ widget: resolvedWidget }) => (
          <div>Applet widget resolved {resolvedWidget.widget_id}</div>
        );
      }
    };

    const html = renderToStaticMarkup(
      <AHIPItemRenderer appletRegistry={appletRegistry} item={item} />
    );

    expect(html).toContain("Applet widget resolved gomoku-applet");
    expect(html).not.toContain("Applet widget fallback");
  });

  it("survives partial renderer failures at the item level", () => {
    const item: AHIPItem = {
      ...createBaseItem(),
      content: [
        {
          id: "text-1",
          type: "text",
          text: "Before failure"
        },
        {
          id: "bad-custom",
          type: "org.example/explosive",
          fallback_text: "Explosive fallback"
        } as ContentBlock,
        {
          id: "text-2",
          type: "text",
          text: "After failure"
        }
      ]
    };

    const blockRegistry = createBlockRegistry({
      customBlockRenderers: {
        "org.example/explosive": () => {
          throw new Error("boom");
        }
      }
    });

    const html = renderToStaticMarkup(
      <AHIPItemRenderer blockRendererRegistry={blockRegistry} item={item} />
    );

    expect(html).toContain("Before failure");
    expect(html).toContain("Explosive fallback");
    expect(html).toContain("After failure");
  });
});
