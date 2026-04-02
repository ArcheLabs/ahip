import type { AHIPItem } from "@ahip/core";

import type { AHIPExampleFixture } from "../types.js";
import { createExampleId } from "../helpers/ids.js";
import { EXAMPLE_TIMESTAMPS } from "../helpers/timestamps.js";

const agentActor = {
  actor_id: "agent-demo",
  actor_kind: "agent" as const,
  display_name: "Example Agent"
};

export const standardBlockItem: AHIPExampleFixture<AHIPItem> = {
  id: "standard-block-item",
  title: "Standard block item",
  description:
    "A normal AHIP item that uses standard blocks, actions, and artifacts together.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "standard-block-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.start,
    content: [
      {
        id: "text-1",
        type: "text",
        text: "Here is a compact protocol-first project update."
      },
      {
        id: "text-2",
        type: "text",
        text: "Build is passing, risk is low, and the next step is to publish the examples package."
      }
    ],
    actions: [
      {
        id: "open-report",
        label: "Open status report",
        kind: "open_url",
        fallback_text: "Open https://example.com/reports/ahip-status"
      }
    ],
    artifacts: [
      {
        artifact_id: "artifact-status-report",
        kind: "report",
        name: "AHIP status report",
        uri: "https://example.com/reports/ahip-status",
        summary: "Protocol-first project status report"
      }
    ],
    fallback_text: "Compact AHIP project update with text, markdown, an action, and a report artifact."
  }
};

export const approvalRequestItem: AHIPExampleFixture<AHIPItem> = {
  id: "approval-request-item",
  title: "Approval request item",
  description: "A request that asks for explicit approval before proceeding.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "approval-request-item"),
    kind: "approval_request",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusOneMinute,
    approvals: [
      {
        approval_id: "approval-1",
        kind: "request",
        scope: "tool_execution",
        title: "Approve export run",
        description: "This will generate a shareable package archive.",
        risk_level: "low",
        fallback_text: "Approve export run before creating the archive."
      }
    ],
    fallback_text: "Approval required before export run."
  }
};

export const paymentRequestItem: AHIPExampleFixture<AHIPItem> = {
  id: "payment-request-item",
  title: "Payment request item",
  description: "A standard payment request block in a regular turn.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "payment-request-item"),
    kind: "turn",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusTwoMinutes,
    content: [
      {
        id: "payment-1",
        type: "payment_request",
        amount: "25.00",
        asset: "USD",
        receiver: "merchant-example",
        memo: "Protocol documentation bundle",
        status: "pending"
      }
    ],
    fallback_text: "Payment request: 25.00 USD to merchant-example."
  }
};

export const artifactAnnouncementItem: AHIPExampleFixture<AHIPItem> = {
  id: "artifact-announcement-item",
  title: "Artifact announcement item",
  description: "An item that publishes a generated artifact.",
  item: {
    protocol: "ahip",
    version: "0.2",
    item_id: createExampleId("valid", "artifact-announcement-item"),
    kind: "artifact_announcement",
    actor: agentActor,
    created_at: EXAMPLE_TIMESTAMPS.plusThreeMinutes,
    artifacts: [
      {
        artifact_id: "artifact-deck-outline",
        kind: "deck_outline",
        name: "AHIP intro deck outline",
        uri: "https://example.com/artifacts/ahip-intro-outline.json",
        summary: "Slide-by-slide outline for the protocol overview deck"
      }
    ],
    fallback_text: "Artifact announcement: AHIP intro deck outline."
  }
};

export const validFixtures = [
  standardBlockItem,
  approvalRequestItem,
  artifactAnnouncementItem
] as const;
