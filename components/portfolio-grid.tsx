"use client";

import { useMemo, useState } from "react";
import type { PortfolioContent } from "@/lib/cms-types";

export function PortfolioGrid({
  tabs,
  projects,
}: {
  tabs: PortfolioContent["tabs"];
  projects: PortfolioContent["projects"];
}) {
  const safeTabs = tabs.length ? tabs : ["All"];
  const [active, setActive] = useState(safeTabs[0]);
  const visibleProjects = useMemo(
    () => projects.filter((project) => active === "All" || project.filter === active),
    [active, projects],
  );

  return (
    <div className="mx-auto max-w-[980px]">
      <div className="flex flex-wrap justify-center gap-7 text-[13px] font-black uppercase">
        {safeTabs.map((tab) => (
          <button
            className={[
              "transition",
              active === tab ? "text-black" : "text-[#a8a8a8] hover:text-black",
            ].join(" ")}
            key={tab}
            onClick={() => setActive(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {visibleProjects.map((project) => (
          <article key={`${project.title}-${project.image}`}>
            <a className="block" href={project.href ?? "#"}>
              <img
                alt={project.imageAlt ?? project.title}
                className="h-[280px] w-full object-cover sm:h-[330px]"
                src={project.image}
              />
              <h2 className="mt-6 text-[22px] font-black tracking-[-0.04em]">
                {project.title}
              </h2>
            </a>
            <p className="mt-2 text-[13px] font-medium italic text-[#aaa]">
              {project.category}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
