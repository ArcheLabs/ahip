import type { AHIPExampleFixture } from "../types.js";
import { createExampleId } from "../helpers/ids.js";
import { EXAMPLE_TIMESTAMPS } from "../helpers/timestamps.js";

export const invalidProtocolVersionItem: AHIPExampleFixture = {
  id: "invalid-protocol-version-item",
  title: "Invalid protocol version",
  description: "Uses a protocol version that the v0.2 validator must reject.",
  item: {
    protocol: "ahip",
    version: "0.1",
    item_id: createExampleId("invalid", "protocol-version"),
    kind: "turn",
    actor: {
      actor_id: "agent-demo",
      actor_kind: "agent"
    },
    created_at: EXAMPLE_TIMESTAMPS.start
  }
};

export const missingActorFieldsItem: AHIPExampleFixture = {
  id: "missing-actor-fields-item",
  title: "Missing actor fields",
  description: "Omits required actor fields and should fail schema validation.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("invalid", "missing-actor-fields"),
    kind: "turn",
    actor: {
      display_name: "Broken actor"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusOneMinute
  }
};

export const malformedContentBlockItem: AHIPExampleFixture = {
  id: "malformed-content-block-item",
  title: "Malformed content block",
  description: "Declares a text block but omits its required text field.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("invalid", "malformed-content-block"),
    kind: "turn",
    actor: {
      actor_id: "agent-demo",
      actor_kind: "agent"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusTwoMinutes,
    content: [
      {
        id: "broken-text-block",
        type: "text"
      }
    ]
  }
};

export const invalidExtensionIdentifierItem: AHIPExampleFixture = {
  id: "invalid-extension-identifier-item",
  title: "Invalid extension identifier",
  description: "Uses a dot-only custom block identifier that fails the v0.2 schema pattern.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("invalid", "invalid-extension-identifier"),
    kind: "turn",
    actor: {
      actor_id: "agent-demo",
      actor_kind: "agent"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusThreeMinutes,
    content: [
      {
        id: "invalid-custom-block",
        type: "org.ahip.examples.gomoku.board",
        fallback_text: "This identifier is intentionally invalid under the schema."
      }
    ]
  }
};

export const invalidActionIdentifierItem: AHIPExampleFixture = {
  id: "invalid-action-identifier-item",
  title: "Invalid action identifier",
  description: "Uses an unscoped custom action kind that should be rejected.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("invalid", "invalid-action-identifier"),
    kind: "turn",
    actor: {
      actor_id: "agent-demo",
      actor_kind: "agent"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusFourMinutes,
    actions: [
      {
        id: "invalid-action",
        label: "Launch",
        kind: "launch_rocket"
      }
    ]
  }
};

export const invalidFixtures = [
  invalidProtocolVersionItem,
  missingActorFieldsItem,
  malformedContentBlockItem,
  invalidExtensionIdentifierItem,
  invalidActionIdentifierItem
] as const;
