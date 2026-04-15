/**
 * AHIP v0.2 Core Types
 * Agent-Human Interaction Protocol
 *
 * Core AHIP v0.2 types used by the preview implementation.
 * Hosts should validate untrusted input before rendering content or dispatching behavior.
 */

export type ISODateTimeString = string;
export type URIString = string;

/**
 * Namespaced extension identifier of the form <namespace>/<name>,
 * for example: org.example/kanban_board
 *
 * TypeScript cannot fully enforce the runtime pattern; validate with schema.
 */
export type ExtensionIdentifier = string & {};

export type ExtensionsMap = Record<ExtensionIdentifier, unknown>;

export interface AHIPItem {
  protocol: "ahip";
  version: "0.2";

  item_id: string;
  session_id?: string;
  conversation_id?: string;
  thread_id?: string;

  kind: AHIPItemKind;
  actor: AHIPActor;

  created_at: ISODateTimeString;
  updated_at?: ISODateTimeString;

  reply_to?: string;
  correlation_id?: string;

  content?: ContentBlock[];
  actions?: AHIPAction[];
  approvals?: ApprovalObject[];
  tool_intents?: ToolIntent[];
  widgets?: WidgetRef[];
  artifacts?: ArtifactRef[];
  state_patches?: StatePatch[];

  metadata?: AHIPMetadata;
  fallback_text?: string;
  signature?: AHIPSignature;
  extensions?: ExtensionsMap;
}

export type AHIPItemKind =
  | "turn"
  | "tool_result"
  | "approval_request"
  | "approval_response"
  | "state_patch"
  | "artifact_announcement"
  | "system_notice";

export interface AHIPActor {
  actor_id: string;
  actor_kind: "human" | "agent" | "system" | "tool" | "host";
  display_name?: string;
  avatar_url?: URIString;
  principal_id?: string;
  extensions?: ExtensionsMap;
}

export interface AHIPMetadata {
  locale?: string;
  importance?: "low" | "normal" | "high";
  visibility?: "default" | "private" | "ephemeral";
  tags?: string[];
  provenance?: {
    model?: string;
    tool_name?: string;
    tool_call_id?: string;
    source_host?: string;
  };
  required_capabilities?: string[];
  extensions?: ExtensionsMap;
}

export interface AHIPSignature {
  scheme: "ed25519" | "sr25519" | "ecdsa" | (string & {});
  signer: string;
  value: string;
  signed_fields?: string[];
  canonicalization?: "JCS" | (string & {});
  extensions?: ExtensionsMap;
}

export type CoreBlockType =
  | "text"
  | "markdown"
  | "image"
  | "file"
  | "code"
  | "quote"
  | "divider"
  | "badge"
  | "stat"
  | "table"
  | "chart"
  | "entity_card"
  | "form"
  | "status"
  | "error"
  | "payment_request"
  | "payment_receipt";

export interface BlockBase {
  id: string;
  type: CoreBlockType | ExtensionIdentifier;
  version?: string;
  title?: string;
  caption?: string;
  fallback_text?: string;
  metadata?: Record<string, unknown>;
  extensions?: ExtensionsMap;
}

export interface TextBlock extends BlockBase {
  type: "text";
  text: string;
}

export interface MarkdownBlock extends BlockBase {
  type: "markdown";
  markdown: string;
}

export interface ImageBlock extends BlockBase {
  type: "image";
  url: URIString;
  alt?: string;
  width?: number;
  height?: number;
}

export interface FileBlock extends BlockBase {
  type: "file";
  name: string;
  url?: URIString;
  file_id?: string;
  mime_type?: string;
  size_bytes?: number;
}

export interface CodeBlock extends BlockBase {
  type: "code";
  language?: string;
  code: string;
}

export interface QuoteBlock extends BlockBase {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface DividerBlock extends BlockBase {
  type: "divider";
}

export interface BadgeBlock extends BlockBase {
  type: "badge";
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}

export interface StatBlock extends BlockBase {
  type: "stat";
  label: string;
  value: string | number;
  unit?: string;
  delta?: {
    value: number;
    direction: "up" | "down" | "flat";
  };
}

export interface TableBlock extends BlockBase {
  type: "table";
  columns: TableColumn[];
  rows: TableRow[];
  options?: {
    dense?: boolean;
    striped?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    page_size?: number;
  };
}

export interface TableColumn {
  key: string;
  title: string;
  data_type?:
    | "text"
    | "number"
    | "token"
    | "address"
    | "datetime"
    | "badge"
    | "link"
    | "progress";
  align?: "left" | "center" | "right";
  width?: number;
  format?: string;
}

export type TableCellValue =
  | string
  | number
  | boolean
  | null
  | {
      kind: "badge";
      label: string;
      tone?: "neutral" | "success" | "warning" | "danger" | "info";
    }
  | {
      kind: "link";
      label: string;
      href: URIString;
    }
  | {
      kind: "progress";
      value: number;
    };

export type TableRow = Record<string, TableCellValue>;

export interface ChartBlock extends BlockBase {
  type: "chart";
  spec: ChartSpec;
}

export interface ChartSpec {
  kind: "line" | "bar" | "area" | "pie" | "scatter";
  data: ChartDatum[];
  x?: FieldRef;
  y?: FieldRef;
  series?: FieldRef;
  color?: FieldRef;
  size?: FieldRef;
  label?: FieldRef;
  options?: {
    stacked?: boolean;
    smooth?: boolean;
    legend?: boolean;
    show_grid?: boolean;
    show_axis?: boolean;
    y_domain?: [number, number];
    x_axis_label?: string;
    y_axis_label?: string;
  };
}

export type ChartDatumPrimitive = string | number | boolean | null;
export type ChartDatum = Record<string, ChartDatumPrimitive>;

export interface FieldRef {
  field: string;
  type?: "quantitative" | "temporal" | "ordinal" | "nominal";
  title?: string;
}

export interface EntityCardBlock extends BlockBase {
  type: "entity_card";
  entity_kind:
    | "user"
    | "agent"
    | "twin"
    | "dao"
    | "asset"
    | ExtensionIdentifier;
  entity_id: string;
  name: string;
  subtitle?: string;
  avatar_url?: URIString;
  fields?: Array<{ label: string; value: string }>;
}

export interface FormBlock extends BlockBase {
  type: "form";
  form_id: string;
  submit_action_id: string;
  fields: FormField[];
}

export type FormField =
  | {
      kind: "text";
      key: string;
      label: string;
      required?: boolean;
      placeholder?: string;
      default_value?: string;
    }
  | {
      kind: "textarea";
      key: string;
      label: string;
      required?: boolean;
      placeholder?: string;
      default_value?: string;
    }
  | {
      kind: "number";
      key: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      default_value?: number;
    }
  | {
      kind: "select";
      key: string;
      label: string;
      required?: boolean;
      options: Array<{ label: string; value: string }>;
      default_value?: string;
    }
  | {
      kind: "checkbox";
      key: string;
      label: string;
      default_value?: boolean;
    };

export interface StatusBlock extends BlockBase {
  type: "status";
  status: "idle" | "running" | "waiting" | "done" | "failed";
  message?: string;
}

export interface ErrorBlock extends BlockBase {
  type: "error";
  code: string;
  message: string;
  recoverable?: boolean;
}

export interface PaymentRequestBlock extends BlockBase {
  type: "payment_request";
  payment_scheme?: string;
  payment_intent_id?: string;
  amount: string;
  asset: string;
  receiver: string;
  memo?: string;
  status?: "pending" | "paid" | "expired" | "cancelled";
}

export interface PaymentReceiptBlock extends BlockBase {
  type: "payment_receipt";
  payment_scheme?: string;
  tx_hash?: string;
  amount: string;
  asset: string;
  sender: string;
  receiver: string;
  status: "confirmed" | "pending" | "failed";
}

export interface CustomBlock extends BlockBase {
  type: ExtensionIdentifier;
  data?: Record<string, unknown>;
}

export type ContentBlock =
  | TextBlock
  | MarkdownBlock
  | ImageBlock
  | FileBlock
  | CodeBlock
  | QuoteBlock
  | DividerBlock
  | BadgeBlock
  | StatBlock
  | TableBlock
  | ChartBlock
  | EntityCardBlock
  | FormBlock
  | StatusBlock
  | ErrorBlock
  | PaymentRequestBlock
  | PaymentReceiptBlock
  | CustomBlock;

export type CoreActionKind =
  | "submit_form"
  | "open_url"
  | "copy_text"
  | "reply_with_template"
  | "invoke_widget_action"
  | "invoke_tool"
  | "approve"
  | "reject"
  | "initiate_payment"
  | "open_artifact"
  | "retry"
  | "continue_task";

export interface AHIPAction {
  id: string;
  label: string;
  kind: CoreActionKind | ExtensionIdentifier;
  style?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  payload?: Record<string, unknown>;
  fallback_text?: string;
  extensions?: ExtensionsMap;
}

export type ApprovalScope =
  | "payment"
  | "wallet_signature"
  | "external_api"
  | "data_write"
  | "message_send"
  | "tool_execution"
  | "custom"
  | ExtensionIdentifier;

export type ApprovalObject = ApprovalRequest | ApprovalResponse;

export interface ApprovalRequest {
  approval_id: string;
  kind: "request";
  scope: ApprovalScope;
  title: string;
  description?: string;
  risk_level?: "low" | "medium" | "high";
  expires_at?: ISODateTimeString;
  payload?: Record<string, unknown>;
  fallback_text?: string;
  extensions?: ExtensionsMap;
}

export interface ApprovalResponse {
  approval_id: string;
  kind: "response";
  response: "approved" | "rejected" | "expired";
  reason?: string;
  responded_at?: ISODateTimeString;
  extensions?: ExtensionsMap;
}

export interface ToolIntent {
  intent_id: string;
  tool_name: string;
  status:
    | "proposed"
    | "awaiting_approval"
    | "awaiting_user_input"
    | "ready"
    | "running"
    | "completed"
    | "failed";
  title?: string;
  description?: string;
  proposed_args?: Record<string, unknown>;
  missing_fields?: string[];
  result_artifact_id?: string;
  fallback_text?: string;
  extensions?: ExtensionsMap;
}

export interface WidgetRef {
  id: string;
  widget_id: string;
  widget_type: string;
  props: Record<string, unknown>;
  permissions?: WidgetPermissions;
  fallback_text?: string;
  extensions?: ExtensionsMap;
}

export interface WidgetPermissions {
  network?: "none" | "limited";
  clipboard?: boolean;
  wallet?: boolean;
  storage?: "none" | "session";
  extensions?: ExtensionsMap;
}

export type CoreArtifactKind =
  | "dataset"
  | "document"
  | "report"
  | "deck_outline"
  | "slide_spec"
  | "code_bundle"
  | "payment_intent"
  | "task_snapshot"
  | "image"
  | "audio"
  | "video"
  | "custom";

export interface ArtifactRef {
  artifact_id: string;
  kind: CoreArtifactKind | ExtensionIdentifier;
  name?: string;
  uri?: URIString;
  mime_type?: string;
  checksum?: string;
  summary?: string;
  fallback_text?: string;
  extensions?: ExtensionsMap;
}

export interface StatePatch {
  patch_id: string;
  target: string;
  op: "set" | "merge" | "append" | "remove";
  path: string;
  value?: unknown;
  extensions?: ExtensionsMap;
}

export interface CapabilitySet {
  protocol_version: string;
  supported_item_kinds: string[];
  supported_blocks: string[];
  supported_actions: string[];
  supported_widget_types?: string[];
  supported_artifact_kinds?: string[];
  limits?: {
    max_blocks_per_item?: number;
    max_inline_table_rows?: number;
    max_chart_points?: number;
  };
  extensions?: ExtensionsMap;
}
