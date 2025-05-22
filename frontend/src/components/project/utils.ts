import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "../ui/badge-variants";
import type { Project } from "@/types";

export function getProjectStateBadgeData(state: Project["state"]) {
  let stateVariant: VariantProps<typeof badgeVariants>["variant"];
  let stateLabel: "Online" | "In Progress" | "Offline" | "Unknown";
  switch (state?.toLowerCase()) {
    case "online":
      stateVariant = "online" as const;
      stateLabel = "Online";
      break;
    case "in-progress":
      stateVariant = "in-progress" as const;
      stateLabel = "In Progress";
      break;
    case "offline":
      stateVariant = "offline" as const;
      stateLabel = "Offline";
      break;
    default:
      stateVariant = "outline";
      stateLabel = "Unknown";
  }
  return { stateLabel, stateVariant };
}

export function getProjectTypeBadgeData(type: Project["type"]) {
  let typeVariant: VariantProps<typeof badgeVariants>["variant"];
  switch (type?.toLowerCase()) {
    case "saas":
      typeVariant = "saas";
      break;
    case "website":
      typeVariant = "website";
      break;
    case "portfolio":
      typeVariant = "portfolio";
      break;
    default:
      typeVariant = "default";
  }

  return { typeVariant };
}
