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
          <p className="font-semibold">Launched:</p>
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
          <p className="font-semibold">Platform:</p>
          <p>
            {projectPlatforms
              .map((platform) => platform.platform.label)
              .join(", ")}
          </p>
        </span>
        <span className="pm-info-text">
          <p className="font-semibold">Open Source:</p>
          <p>{opensource ? "Yes" : "No"}</p>
        </span>
        <span className="pm-info-text">
          <p className="font-semibold">License:</p>
          <p>{license}</p>
        </span>
        <span className="pm-info-text">
          <p className="font-semibold whitespace-nowrap">
            Languages supported:
          </p>
          <p>{languagesSupported}</p>
        </span>
      </div>
    </div>
  );
};
