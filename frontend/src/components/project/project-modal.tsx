import type { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";

interface Props {
  project: Project;
}

export default function ProjectModal({
  project: {
    name,
    type,
    state,
    githubUrl,
    longDescriptionMd,
    imagePath,
    skills,
    launched,
    projectPlatforms,
    languagesSupported,
    opensource,
    license,
  },
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className="button-secondary mt-auto self-start">
        View Details
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {name}
            <span className="inline-flex ml-3 gap-0.5">
              <ProjectBadges type={type} state={state} />
            </span>
          </DialogTitle>
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src={imagePath}
                alt={`${name} screenshot.`}
                className="rounded-md w-full max-h-64 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-y-4">
            <div className="flex items-center gap-4 flex-1">
              <ProjectTechStack skills={skills} />
              <ProjectInfo
                launched={launched}
                projectPlatforms={projectPlatforms}
                languagesSupported={languagesSupported}
                opensource={opensource}
                license={license}
              />
            </div>
            <ProjectModalButtons
              opensource={opensource}
              githubUrl={githubUrl}
              projectPlatforms={projectPlatforms}
            />
          </div>
          <DialogDescription>
            <span className="flex flex-col md:flex-row gap-4 mt-2">
              <span className="flex-1 order-2 md:order-1">
                <span
                  className="flex flex-col w-full gap-y-2"
                  dangerouslySetInnerHTML={{
                    __html: longDescriptionMd,
                  }}
                ></span>
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const ProjectTechStack = ({ skills }: Pick<Project, "skills">) => {
  return (
    <div className="flex flex-col basis-1/2 h-full">
      <p className="font-semibold inline-flex gap-4 whitespace-nowrap ">
        Tech Stack
      </p>
      <div className="p-2 items-center justify-center gap-4 rounded-md mb-2 flex flex-1 flex-wrap">
        {skills.map((skill) => (
          <span
            className="flex items-center justify-center bg-secondary/80 hover:bg-secondary rounded-md p-2"
            key={skill.skillName}
          >
            <Icon
              className="text-3xl text-sky-600"
              title={skill.skillName}
              icon={skill.iconName}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectBadges = ({ type, state }: Pick<Project, "type" | "state">) => {
  const typeColorMap: Record<string, string> = {
    saas: "bg-indigo-100 text-indigo-700",
    website: "bg-emerald-100 text-emerald-700",
    portfolio: "bg-rose-100 text-rose-700",
  };

  const stateColorMap: Record<string, string> = {
    online: "bg-emerald-100 text-emerald-700",
    "in-progress": "bg-amber-100 text-amber-700",
    offline: "bg-rose-100 text-rose-700",
  };

  return (
    <>
      <Badge className={cn("mr-2", typeColorMap[type.toLowerCase()])}>
        {type}
      </Badge>
      <Badge className={cn("mr-2", stateColorMap[state.toLowerCase()])}>
        {state}
      </Badge>
    </>
  );
};

const ProjectInfo = ({
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
    <div className="flex-1 h-full p-2 bg-secondary rounded-md">
      <div className="flex flex-col justify-center h-full px-2 gap-y-1">
        <span className="text-sm text-muted-foreground inline-flex gap-1">
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
        <span className="text-sm text-muted-foreground inline-flex gap-1">
          <p className="font-semibold">Platform:</p>
          <p>
            {projectPlatforms
              .map((platform) => platform.platform.label)
              .join(", ")}
          </p>
        </span>
        <span className="text-sm text-muted-foreground inline-flex gap-1">
          <p className="font-semibold">Open Source:</p>
          <p>{opensource ? "Yes" : "No"}</p>
        </span>
        <span className="text-sm text-muted-foreground inline-flex gap-1">
          <p className="font-semibold">License:</p>
          <p>{license}</p>
        </span>
        <span className="text-sm text-muted-foreground inline-flex gap-1">
          <p className="font-semibold whitespace-nowrap">
            Languages supported:
          </p>
          <p>{languagesSupported}</p>
        </span>
      </div>
    </div>
  );
};

const ProjectModalButtons = ({
  opensource,
  githubUrl,
  projectPlatforms,
}: Pick<Project, "opensource" | "githubUrl" | "projectPlatforms">) => {
  const numPlatforms = projectPlatforms.length;

  let platformBtnClass = "w-full";
  if (numPlatforms === 2) platformBtnClass = "w-1/2";
  if (numPlatforms === 3) platformBtnClass = "w-1/3";

  return (
    <div className="flex flex-col gap-2 w-full">
      {opensource && githubUrl && (
        <div className="flex w-full">
          <a
            className={cn(
              "button-secondary flex items-center justify-center w-full cursor-pointer",
            )}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-flex w-full items-center justify-center gap-2">
              <span>View Repository</span>
              <Icon className="text-2xl" icon="mdi:github" />
            </span>
          </a>
        </div>
      )}
      {numPlatforms > 0 && (
        <div className="flex w-full gap-2">
          {projectPlatforms.map((projectPlatform) => (
            <a
              key={projectPlatform.platform.name}
              className={cn(
                "button-primary flex items-center justify-center",
                platformBtnClass,
              )}
              href={projectPlatform.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center gap-1 w-full justify-center h-full">
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
