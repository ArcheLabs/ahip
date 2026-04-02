import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AHIPItemRenderer } from "@ahip/react";

import {
  createExampleHostDemo,
  gomokuGameFinishedItem,
  gomokuGameStartItem,
  gomokuHumanMoveSubmissionItem,
  gomokuUpdatedBoardItem
} from "./index.js";

describe("@ahip/examples Gomoku integrity", () => {
  it("exports the required Gomoku lifecycle fixtures", () => {
    expect(gomokuGameStartItem.title).toContain("Gomoku");
    expect(gomokuHumanMoveSubmissionItem.item.actor.actor_kind).toBe("human");
    expect(gomokuUpdatedBoardItem.item.widgets?.length).toBeGreaterThan(0);
    expect(gomokuGameFinishedItem.item.fallback_text).toContain("Gomoku (Five in a Row)");
  });

  it("renders through the local applet-aware host demo", () => {
    const demo = createExampleHostDemo();
    const html = renderToStaticMarkup(
      <AHIPItemRenderer
        actionDispatcher={demo.actionDispatcher}
        appletRegistry={demo.appletRegistry}
        artifactOpener={demo.artifactOpener}
        blockRendererRegistry={demo.blockRendererRegistry}
        item={gomokuGameStartItem.item}
        widgetRegistry={demo.widgetRegistry}
      />
    );

    expect(html).toContain("Gomoku (Five in a Row)");
    expect(html).toContain("Local applet widget resolved");
  });

  it("still renders fallback text on hosts without the local applet registry", () => {
    const html = renderToStaticMarkup(<AHIPItemRenderer item={gomokuGameStartItem.item} />);

    expect(html).toContain("Interactive Gomoku board unavailable");
  });
});
