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
    <div className="flex-1 h-full p-2 bg-background-secondary rounded-md">
      <div className="flex flex-col justify-center h-full px-2 gap-1">
        <span className="text-sm text-foreground inline-flex gap-1">
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
        <span className="text-sm text-foreground inline-flex gap-1">
          <p className="font-semibold">Platform:</p>
          <p>
            {projectPlatforms
              .map((platform) => platform.platform.label)
              .join(", ")}
          </p>
        </span>
        <span className="text-sm text-foreground inline-flex gap-1">
          <p className="font-semibold">Open Source:</p>
          <p>{opensource ? "Yes" : "No"}</p>
        </span>
        <span className="text-sm text-foreground inline-flex gap-1">
          <p className="font-semibold">License:</p>
          <p>{license}</p>
        </span>
        <span className="text-sm text-foreground inline-flex gap-1">
          <p className="font-semibold whitespace-nowrap">
            Languages supported:
          </p>
          <p>{languagesSupported}</p>
        </span>
      </div>
    </div>
  );
};
