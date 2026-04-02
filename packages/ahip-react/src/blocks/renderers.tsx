import type { ReactNode } from "react";

import type {
  BadgeBlock,
  ChartBlock,
  ContentBlock,
  CoreBlockType,
  FileBlock,
  FormField,
  TableCellValue,
  TableColumn,
  TextBlock,
  MarkdownBlock,
  ImageBlock,
  CodeBlock,
  QuoteBlock,
  StatBlock,
  TableBlock,
  FormBlock,
  StatusBlock,
  ErrorBlock,
  PaymentRequestBlock,
  PaymentReceiptBlock,
  EntityCardBlock
} from "@ahip/core";

import type { AHIPBlockRenderer } from "../types/host.js";
import { formatBytes, isSafeUrl } from "../utils/url.js";

function renderCaption(block: ContentBlock): ReactNode {
  return block.caption ? <figcaption>{block.caption}</figcaption> : null;
}

function renderOptionalTitle(block: ContentBlock): ReactNode {
  return block.title ? <h4>{block.title}</h4> : null;
}

function renderLink(label: string, url: string | undefined): ReactNode {
  if (!isSafeUrl(url)) {
    return <span>{label}</span>;
  }

  return (
    <a href={url} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
}

function renderTableCell(value: TableCellValue): ReactNode {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  if (value === null) {
    return "null";
  }

  switch (value.kind) {
    case "badge":
      return <span data-ahip-table-badge={value.tone ?? "neutral"}>{value.label}</span>;
    case "link":
      return renderLink(value.label, value.href);
    case "progress":
      return <progress max={100} value={value.value} />;
    default:
      return JSON.stringify(value);
  }
}

function renderChartTable(block: ChartBlock): ReactNode {
  const columns = Array.from(
    new Set(block.spec.data.flatMap((row) => Object.keys(row)))
  );

  if (columns.length === 0) {
    return <div>No chart data</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.spec.data.slice(0, 5).map((row, index) => (
          <tr key={`${block.id}-row-${index}`}>
            {columns.map((column) => (
              <td key={column}>{row[column] === undefined ? "" : String(row[column])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderFormField(field: FormField): ReactNode {
  switch (field.kind) {
    case "text":
      return <input defaultValue={field.default_value} disabled placeholder={field.placeholder} type="text" />;
    case "textarea":
      return (
        <textarea defaultValue={field.default_value} disabled placeholder={field.placeholder} />
      );
    case "number":
      return (
        <input
          defaultValue={field.default_value}
          disabled
          max={field.max}
          min={field.min}
          type="number"
        />
      );
    case "select":
      return (
        <select defaultValue={field.default_value} disabled>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return <input defaultChecked={field.default_value} disabled type="checkbox" />;
    default:
      return null;
  }
}

function renderTableHeader(column: TableColumn): ReactNode {
  return (
    <th key={column.key} style={{ textAlign: column.align ?? "left" }}>
      {column.title}
    </th>
  );
}

export const TextBlockRenderer: AHIPBlockRenderer<TextBlock> = ({ block }) => (
  <div data-ahip-block="text">
    {renderOptionalTitle(block)}
    <p>{block.text}</p>
  </div>
);

export const MarkdownBlockRenderer: AHIPBlockRenderer<MarkdownBlock> = ({
  block
}) => (
  <div data-ahip-block="markdown">
    {renderOptionalTitle(block)}
    <pre>{block.markdown}</pre>
  </div>
);

export const ImageBlockRenderer: AHIPBlockRenderer<ImageBlock> = ({ block }) => (
  <figure data-ahip-block="image">
    {renderOptionalTitle(block)}
    {isSafeUrl(block.url) ? (
      <img
        alt={block.alt ?? block.title ?? "AHIP image"}
        height={block.height}
        src={block.url}
        width={block.width}
      />
    ) : (
      <div>{block.fallback_text ?? block.alt ?? "Unsupported image URL"}</div>
    )}
    {renderCaption(block)}
  </figure>
);

export const FileBlockRenderer: AHIPBlockRenderer<FileBlock> = ({ block }) => (
  <div data-ahip-block="file">
    {renderOptionalTitle(block)}
    <div>{renderLink(block.name, block.url)}</div>
    {block.mime_type ? <div>{block.mime_type}</div> : null}
    {typeof block.size_bytes === "number" ? <div>{formatBytes(block.size_bytes)}</div> : null}
    {renderCaption(block)}
  </div>
);

export const CodeBlockRenderer: AHIPBlockRenderer<CodeBlock> = ({ block }) => (
  <div data-ahip-block="code">
    {renderOptionalTitle(block)}
    {block.language ? <div>{block.language}</div> : null}
    <pre>
      <code>{block.code}</code>
    </pre>
  </div>
);

export const QuoteBlockRenderer: AHIPBlockRenderer<QuoteBlock> = ({ block }) => (
  <blockquote data-ahip-block="quote">
    {renderOptionalTitle(block)}
    <p>{block.text}</p>
    {block.attribution ? <footer>{block.attribution}</footer> : null}
  </blockquote>
);

export const DividerBlockRenderer: AHIPBlockRenderer = () => <hr data-ahip-block="divider" />;

export const BadgeBlockRenderer: AHIPBlockRenderer<BadgeBlock> = ({ block }) => (
  <span data-ahip-badge={block.tone ?? "neutral"}>{block.label}</span>
);

export const StatBlockRenderer: AHIPBlockRenderer<StatBlock> = ({ block }) => (
  <div data-ahip-block="stat">
    {renderOptionalTitle(block)}
    <div>{block.label}</div>
    <strong>
      {block.value}
      {block.unit ? ` ${block.unit}` : ""}
    </strong>
    {block.delta ? (
      <div>
        Delta: {block.delta.direction} {block.delta.value}
      </div>
    ) : null}
  </div>
);

export const TableBlockRenderer: AHIPBlockRenderer<TableBlock> = ({ block }) => (
  <figure data-ahip-block="table">
    {renderOptionalTitle(block)}
    <table>
      <thead>
        <tr>{block.columns.map(renderTableHeader)}</tr>
      </thead>
      <tbody>
        {block.rows.map((row, index) => (
          <tr key={`${block.id}-row-${index}`}>
            {block.columns.map((column) => (
              <td key={column.key}>{renderTableCell(row[column.key] ?? null)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {renderCaption(block)}
  </figure>
);

export const ChartBlockRenderer: AHIPBlockRenderer<ChartBlock> = ({ block }) => (
  <section data-ahip-block="chart">
    {renderOptionalTitle(block)}
    <div>Chart type: {block.spec.kind}</div>
    <div>Points: {block.spec.data.length}</div>
    {renderChartTable(block)}
    {renderCaption(block)}
  </section>
);

export const EntityCardBlockRenderer: AHIPBlockRenderer<EntityCardBlock> = ({
  block
}) => (
  <section data-ahip-block="entity_card">
    {renderOptionalTitle(block)}
    <h4>{block.name}</h4>
    {block.subtitle ? <div>{block.subtitle}</div> : null}
    {block.fields?.length ? (
      <dl>
        {block.fields.map((field) => (
          <div key={field.label}>
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}
  </section>
);

export const FormBlockRenderer: AHIPBlockRenderer<FormBlock> = ({ block }) => (
  <form data-ahip-block="form">
    {renderOptionalTitle(block)}
    <fieldset disabled>
      {block.fields.map((field) => (
        <label key={field.key}>
          <span>{field.label}</span>
          {renderFormField(field)}
        </label>
      ))}
    </fieldset>
    <div>Submit action: {block.submit_action_id}</div>
  </form>
);

export const StatusBlockRenderer: AHIPBlockRenderer<StatusBlock> = ({ block }) => (
  <div data-ahip-block="status" role="status">
    {renderOptionalTitle(block)}
    <strong>{block.status}</strong>
    {block.message ? <div>{block.message}</div> : null}
  </div>
);

export const ErrorBlockRenderer: AHIPBlockRenderer<ErrorBlock> = ({ block }) => (
  <div data-ahip-block="error" role="alert">
    {renderOptionalTitle(block)}
    <strong>{block.code}</strong>
    <div>{block.message}</div>
    {block.recoverable !== undefined ? (
      <div>{block.recoverable ? "Recoverable" : "Not recoverable"}</div>
    ) : null}
  </div>
);

export const PaymentRequestBlockRenderer: AHIPBlockRenderer<PaymentRequestBlock> = ({
  block
}) => (
  <section data-ahip-block="payment_request">
    {renderOptionalTitle(block)}
    <dl>
      <div>
        <dt>Amount</dt>
        <dd>
          {block.amount} {block.asset}
        </dd>
      </div>
      <div>
        <dt>Receiver</dt>
        <dd>{block.receiver}</dd>
      </div>
      {block.memo ? (
        <div>
          <dt>Memo</dt>
          <dd>{block.memo}</dd>
        </div>
      ) : null}
      {block.status ? (
        <div>
          <dt>Status</dt>
          <dd>{block.status}</dd>
        </div>
      ) : null}
    </dl>
  </section>
);

export const PaymentReceiptBlockRenderer: AHIPBlockRenderer<PaymentReceiptBlock> = ({
  block
}) => (
  <section data-ahip-block="payment_receipt">
    {renderOptionalTitle(block)}
    <dl>
      <div>
        <dt>Amount</dt>
        <dd>
          {block.amount} {block.asset}
        </dd>
      </div>
      <div>
        <dt>Sender</dt>
        <dd>{block.sender}</dd>
      </div>
      <div>
        <dt>Receiver</dt>
        <dd>{block.receiver}</dd>
      </div>
      <div>
        <dt>Status</dt>
        <dd>{block.status}</dd>
      </div>
      {block.tx_hash ? (
        <div>
          <dt>Transaction</dt>
          <dd>{block.tx_hash}</dd>
        </div>
      ) : null}
    </dl>
  </section>
);

export const defaultBlockRenderers: Record<CoreBlockType, AHIPBlockRenderer> = {
  text: TextBlockRenderer as AHIPBlockRenderer,
  markdown: MarkdownBlockRenderer as AHIPBlockRenderer,
  image: ImageBlockRenderer as AHIPBlockRenderer,
  file: FileBlockRenderer as AHIPBlockRenderer,
  code: CodeBlockRenderer as AHIPBlockRenderer,
  quote: QuoteBlockRenderer as AHIPBlockRenderer,
  divider: DividerBlockRenderer,
  badge: BadgeBlockRenderer as AHIPBlockRenderer,
  stat: StatBlockRenderer as AHIPBlockRenderer,
  table: TableBlockRenderer as AHIPBlockRenderer,
  chart: ChartBlockRenderer as AHIPBlockRenderer,
  entity_card: EntityCardBlockRenderer as AHIPBlockRenderer,
  form: FormBlockRenderer as AHIPBlockRenderer,
  status: StatusBlockRenderer as AHIPBlockRenderer,
  error: ErrorBlockRenderer as AHIPBlockRenderer,
  payment_request: PaymentRequestBlockRenderer as AHIPBlockRenderer,
  payment_receipt: PaymentReceiptBlockRenderer as AHIPBlockRenderer
};
