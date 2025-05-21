import type { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectBadges } from "./project-badges";
import { ProjectInfo } from "./project-info";
import { ProjectModalButtons } from "./project-modal-buttons";
import { ProjectTechStack } from "./project-tech-stack";

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
          <DialogTitle className="pm-title">
            {name}
            <span className="pm-title-badges">
              <ProjectBadges type={type} state={state} />
            </span>
          </DialogTitle>
          <div className="pm-image-container">
            <div className="pm-image-wrapper">
              <img
                src={imagePath}
                alt={`${name} screenshot.`}
                className="pm-image"
              />
            </div>
          </div>
          <div className="pm-content-layout">
            <div className="pm-info-container">
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
            <span className="pm-description-container">
              <span className="pm-description-text-wrapper">
                <span
                  className="pm-description-text"
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
