import { defaultWidgetRenderers } from "./defaultRegistry.js";
import type {
  AHIPWidgetRegistry,
  CreateWidgetRegistryOptions
} from "../types/host.js";

export function createWidgetRegistry(
  options: CreateWidgetRegistryOptions = {}
): AHIPWidgetRegistry {
  const registry = new Map<string, AHIPWidgetRegistry["get"] extends (...args: never[]) => infer TResult ? TResult : never>();

  for (const [type, renderer] of Object.entries(
    defaultWidgetRenderers as Record<string, NonNullable<ReturnType<AHIPWidgetRegistry["get"]>>>
  )) {
    registry.set(type, renderer);
  }

  for (const [type, renderer] of Object.entries(options.widgetRenderers ?? {})) {
    registry.set(type, renderer);
  }

  return {
    get(type) {
      return registry.get(type);
    },
    has(type) {
      return registry.has(type);
    },
    list() {
      return Array.from(registry.keys());
    }
  };
}

export const defaultWidgetRegistry = createWidgetRegistry();
