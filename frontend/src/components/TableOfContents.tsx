import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "about", title: "About Me" },
    { id: "experience", title: "Experience" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
  ];

  useEffect(() => {
    // Set the first section as active by default
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Get all entries that are currently intersecting
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting,
        );

        // If we have intersecting entries, update the active section to the first one
        if (intersectingEntries.length > 0) {
          // Sort by their position in the DOM (top to bottom)
          intersectingEntries.sort((a, b) => {
            const aRect = a.target.getBoundingClientRect();
            const bRect = b.target.getBoundingClientRect();
            return aRect.top - bRect.top;
          });

          // Set the topmost visible section as active
          setActiveSection(intersectingEntries[0].target.id);
        }
        // If no entries are intersecting and we're dealing with a section leaving the viewport
        else if (entries.length === 1 && !entries[0].isIntersecting) {
          const leavingSection = entries[0].target;
          const leavingSectionRect = leavingSection.getBoundingClientRect();

          // If section is exiting through the top of the viewport, find the next section
          if (leavingSectionRect.top < 0) {
            // Find the index of the section that's leaving
            const leavingSectionIndex = sections.findIndex(
              (section) => section.id === leavingSection.id,
            );

            // If there's a section after this one, make it active
            if (leavingSectionIndex < sections.length - 1) {
              setActiveSection(sections[leavingSectionIndex + 1].id);
            }
          }
        }
      },
      {
        // Simple rootMargin that works well for most content
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections, activeSection]);

  return (
    <div className="fixed top-8 right-8 z-50 hidden md:block">
      <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg min-w-[240px]">
        <ul className="space-y-4">
          {sections.map(({ id, title }) => (
            <li key={id} className="relative">
              <div className="flex items-center">
                <a
                  href={`#${id}`}
                  className={cn(
                    "block text-lg font-medium transition-colors duration-200 hover:text-sky-600",
                    activeSection === id
                      ? "text-sky-600 font-semibold"
                      : "text-muted-text",
                  )}
                >
                  {title}
                </a>
                <div
                  className={cn(
                    "flex-1 ml-2 h-[2px] rounded-full bg-gray-300/60",
                    activeSection === id ? "bg-sky-300/70" : "bg-gray-300/60",
                  )}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
