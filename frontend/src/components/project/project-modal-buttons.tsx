import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";

export const ProjectModalButtons = ({
  opensource,
  githubUrl,
  projectPlatforms,
}: Pick<Project, "opensource" | "githubUrl" | "projectPlatforms">) => {
  const numPlatforms = projectPlatforms.length;

  let platformBtnClass = "w-full";
  if (numPlatforms === 2) platformBtnClass = "w-1/2";
  if (numPlatforms === 3) platformBtnClass = "w-1/3";

  return (
    <div className="pm-buttons-container">
      {opensource && githubUrl && (
        <div className="pm-button-row">
          <a
            className={cn("button-secondary flex-center w-full cursor-pointer")}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="pm-button-link-content">
              <span>View Repository</span>
              <Icon className="pm-button-icon-2xl" icon="mdi:github" />
            </span>
          </a>
        </div>
      )}
      {numPlatforms > 0 && (
        <div className="pm-button-row-gap-2">
          {projectPlatforms.map((projectPlatform) => (
            <a
              key={projectPlatform.platform.name}
              className={cn("button-primary flex-center", platformBtnClass)}
              href={projectPlatform.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex-gap-1 w-full justify-center h-full">
                <Icon
                  icon={projectPlatform.platform.iconName}
                  className="pm-button-icon-xl"
                />
                <span>{projectPlatform.platform.label}</span>
                <Icon icon="mdi:external-link" className="pm-button-icon-xs" />
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
