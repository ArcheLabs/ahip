import type {
  AHIPItem,
  ApprovalObject,
  ArtifactRef,
  BadgeBlock,
  ChartBlock,
  CodeBlock,
  ContentBlock,
  EntityCardBlock,
  ErrorBlock,
  FileBlock,
  FormBlock,
  ImageBlock,
  MarkdownBlock,
  PaymentReceiptBlock,
  PaymentRequestBlock,
  QuoteBlock,
  StatBlock,
  StatusBlock,
  TableBlock,
  TextBlock,
  ToolIntent,
  WidgetRef
} from "../types/index.js";

function deriveBlockFallbackText(block: ContentBlock): string | undefined {
  if (block.fallback_text) {
    return block.fallback_text;
  }

  switch (block.type) {
    case "text":
      return (block as TextBlock).text;
    case "markdown":
      return (block as MarkdownBlock).markdown;
    case "image":
      return (block as ImageBlock).alt ?? block.caption ?? block.title;
    case "file":
      return (block as FileBlock).name;
    case "code":
      return (block as CodeBlock).code;
    case "quote":
      return (block as QuoteBlock).attribution
        ? `${(block as QuoteBlock).text} — ${(block as QuoteBlock).attribution}`
        : (block as QuoteBlock).text;
    case "badge":
      return (block as BadgeBlock).label;
    case "stat":
      return `${(block as StatBlock).label}: ${(block as StatBlock).value}${(block as StatBlock).unit ? ` ${(block as StatBlock).unit}` : ""}`;
    case "table":
      return block.title ?? block.caption ?? `Table with ${(block as TableBlock).rows.length} rows`;
    case "chart":
      return block.title ?? block.caption ?? `Chart (${(block as ChartBlock).spec.kind})`;
    case "entity_card":
      return (block as EntityCardBlock).subtitle
        ? `${(block as EntityCardBlock).name} — ${(block as EntityCardBlock).subtitle}`
        : (block as EntityCardBlock).name;
    case "form":
      return block.title ?? block.caption ?? `Form ${(block as FormBlock).form_id}`;
    case "status":
      return (block as StatusBlock).message ?? `Status: ${(block as StatusBlock).status}`;
    case "error":
      return `${(block as ErrorBlock).code}: ${(block as ErrorBlock).message}`;
    case "payment_request":
      return `Payment request ${(block as PaymentRequestBlock).amount} ${(block as PaymentRequestBlock).asset} to ${(block as PaymentRequestBlock).receiver}`;
    case "payment_receipt":
      return `Payment receipt ${(block as PaymentReceiptBlock).amount} ${(block as PaymentReceiptBlock).asset} from ${(block as PaymentReceiptBlock).sender} to ${(block as PaymentReceiptBlock).receiver}`;
    default:
      return block.title ?? block.caption;
  }
}

function collectApprovalFallbackText(approval: ApprovalObject): string | undefined {
  if ("fallback_text" in approval && approval.fallback_text) {
    return approval.fallback_text;
  }

  if (approval.kind === "request") {
    return approval.description ?? approval.title;
  }

  return approval.reason;
}

function collectToolIntentFallbackText(intent: ToolIntent): string | undefined {
  return intent.fallback_text ?? intent.description ?? intent.title;
}

function collectWidgetFallbackText(widget: WidgetRef): string | undefined {
  return widget.fallback_text ?? widget.widget_type;
}

function collectArtifactFallbackText(artifact: ArtifactRef): string | undefined {
  return artifact.fallback_text ?? artifact.summary ?? artifact.name ?? artifact.kind;
}

export function getFallbackText(item: AHIPItem): string | undefined {
  if (item.fallback_text) {
    return item.fallback_text;
  }

  const parts = [
    ...(item.content?.map(deriveBlockFallbackText) ?? []),
    ...(item.approvals?.map(collectApprovalFallbackText) ?? []),
    ...(item.tool_intents?.map(collectToolIntentFallbackText) ?? []),
    ...(item.widgets?.map(collectWidgetFallbackText) ?? []),
    ...(item.artifacts?.map(collectArtifactFallbackText) ?? [])
  ].filter((part): part is string => typeof part === "string" && part.length > 0);

  return parts.length > 0 ? parts.join("\n\n") : undefined;
}
