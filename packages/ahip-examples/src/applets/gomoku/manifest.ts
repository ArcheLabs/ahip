import type { AHIPItem } from "@ahip/core";

import type {
  ExampleAppletManifest,
  ExampleAppletRegistrationStep,
  AHIPExampleFixture
} from "../../types.js";
import { createExampleId } from "../../helpers/ids.js";
import { EXAMPLE_TIMESTAMPS } from "../../helpers/timestamps.js";
import {
  GOMOKU_APPLET_ID,
  GOMOKU_BOARD_BLOCK_TYPE,
  GOMOKU_WIDGET_TYPE
} from "../../showcase/gomoku/types.js";

export const gomokuAppletManifest: ExampleAppletManifest = {
  applet_id: GOMOKU_APPLET_ID,
  name: "gomoku-local-applet",
  version: "0.1.0",
  description:
    "Local applet manifest used by the Gomoku (Five in a Row) showcase.",
  widget_types: [GOMOKU_WIDGET_TYPE],
  block_types: [GOMOKU_BOARD_BLOCK_TYPE]
};

export const invalidGomokuAppletManifest = {
  applet_id: "",
  name: "gomoku-local-applet",
  version: "0.1.0",
  widget_types: [],
  block_types: []
};

export const gomokuAppletRegistrationFlow: ExampleAppletRegistrationStep[] = [
  {
    step: "register-manifest",
    description: "Host reads the local Gomoku applet manifest and validates its metadata."
  },
  {
    step: "register-renderers",
    description: "Host binds the Gomoku custom block renderer and widget renderer locally."
  },
  {
    step: "render-ahip-item",
    description:
      "AHIP item references the Gomoku block and widget; the host resolves the widget through the local applet registry."
  },
  {
    step: "fallback-on-miss",
    description:
      "If the host cannot resolve the applet widget, it still renders the item via fallback text."
  }
];

export const appletResolvedWidgetItem: AHIPExampleFixture<AHIPItem> = {
  id: "applet-resolved-widget-item",
  title: "Applet-resolved widget item",
  description:
    "An AHIP item that references a locally registered applet widget and still includes fallback text for unsupported hosts.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("applet", "resolved-widget"),
    kind: "turn",
    actor: {
      actor_id: "agent-demo",
      actor_kind: "agent",
      display_name: "Applet Demo Agent"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusTwoMinutes,
    content: [
      {
        id: "gomoku-board-reference",
        type: GOMOKU_BOARD_BLOCK_TYPE,
        title: "Gomoku (Five in a Row)",
        fallback_text: "Local Gomoku board block reference."
      }
    ],
    widgets: [
      {
        id: "gomoku-widget-reference",
        widget_id: GOMOKU_APPLET_ID,
        widget_type: GOMOKU_WIDGET_TYPE,
        props: {
          board_id: "gomoku-demo-board"
        },
        fallback_text:
          "Local Gomoku widget unresolved. Continue using fallback text and move summaries."
      }
    ],
    fallback_text:
      "Applet boundary example: AHIP references a local Gomoku widget, and the host resolves it through a local applet registry."
  }
};

export const appletBoundaryFixtures = [appletResolvedWidgetItem] as const;
