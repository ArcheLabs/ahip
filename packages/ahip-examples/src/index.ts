export type {
  AHIPExampleFixture,
  ExampleAppletManifest,
  ExampleAppletRegistrationStep,
  ExampleHostEvent
} from "./types.js";

export {
  standardBlockItem,
  approvalRequestItem,
  paymentRequestItem,
  artifactAnnouncementItem,
  validFixtures
} from "./valid/standard.js";

export {
  CUSTOM_PROFILE_BLOCK_TYPE,
  REGISTRY_WIDGET_TYPE,
  UNSUPPORTED_WIDGET_TYPE,
  UNSUPPORTED_BLOCK_TYPE,
  THROWING_PANEL_BLOCK_TYPE,
  customBlockRegistryItem,
  unsupportedBlockFallbackItem,
  widgetRegistryItem,
  unsupportedWidgetFallbackItem,
  partialFailureRenderItem,
  extensionFixtures
} from "./valid/extensions.js";

export { invalidFixtures } from "./invalid/items.js";

export {
  GOMOKU_APPLET_ID,
  GOMOKU_BOARD_BLOCK_TYPE,
  GOMOKU_WIDGET_TYPE,
  type GomokuBoardData,
  type GomokuMove
} from "./showcase/gomoku/types.js";

export {
  gomokuGameStartItem,
  gomokuHumanMoveSubmissionItem,
  gomokuUpdatedBoardItem,
  gomokuGameFinishedItem,
  gomokuShowcaseFixtures
} from "./showcase/gomoku/fixtures.js";

export {
  gomokuAppletManifest,
  invalidGomokuAppletManifest,
  gomokuAppletRegistrationFlow,
  appletResolvedWidgetItem,
  appletBoundaryFixtures
} from "./applets/gomoku/manifest.js";

export { createExampleHostDemo, createLocalAppletRegistry } from "./demo/host.js";
