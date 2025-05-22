import type { Project } from "@/types";
import { Icon } from "@iconify-icon/react";

export const ProjectTechStack = ({ skills }: Pick<Project, "skills">) => {
  return (
    <div className="pm-tech-stack-container">
      <p className="pm-tech-stack-title text-foreground">Tech Stack</p>
      <div className="pm-tech-stack-icons-container">
        {skills.map((skill) => (
          <span className="pm-tech-stack-icon-wrapper" key={skill.skillName}>
            <Icon
              className="pm-tech-stack-icon"
              title={skill.skillName}
              icon={skill.iconName}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
