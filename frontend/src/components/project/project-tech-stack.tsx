import type { Project } from "@/types";
import { Icon } from "@iconify-icon/react";

export const ProjectTechStack = ({ skills }: Pick<Project, "skills">) => {
  return (
    <div className="flex flex-col basis-1/2 h-full">
      <p className="font-semibold inline-flex gap-4 whitespace-nowrap text-foreground">
        Tech Stack
      </p>
      <div className="p-2 items-center justify-center gap-4 rounded-md mb-2 flex flex-1 flex-wrap">
        {skills.map((skill) => (
          <span
            className="flex items-center justify-center bg-secondary/80 p-2 rounded-md hover:bg-secondary"
            key={skill.skillName}
          >
            <Icon
              className="text-3xl text-primary"
              width={24}
              height={24}
              noobserver={true}
              title={skill.skillName}
              icon={skill.iconName}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
