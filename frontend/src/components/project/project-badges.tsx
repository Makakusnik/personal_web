import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ProjectBadges = ({
  type,
  state,
}: Pick<Project, "type" | "state">) => {
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
