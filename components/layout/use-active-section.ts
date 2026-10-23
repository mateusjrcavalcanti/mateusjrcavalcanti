"use client";

import { useEffect, useState } from "react";
import type { SectionConfig } from "@/data";

const HEADER_OFFSET = 80;

export function useActiveSection(sections: SectionConfig[]) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      const position = window.scrollY + HEADER_OFFSET;

      for (let index = sections.length - 1; index >= 0; index--) {
        const element = document.getElementById(sections[index].id);
        if (element && element.offsetTop <= position) {
          setActiveSection(sections[index].id);
          return;
        }
      }

      setActiveSection(sections[0]?.id ?? "");
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sections]);

  return activeSection;
}
