import type { ReactNode } from "react";

import type { AHIPItem, WidgetRef } from "@ahip/core";

import { AHIPFallbackRenderer } from "../components/AHIPFallback.js";
import { defaultWidgetRegistry } from "../registry/createWidgetRegistry.js";
import type {
  AHIPFallbackRendererComponent,
  AHIPHostContext,
  AHIPWidgetRegistry
} from "../types/host.js";
import { renderSafely } from "../utils/render.js";

export interface WidgetHostProps {
  widget: WidgetRef;
  item: AHIPItem;
  host?: AHIPHostContext;
  widgetRegistry?: AHIPWidgetRegistry;
  fallbackRenderer?: AHIPFallbackRendererComponent;
}

export function WidgetHost({
  widget,
  item,
  host,
  widgetRegistry = defaultWidgetRegistry,
  fallbackRenderer: FallbackRenderer = AHIPFallbackRenderer
}: WidgetHostProps): ReactNode {
  const safeHost = host ?? {};
  const fallback = (
    <FallbackRenderer
      fallbackText={widget.fallback_text}
      kind="widget"
      rawValue={widget}
      reason={`No renderer registered for widget type "${widget.widget_type}"`}
      title={widget.widget_type}
    />
  );

  const renderer =
    widgetRegistry.get(widget.widget_type) ??
    safeHost.appletRegistry?.resolveWidgetRenderer(widget, {
      item,
      host: safeHost
    });

  if (!renderer) {
    return fallback;
  }

  return renderSafely({
    area: "widget",
    identifier: widget.id,
    item,
    host: safeHost,
    render: () => renderer({ widget, item, host: safeHost, fallback }),
    fallback
  });
}
