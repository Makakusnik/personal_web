import type { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectBadges } from "./project-badges";
import { ProjectInfo } from "./project-info";
import { ProjectModalButtons } from "./project-modal-buttons";
import { ProjectTechStack } from "./project-tech-stack";
import type { GetImageResult } from "astro";

interface Props {
  project: Project & { fullImageOptions: GetImageResult | null };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ProjectModal({
  project: {
    name,
    type,
    state,
    githubUrl,
    longDescriptionMd,
    fullImage,
    fullImageOptions,
    skills,
    launched,
    projectPlatforms,
    languagesSupported,
    opensource,
    license,
  },
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              {fullImageOptions && fullImage ? (
                <img
                  src={fullImageOptions.src}
                  alt={fullImage?.alternativeText || ""}
                  width={fullImageOptions.options.width}
                  height={fullImageOptions.options.height}
                  loading="eager"
                />
              ) : (
                <img
                  src={"/images/under_construction_full.webp"}
                  alt={"Project under construction."}
                  className="rounded-md w-full max-h-64 object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex gap-4 flex-1 flex-col sm:flex-row">
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
            <span className="flex flex-col gap-4 mt-2 md:flex-row">
              <span className="flex-1">
                <span
                  className="flex flex-col text-foreground w-full gap-2"
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
