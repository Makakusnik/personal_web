import React, { useState, useEffect, useCallback, useRef } from "react";
import ProjectModal from "./project-modal";
import type { Project } from "@/types";
import type { GetImageResult } from "astro";

export default function ProjectModalTrigger({
  project,
}: {
  project: Project & { fullImageOptions: GetImageResult };
}) {
  const [open, setOpen] = useState(false);
  const dialogHash = `#dialog-open-${project.name.toLowerCase().replace(/\s+/g, "-")}`;
  const originalPathRef = useRef("");

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      if (event.state?.dialog && event.state.name === project.name) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    },
    [project.name],
  );

  const openDialog = useCallback(() => {
    if (openRef.current) return;

    originalPathRef.current = window.location.pathname + window.location.search;
    history.pushState(
      {
        dialog: true,
        name: project.name,
        originalPath: originalPathRef.current,
      },
      "",
      originalPathRef.current + dialogHash,
    );
    setOpen(true);
  }, [project.name, dialogHash]);

  const closeDialog = useCallback(() => {
    if (!openRef.current) return;

    setOpen(false);

    if (window.location.hash === dialogHash) {
      history.back();
    }
  }, [dialogHash]);

  useEffect(() => {
    if (open) {
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
      if (window.location.hash === dialogHash) {
        history.replaceState(
          {},
          "",
          originalPathRef.current ||
            window.location.pathname + window.location.search,
        );
      }
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, handlePopState, dialogHash]);

  useEffect(() => {
    if (!openRef.current && window.location.hash === dialogHash) {
      setOpen(true);
      originalPathRef.current =
        window.location.pathname + window.location.search;
      history.replaceState(
        {
          dialog: true,
          name: project.name,
          originalPath: originalPathRef.current,
        },
        "",
        originalPathRef.current + dialogHash,
      );
      window.addEventListener("popstate", handlePopState);
    }
  }, [dialogHash, project.name, handlePopState]);

  return (
    <>
      <button
        type="button"
        className="button-secondary mt-auto self-start"
        onClick={openDialog}
        data-umami-event={`project-${project.name}-view-details`}
      >
        View Details
      </button>
      <ProjectModal
        open={open}
        onOpenChange={(val) => {
          if (val) {
            openDialog();
          } else {
            closeDialog();
          }
        }}
        project={project}
      />
    </>
  );
}
