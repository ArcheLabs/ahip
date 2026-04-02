import type { ReactNode } from "react";

import { getFallbackText, type AHIPItem } from "@ahip/core";

export interface AppletRendererProps {
  item: AHIPItem;
}

export type AppletRenderer = (props: AppletRendererProps) => ReactNode;

export interface AppletRegistry {
  getRenderer(identifier: string): AppletRenderer | undefined;
}

export interface AHIPItemRendererProps {
  item: AHIPItem;
  appletRegistry?: AppletRegistry;
}

export function AHIPItemRenderer({ item }: AHIPItemRendererProps): ReactNode {
  return item.fallback_text ?? getFallbackText(item) ?? null;
}
