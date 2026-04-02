import type { ReactNode } from "react";

import type { AHIPToolIntentListProps } from "../types/host.js";

export function AHIPToolIntentList({
  toolIntents
}: AHIPToolIntentListProps): ReactNode {
  return (
    <div data-ahip-section="tool_intents">
      {toolIntents.map((intent) => (
        <section data-ahip-tool-intent={intent.status} key={intent.intent_id}>
          <strong>{intent.title ?? intent.tool_name}</strong>
          <div>Status: {intent.status}</div>
          {intent.description ? <p>{intent.description}</p> : null}
        </section>
      ))}
    </div>
  );
}
