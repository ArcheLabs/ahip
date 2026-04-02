import { describe, expect, it } from "vitest";

import {
  appletBoundaryFixtures,
  createExampleHostDemo,
  customBlockRegistryItem,
  extensionFixtures,
  gomokuAppletManifest,
  gomokuAppletRegistrationFlow,
  gomokuShowcaseFixtures,
  standardBlockItem,
  unsupportedWidgetFallbackItem,
  validFixtures
} from "./index.js";

describe("@ahip/examples loading", () => {
  it("exports the expected example categories", () => {
    expect(validFixtures.length).toBeGreaterThan(0);
    expect(extensionFixtures.length).toBeGreaterThan(0);
    expect(appletBoundaryFixtures.length).toBeGreaterThan(0);
    expect(gomokuShowcaseFixtures.length).toBe(4);
    expect(standardBlockItem.id).toBe("standard-block-item");
    expect(customBlockRegistryItem.id).toBe("custom-block-registry-item");
    expect(unsupportedWidgetFallbackItem.id).toBe("unsupported-widget-fallback-item");
  });

  it("exports example applet metadata and registration guidance", () => {
    expect(gomokuAppletManifest.applet_id).toBeTruthy();
    expect(gomokuAppletRegistrationFlow.length).toBeGreaterThanOrEqual(4);
  });

  it("creates a host demo with action, artifact, and applet registration hooks", () => {
    const demo = createExampleHostDemo();

    expect(demo.events.some((event) => event.kind === "applet_registration")).toBe(true);
    expect(demo.blockRendererRegistry.has("org.ahip.examples/profile.card")).toBe(true);
    expect(demo.widgetRegistry.has("org.ahip.examples/counter.widget")).toBe(true);
  });
});
