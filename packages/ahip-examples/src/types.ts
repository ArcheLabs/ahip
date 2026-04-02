import type { AHIPItem } from "@ahip/core";

export interface AHIPExampleFixture<TItem = AHIPItem | unknown> {
  id: string;
  title: string;
  description: string;
  item: TItem;
}

export interface ExampleAppletManifest {
  applet_id: string;
  name: string;
  version: string;
  description: string;
  widget_types: string[];
  block_types: string[];
}

export interface ExampleAppletRegistrationStep {
  step: string;
  description: string;
}

export interface ExampleHostEvent {
  kind: "action" | "artifact" | "applet_registration";
  name: string;
  itemId?: string;
  detail?: string;
}
