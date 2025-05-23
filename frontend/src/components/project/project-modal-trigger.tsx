import React, { useState, useEffect, useCallback } from "react";
import ProjectModal from "./project-modal";
import type { Project } from "@/types";

export default function ProjectModalTrigger({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  const handlePopState = useCallback((event: PopStateEvent) => {
    if (event.state && event.state.dialog) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const openDialog = () => {
    history.pushState(
      { dialog: true, name: project.name },
      "",
      `#dialog-open-${project.name}`,
    );
    setOpen(true);
  };

  const closeDialog = () => {
    if (history.state && history.state.dialog) {
      history.back();
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, handlePopState]);

  return (
    <>
      <button
        type="button"
        className="button-secondary mt-auto self-start"
        onClick={openDialog}
      >
        View Details
      </button>
      <ProjectModal
        open={open}
        onOpenChange={(val) => (val ? openDialog() : closeDialog())}
        project={project}
      />
    </>
  );
}
