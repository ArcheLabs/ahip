import type { ReactNode } from "react";

import type { CoreActionKind } from "@ahip/core";

import type { AHIPActionBarProps } from "../types/host.js";

const CORE_ACTION_KINDS: readonly CoreActionKind[] = [
  "submit_form",
  "open_url",
  "copy_text",
  "reply_with_template",
  "invoke_widget_action",
  "invoke_tool",
  "approve",
  "reject",
  "initiate_payment",
  "open_artifact",
  "retry",
  "continue_task"
];

export function AHIPActionBar({
  item,
  actions,
  host
}: AHIPActionBarProps): ReactNode {
  return (
    <div data-ahip-section="actions">
      {actions.map((action) => {
        const canDispatch =
          CORE_ACTION_KINDS.includes(action.kind as CoreActionKind) &&
          !!host.actionDispatcher &&
          !action.disabled;

        return (
          <button
            data-ahip-action-kind={action.kind}
            disabled={!canDispatch}
            key={action.id}
            onClick={() => {
              if (canDispatch) {
                void host.actionDispatcher?.dispatchAction(action, { item });
              }
            }}
            type="button"
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
