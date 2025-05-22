import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  getProjectStateBadgeData,
  getProjectTypeBadgeData,
} from "@/components/project/utils";

export const ProjectBadges = ({
  type,
  state,
}: Pick<Project, "type" | "state">) => {
  const { typeVariant } = getProjectTypeBadgeData(type);
  const { stateLabel, stateVariant } = getProjectStateBadgeData(state);

  return (
    <>
      {type && (
        <Badge variant={typeVariant} className="mr-2">
          {type}
        </Badge>
      )}
      {state && (
        <Badge variant={stateVariant} className="mr-2">
          {stateLabel}
        </Badge>
      )}
    </>
  );
};
