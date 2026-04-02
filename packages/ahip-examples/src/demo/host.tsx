import {
  createBlockRegistry,
  createWidgetRegistry,
  type AHIPActionDispatcher,
  type AHIPAppletRegistry,
  type AHIPArtifactOpener,
  type AHIPBlockRenderer,
  type AHIPWidgetRenderer
} from "@ahip/react";
import type { AHIPAction, ArtifactRef, ContentBlock, WidgetRef } from "@ahip/core";

import type { ExampleHostEvent } from "../types.js";
import {
  gomokuAppletManifest
} from "../applets/gomoku/manifest.js";
import {
  CUSTOM_PROFILE_BLOCK_TYPE,
  REGISTRY_WIDGET_TYPE,
  THROWING_PANEL_BLOCK_TYPE
} from "../valid/extensions.js";
import {
  GOMOKU_BOARD_BLOCK_TYPE,
  GOMOKU_WIDGET_TYPE
} from "../showcase/gomoku/types.js";

export interface ExampleHostDemo {
  events: ExampleHostEvent[];
  actionDispatcher: AHIPActionDispatcher;
  artifactOpener: AHIPArtifactOpener;
  appletRegistry: AHIPAppletRegistry;
  blockRendererRegistry: ReturnType<typeof createBlockRegistry>;
  widgetRegistry: ReturnType<typeof createWidgetRegistry>;
}

export interface LocalExampleAppletDefinition {
  manifest: {
    applet_id: string;
    widget_types: string[];
  };
  resolveWidgetRenderer: (widget: WidgetRef) => AHIPWidgetRenderer | undefined;
}

const ProfileCardRenderer: AHIPBlockRenderer = ({ block }) => {
  const data = (block as ContentBlock & {
    data?: { name?: string; role?: string; tags?: string[] };
  }).data;

  return (
    <section data-example-block="profile-card">
      <strong>{data?.name ?? "Unknown person"}</strong>
      {data?.role ? <div>{data.role}</div> : null}
      {data?.tags?.length ? <div>{data.tags.join(", ")}</div> : null}
    </section>
  );
};

const GomokuBoardRenderer: AHIPBlockRenderer = ({ block }) => {
  const data = (block as ContentBlock & {
    data?: { next_player?: string; winner?: string; move_history?: Array<{ coordinate: string }> };
  }).data;

  return (
    <section data-example-block="gomoku-board">
      <strong>{block.title ?? "Gomoku board"}</strong>
      <div>Next player: {data?.next_player ?? "unknown"}</div>
      <div>Winner: {data?.winner ?? "none"}</div>
      <div>Moves: {data?.move_history?.map((move) => move.coordinate).join(", ") || "none"}</div>
    </section>
  );
};

const CounterWidgetRenderer: AHIPWidgetRenderer = ({ widget }) => (
  <section data-example-widget="counter">
    Counter widget count: {String(widget.props.count ?? 0)}
  </section>
);

const GomokuWidgetRenderer: AHIPWidgetRenderer = ({ widget }) => (
  <section data-example-widget="gomoku">
    Local applet widget resolved for {widget.widget_id}
  </section>
);

export function createLocalAppletRegistry(
  applets: LocalExampleAppletDefinition[],
  events: ExampleHostEvent[]
): AHIPAppletRegistry {
  for (const applet of applets) {
    events.push({
      kind: "applet_registration",
      name: applet.manifest.applet_id,
      detail: `Registered widget types: ${applet.manifest.widget_types.join(", ")}`
    });
  }

  return {
    resolveWidgetRenderer(widget) {
      for (const applet of applets) {
        if (applet.manifest.applet_id !== widget.widget_id) {
          continue;
        }

        return applet.resolveWidgetRenderer(widget);
      }

      return undefined;
    }
  };
}

export function createExampleHostDemo(): ExampleHostDemo {
  const events: ExampleHostEvent[] = [];

  const actionDispatcher: AHIPActionDispatcher = {
    dispatchAction(action: AHIPAction, context): void {
      events.push({
        kind: "action",
        name: action.label,
        itemId: context.item.item_id,
        detail: action.kind
      });
    }
  };

  const artifactOpener: AHIPArtifactOpener = {
    openArtifact(artifact: ArtifactRef, context): void {
      events.push({
        kind: "artifact",
        name: artifact.name ?? artifact.artifact_id,
        itemId: context.item.item_id,
        detail: artifact.kind
      });
    }
  };

  const appletRegistry = createLocalAppletRegistry(
    [
      {
        manifest: gomokuAppletManifest,
        resolveWidgetRenderer(widget) {
          if (widget.widget_type === GOMOKU_WIDGET_TYPE) {
            return GomokuWidgetRenderer;
          }

          return undefined;
        }
      }
    ],
    events
  );

  const blockRendererRegistry = createBlockRegistry({
    customBlockRenderers: {
      [CUSTOM_PROFILE_BLOCK_TYPE]: ProfileCardRenderer,
      [GOMOKU_BOARD_BLOCK_TYPE]: GomokuBoardRenderer,
      [THROWING_PANEL_BLOCK_TYPE]: () => {
        throw new Error("Intentional renderer failure for demo coverage");
      }
    }
  });

  const widgetRegistry = createWidgetRegistry({
    widgetRenderers: {
      [REGISTRY_WIDGET_TYPE]: CounterWidgetRenderer
    }
  });
  return {
    events,
    actionDispatcher,
    artifactOpener,
    appletRegistry,
    blockRendererRegistry,
    widgetRegistry
  };
}
