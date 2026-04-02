import { defaultBlockRenderers } from "./defaultRegistry.js";
import type {
  AHIPBlockRendererRegistry,
  CreateBlockRegistryOptions
} from "../types/host.js";

export function createBlockRegistry(
  options: CreateBlockRegistryOptions = {}
): AHIPBlockRendererRegistry {
  const registry = new Map<string, ReturnType<AHIPBlockRendererRegistry["get"]>>();

  for (const [type, renderer] of Object.entries(defaultBlockRenderers)) {
    registry.set(type, renderer);
  }

  for (const [type, renderer] of Object.entries(options.standardBlockRenderers ?? {})) {
    if (renderer) {
      registry.set(type, renderer);
    }
  }

  for (const [type, renderer] of Object.entries(options.customBlockRenderers ?? {})) {
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

export const defaultBlockRendererRegistry = createBlockRegistry();
