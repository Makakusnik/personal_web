import type { Project } from "@/types";

export const ProjectInfo = ({
  launched,
  projectPlatforms,
  languagesSupported,
  opensource,
  license,
}: Pick<
  Project,
  | "launched"
  | "projectPlatforms"
  | "languagesSupported"
  | "opensource"
  | "license"
>) => {
  return (
    <div className="pm-info-box">
      <div className="pm-info-box-content">
        <span className="pm-info-text">
          <p className="pm-info-label">Launched:</p>
          <p>
            {launched
              ? new Date(launched).toLocaleDateString(undefined, {
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </span>
        <span className="pm-info-text">
          <p className="pm-info-label">Platform:</p>
          <p>
            {projectPlatforms
              .map((platform) => platform.platform.label)
              .join(", ")}
          </p>
        </span>
        <span className="pm-info-text">
          <p className="pm-info-label">Open Source:</p>
          <p>{opensource ? "Yes" : "No"}</p>
        </span>
        <span className="pm-info-text">
          <p className="pm-info-label">License:</p>
          <p>{license}</p>
        </span>
        <span className="pm-info-text">
          <p className="pm-info-label-nowrap">Languages supported:</p>
          <p>{languagesSupported}</p>
        </span>
      </div>
    </div>
  );
};
