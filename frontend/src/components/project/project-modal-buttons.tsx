import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";

export const ProjectModalButtons = ({
  name,
  opensource,
  githubUrl,
  projectPlatforms,
}: Pick<Project, "opensource" | "githubUrl" | "projectPlatforms" | "name">) => {
  const numPlatforms = projectPlatforms.length;
  const hasRepo = opensource && githubUrl;
  const totalButtons = numPlatforms + (hasRepo ? 1 : 0);

  const canFitInOneRow = totalButtons <= 2;

  return (
    <div className="flex flex-col gap-2 w-full">
      {hasRepo && (
        <div
          className={cn(
            "flex w-full gap-x-2",
            canFitInOneRow &&
              "flex-col sm:flex-row items-center justify-center gap-y-2",
          )}
        >
          <a
            className={cn(
              "button-secondary flex items-center justify-center cursor-pointer",
              canFitInOneRow && numPlatforms === 1
                ? "w-full sm:w-1/2"
                : "w-full",
            )}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event={`project-${name}-github-link`}
          >
            <span className="inline-flex w-full items-center justify-center gap-2">
              <span className="whitespace-nowrap">View Repository</span>
              <Icon className="text-2xl" icon="mdi:github" />
            </span>
          </a>
          {canFitInOneRow && numPlatforms === 1 && (
            <div className="w-full sm:w-1/2">
              <a
                className="button-primary inline-flex items-center justify-center w-full"
                href={projectPlatforms[0].url}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event={`project-${name}-platform-${projectPlatforms[0].platform.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="inline-flex w-full items-center justify-center gap-2">
                  <Icon
                    icon={projectPlatforms[0].platform.iconName}
                    className="text-xl"
                  />
                  <span>{projectPlatforms[0].platform.label}</span>
                  <Icon icon="mdi:external-link" className="text-xs" />
                </span>
              </a>
            </div>
          )}
        </div>
      )}

      {numPlatforms > 0 &&
        !(canFitInOneRow && numPlatforms === 1 && hasRepo) && (
          <div
            className={cn(
              "flex w-full gap-2",
              numPlatforms === 2 && !hasRepo && canFitInOneRow
                ? "flex-row"
                : numPlatforms > 2
                  ? "flex-col sm:flex-row"
                  : "flex-col",
            )}
          >
            {projectPlatforms.map((projectPlatform) => (
              <a
                key={projectPlatform.platform.name}
                className={cn(
                  "button-primary inline-flex items-center justify-center",
                  numPlatforms === 2 && !hasRepo && canFitInOneRow
                    ? "flex-1"
                    : numPlatforms === 2 && hasRepo
                      ? "w-full"
                      : numPlatforms === 3
                        ? "flex-1 sm:w-auto"
                        : "w-full",
                )}
                href={projectPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event={`project-${name}-platform-${projectPlatform.platform.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="inline-flex w-full items-center justify-center gap-2">
                  <Icon
                    icon={projectPlatform.platform.iconName}
                    className="text-xl"
                  />
                  <span>{projectPlatform.platform.label}</span>
                  <Icon icon="mdi:external-link" className="text-xs" />
                </span>
              </a>
            ))}
          </div>
        )}
    </div>
  );
};
