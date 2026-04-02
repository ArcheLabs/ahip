import type { AHIPItem } from "@ahip/core";

import type { AHIPExampleFixture } from "../../types.js";
import { createExampleId } from "../../helpers/ids.js";
import { EXAMPLE_TIMESTAMPS } from "../../helpers/timestamps.js";
import {
  createBoardData,
  GOMOKU_APPLET_ID,
  GOMOKU_BOARD_BLOCK_TYPE,
  GOMOKU_WIDGET_TYPE,
  gomokuFallbackText,
  type GomokuBoardData,
  type GomokuMove
} from "./types.js";

const agentActor = {
  actor_id: "gomoku-agent",
  actor_kind: "agent" as const,
  display_name: "Gomoku Agent"
};

const humanActor = {
  actor_id: "gomoku-human",
  actor_kind: "human" as const,
  display_name: "Human Player"
};

function createBoardBlock(id: string, board: GomokuBoardData) {
  return {
    id,
    type: GOMOKU_BOARD_BLOCK_TYPE,
    title: "Gomoku (Five in a Row)",
    fallback_text: gomokuFallbackText(board),
    data: board
  } as const;
}

function createGomokuWidget() {
  return {
    id: "gomoku-widget",
    widget_id: GOMOKU_APPLET_ID,
    widget_type: GOMOKU_WIDGET_TYPE,
    props: {
      board_id: "gomoku-demo-board"
    },
    permissions: {
      network: "none" as const,
      storage: "session" as const
    },
    fallback_text:
      "Interactive Gomoku board unavailable. Continue by describing moves in plain text."
  };
}

const startMoves: GomokuMove[] = [];
const updatedMoves: GomokuMove[] = [
  { player: "human", coordinate: "H8" },
  { player: "agent", coordinate: "H9" }
];
const finishedMoves: GomokuMove[] = [
  { player: "human", coordinate: "H8" },
  { player: "agent", coordinate: "H9" },
  { player: "human", coordinate: "I8" },
  { player: "agent", coordinate: "I9" },
  { player: "human", coordinate: "J8" },
  { player: "agent", coordinate: "J9" },
  { player: "human", coordinate: "K8" },
  { player: "agent", coordinate: "K9" },
  { player: "human", coordinate: "L8" }
];

export const gomokuGameStartItem: AHIPExampleFixture<AHIPItem> = {
  id: "gomoku-game-start-item",
  title: "Gomoku game start item",
  description:
    "An agent turn that starts Gomoku (Five in a Row) with a custom board block and a locally resolved widget.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("gomoku", "game-start"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.start,
    content: [
      {
        id: "intro-text",
        type: "text",
        text: "Gomoku (Five in a Row) has started. You play as black."
      },
      createBoardBlock(
        "gomoku-board-start",
        createBoardData({
          nextPlayer: "human",
          moves: startMoves,
          legalMoves: ["H8", "H9", "I8", "I9"]
        })
      ),
      {
        id: "start-status",
        type: "status",
        status: "waiting",
        message: "Waiting for the human player's first move."
      }
    ],
    widgets: [createGomokuWidget()],
    actions: [
      {
        id: "suggest-move",
        label: "Play H8",
        kind: "reply_with_template",
        payload: {
          text: "I play H8."
        },
        fallback_text: "Reply with: I play H8."
      }
    ],
    fallback_text:
      "Gomoku (Five in a Row) started. The board can render through a local applet or degrade to fallback text."
  }
};

export const gomokuHumanMoveSubmissionItem: AHIPExampleFixture<AHIPItem> = {
  id: "gomoku-human-move-submission-item",
  title: "Gomoku human move submission item",
  description:
    "A human turn that submits a move while remaining valid on hosts that only understand AHIP core objects.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("gomoku", "human-move"),
    kind: "turn",
    actor: humanActor,
    created_at: EXAMPLE_TIMESTAMPS.plusOneMinute,
    reply_to: createExampleId("gomoku", "game-start"),
    content: [
      {
        id: "human-move-text",
        type: "text",
        text: "I play H8."
      }
    ],
    state_patches: [
      {
        patch_id: "gomoku-human-move-patch",
        target: "gomoku-demo-board",
        op: "append",
        path: "/move_history",
        value: {
          player: "human",
          coordinate: "H8"
        }
      }
    ],
    fallback_text: "Human move submitted: H8."
  }
};

export const gomokuUpdatedBoardItem: AHIPExampleFixture<AHIPItem> = {
  id: "gomoku-updated-board-item",
  title: "Gomoku updated board item",
  description:
    "The agent replies with an updated custom board block, a widget, and a next-turn status.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("gomoku", "updated-board"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusTwoMinutes,
    content: [
      {
        id: "updated-text",
        type: "text",
        text: "You played H8. I responded at H9."
      },
      createBoardBlock(
        "gomoku-board-updated",
        createBoardData({
          nextPlayer: "human",
          moves: updatedMoves,
          legalMoves: ["G8", "G9", "I8", "I9"]
        })
      ),
      {
        id: "updated-status",
        type: "status",
        status: "running",
        message: "The game continues. Your turn."
      }
    ],
    widgets: [createGomokuWidget()],
    fallback_text:
      "Updated Gomoku board: human H8, agent H9, and the local widget may resolve through the applet registry."
  }
};

export const gomokuGameFinishedItem: AHIPExampleFixture<AHIPItem> = {
  id: "gomoku-game-finished-item",
  title: "Gomoku game finished item",
  description:
    "A finished-game item that still contains board state and fallback text for unsupported hosts.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("gomoku", "game-finished"),
    kind: "system_notice",
    actor: {
      actor_id: "gomoku-system",
      actor_kind: "system",
      display_name: "Gomoku Arbiter"
    },
    created_at: EXAMPLE_TIMESTAMPS.plusThreeMinutes,
    content: [
      {
        id: "finished-text",
        type: "text",
        text: "Gomoku (Five in a Row) finished. The human player wins with a horizontal five."
      },
      createBoardBlock(
        "gomoku-board-finished",
        createBoardData({
          nextPlayer: "human",
          moves: finishedMoves,
          legalMoves: [],
          winner: "human"
        })
      ),
      {
        id: "finished-status",
        type: "status",
        status: "done",
        message: "Human wins."
      }
    ],
    widgets: [createGomokuWidget()],
    fallback_text:
      "Gomoku (Five in a Row) finished with a human victory. Unsupported hosts still have the winner summary and move history."
  }
};

export const gomokuShowcaseFixtures = [
  gomokuGameStartItem,
  gomokuHumanMoveSubmissionItem,
  gomokuUpdatedBoardItem,
  gomokuGameFinishedItem
] as const;
