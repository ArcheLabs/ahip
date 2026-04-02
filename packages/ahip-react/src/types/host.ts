import type { ReactNode } from "react";

import type {
  AHIPAction,
  AHIPItem,
  ApprovalObject,
  ArtifactRef,
  CapabilitySet,
  ContentBlock,
  CoreBlockType,
  StatePatch,
  ToolIntent,
  WidgetRef
} from "@ahip/core";

export type AHIPRenderArea =
  | "item"
  | "content"
  | "block"
  | "action"
  | "approval"
  | "widget"
  | "artifact"
  | "state_patch"
  | "tool_intent";

export interface AHIPFallbackRendererProps {
  kind: AHIPRenderArea;
  title?: string;
  reason?: string;
  fallbackText?: string;
  rawValue?: unknown;
}

export type AHIPFallbackRendererComponent = (
  props: AHIPFallbackRendererProps
) => ReactNode;

export interface AHIPRenderErrorContext {
  area: AHIPRenderArea;
  identifier: string;
  item: AHIPItem;
  error: unknown;
}

export interface AHIPActionDispatchContext {
  item: AHIPItem;
}

export interface AHIPArtifactOpenContext {
  item: AHIPItem;
}

export interface AHIPActionDispatcher {
  dispatchAction(
    action: AHIPAction,
    context: AHIPActionDispatchContext
  ): void | Promise<void>;
}

export interface AHIPArtifactOpener {
  openArtifact(
    artifact: ArtifactRef,
    context: AHIPArtifactOpenContext
  ): void | Promise<void>;
}

export interface AHIPHostContext {
  actionDispatcher?: AHIPActionDispatcher;
  artifactOpener?: AHIPArtifactOpener;
  appletRegistry?: AHIPAppletRegistry;
  capabilities?: CapabilitySet;
  onRenderError?: (context: AHIPRenderErrorContext) => void;
}

export interface AHIPBlockRendererProps<
  TBlock extends ContentBlock = ContentBlock
> {
  block: TBlock;
  item: AHIPItem;
  host: AHIPHostContext;
  fallback: ReactNode;
}

export type AHIPBlockRenderer<TBlock extends ContentBlock = ContentBlock> = (
  props: AHIPBlockRendererProps<TBlock>
) => ReactNode;

export interface AHIPWidgetRendererProps {
  widget: WidgetRef;
  item: AHIPItem;
  host: AHIPHostContext;
  fallback: ReactNode;
}

export type AHIPWidgetRenderer = (
  props: AHIPWidgetRendererProps
) => ReactNode;

export interface AHIPAppletWidgetResolutionContext {
  item: AHIPItem;
  host: AHIPHostContext;
}

export interface AHIPAppletRegistry {
  resolveWidgetRenderer(
    widget: WidgetRef,
    context: AHIPAppletWidgetResolutionContext
  ): AHIPWidgetRenderer | undefined;
}

export interface AHIPBlockRendererRegistry {
  get(type: string): AHIPBlockRenderer | undefined;
  has(type: string): boolean;
  list(): string[];
}

export interface AHIPWidgetRegistry {
  get(type: string): AHIPWidgetRenderer | undefined;
  has(type: string): boolean;
  list(): string[];
}

export interface CreateBlockRegistryOptions {
  standardBlockRenderers?: Partial<Record<CoreBlockType, AHIPBlockRenderer>>;
  customBlockRenderers?: Record<string, AHIPBlockRenderer>;
}

export interface CreateWidgetRegistryOptions {
  widgetRenderers?: Record<string, AHIPWidgetRenderer>;
}

export interface AHIPActionBarProps {
  item: AHIPItem;
  actions: AHIPAction[];
  host: AHIPHostContext;
}

export interface AHIPApprovalListProps {
  item: AHIPItem;
  approvals: ApprovalObject[];
}

export interface AHIPArtifactListProps {
  item: AHIPItem;
  artifacts: ArtifactRef[];
  host: AHIPHostContext;
}

export interface AHIPStatePatchListProps {
  statePatches: StatePatch[];
}

export interface AHIPToolIntentListProps {
  toolIntents: ToolIntent[];
}
