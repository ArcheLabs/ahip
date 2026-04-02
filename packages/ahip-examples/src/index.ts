import type { AHIPItem } from "@ahip/core";

export const simpleTextTurn: AHIPItem = {
  protocol: "ahip",
  version: "0.2",
  item_id: "example-simple-text-turn",
  kind: "turn",
  actor: {
    actor_id: "agent-demo",
    actor_kind: "agent",
    display_name: "Demo Agent"
  },
  created_at: "2026-04-02T00:00:00Z",
  content: [
    {
      id: "text-1",
      type: "text",
      text: "Hello from the AHIP examples package.",
      fallback_text: "Hello from the AHIP examples package."
    }
  ],
  fallback_text: "Hello from the AHIP examples package."
};

export const invalidProtocolTurn = {
  ...simpleTextTurn,
  version: "0.1"
};
