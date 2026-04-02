import type { ReactNode } from "react";

import type { AHIPApprovalListProps } from "../types/host.js";

export function AHIPApprovalList({
  approvals
}: AHIPApprovalListProps): ReactNode {
  return (
    <div data-ahip-section="approvals">
      {approvals.map((approval) =>
        approval.kind === "request" ? (
          <section data-ahip-approval="request" key={approval.approval_id}>
            <strong>{approval.title}</strong>
            <div>Scope: {approval.scope}</div>
            {approval.risk_level ? <div>Risk: {approval.risk_level}</div> : null}
            {approval.description ? <p>{approval.description}</p> : null}
          </section>
        ) : (
          <section data-ahip-approval="response" key={approval.approval_id}>
            <strong>{approval.response}</strong>
            {approval.reason ? <p>{approval.reason}</p> : null}
          </section>
        )
      )}
    </div>
  );
}
