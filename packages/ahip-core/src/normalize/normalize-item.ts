import { getFallbackText } from "../fallback/fallback.js";
import { assertValidAHIPItem } from "../validate/validator.js";
import type {
  AHIPItem,
  BadgeBlock,
  CapabilitySet,
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
  TextBlock
} from "../types/index.js";

function normalizeBlock(block: ContentBlock): ContentBlock {
  if (block.fallback_text) {
    return block;
  }

  switch (block.type) {
    case "text":
      return { ...block, fallback_text: (block as TextBlock).text };
    case "markdown":
      return { ...block, fallback_text: (block as MarkdownBlock).markdown };
    case "image":
      return { ...block, fallback_text: (block as ImageBlock).alt ?? block.caption ?? block.title };
    case "file":
      return { ...block, fallback_text: (block as FileBlock).name };
    case "code":
      return { ...block, fallback_text: (block as CodeBlock).code };
    case "quote":
      return {
        ...block,
        fallback_text: (block as QuoteBlock).attribution
          ? `${(block as QuoteBlock).text} — ${(block as QuoteBlock).attribution}`
          : (block as QuoteBlock).text
      };
    case "badge":
      return { ...block, fallback_text: (block as BadgeBlock).label };
    case "stat":
      return {
        ...block,
        fallback_text: `${(block as StatBlock).label}: ${(block as StatBlock).value}${(block as StatBlock).unit ? ` ${(block as StatBlock).unit}` : ""}`
      };
    case "table":
      return {
        ...block,
        fallback_text:
          block.title ?? block.caption ?? `Table with ${(block as TableBlock).rows.length} rows`
      };
    case "chart":
      return {
        ...block,
        fallback_text:
          block.title ?? block.caption ?? `Chart (${(block as ChartBlock).spec.kind})`
      };
    case "entity_card":
      return {
        ...block,
        fallback_text: (block as EntityCardBlock).subtitle
          ? `${(block as EntityCardBlock).name} — ${(block as EntityCardBlock).subtitle}`
          : (block as EntityCardBlock).name
      };
    case "form":
      return {
        ...block,
        fallback_text: block.title ?? block.caption ?? `Form ${(block as FormBlock).form_id}`
      };
    case "status":
      return {
        ...block,
        fallback_text: (block as StatusBlock).message ?? `Status: ${(block as StatusBlock).status}`
      };
    case "error":
      return {
        ...block,
        fallback_text: `${(block as ErrorBlock).code}: ${(block as ErrorBlock).message}`
      };
    case "payment_request":
      return {
        ...block,
        fallback_text: `Payment request ${(block as PaymentRequestBlock).amount} ${(block as PaymentRequestBlock).asset} to ${(block as PaymentRequestBlock).receiver}`
      };
    case "payment_receipt":
      return {
        ...block,
        fallback_text: `Payment receipt ${(block as PaymentReceiptBlock).amount} ${(block as PaymentReceiptBlock).asset} from ${(block as PaymentReceiptBlock).sender} to ${(block as PaymentReceiptBlock).receiver}`
      };
    default:
      return { ...block, fallback_text: block.title ?? block.caption };
  }
}

export function normalizeAHIPItem(input: unknown, _hostCapabilities?: CapabilitySet): AHIPItem {
  void _hostCapabilities;

  const item = structuredClone(assertValidAHIPItem(input));

  if (item.content) {
    item.content = item.content.map(normalizeBlock);
  }

  item.fallback_text ??= getFallbackText(item);

  return item;
}
