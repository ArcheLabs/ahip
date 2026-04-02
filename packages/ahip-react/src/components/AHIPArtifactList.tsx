import type { ReactNode } from "react";

import type { AHIPArtifactListProps } from "../types/host.js";
import { isSafeUrl } from "../utils/url.js";

export function AHIPArtifactList({
  item,
  artifacts,
  host
}: AHIPArtifactListProps): ReactNode {
  return (
    <div data-ahip-section="artifacts">
      {artifacts.map((artifact) => (
        <section data-ahip-artifact-kind={artifact.kind} key={artifact.artifact_id}>
          <strong>{artifact.name ?? artifact.artifact_id}</strong>
          {artifact.summary ? <p>{artifact.summary}</p> : null}
          {host.artifactOpener ? (
            <button
              onClick={() => {
                void host.artifactOpener?.openArtifact(artifact, { item });
              }}
              type="button"
            >
              Open artifact
            </button>
          ) : isSafeUrl(artifact.uri) ? (
            <a href={artifact.uri} rel="noreferrer" target="_blank">
              Open artifact
            </a>
          ) : artifact.fallback_text ? (
            <pre>{artifact.fallback_text}</pre>
          ) : null}
        </section>
      ))}
    </div>
  );
}
