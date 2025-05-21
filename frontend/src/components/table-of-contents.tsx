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
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting,
        );

        if (intersectingEntries.length > 0) {
          intersectingEntries.sort((a, b) => {
            const aRect = a.target.getBoundingClientRect();
            const bRect = b.target.getBoundingClientRect();
            return aRect.top - bRect.top;
          });

          setActiveSection(intersectingEntries[0].target.id);
        } else if (entries.length === 1 && !entries[0].isIntersecting) {
          const leavingSection = entries[0].target;
          const leavingSectionRect = leavingSection.getBoundingClientRect();

          if (leavingSectionRect.top < 0) {
            const leavingSectionIndex = sections.findIndex(
              (section) => section.id === leavingSection.id,
            );

            if (leavingSectionIndex < sections.length - 1) {
              setActiveSection(sections[leavingSectionIndex + 1].id);
            }
          }
        }
      },
      {
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
    <div className="fixed top-8 right-8 hidden md:block">
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
