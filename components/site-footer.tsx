"use client";

import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/social-icon";
import { defaultHomeContent } from "@/lib/home-defaults";
import type { HomeContent } from "@/lib/cms-types";

export function SiteFooter() {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const copy = { ...defaultHomeContent.copy!, ...content.copy };
  const site = { ...defaultHomeContent.site!, ...content.site };

  useEffect(() => {
    fetch("/api/cms/home")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => null);
  }, []);

  return (
    <footer className="motion-section bg-[#202020] px-5 py-8 text-[#8d8d8d] sm:px-12">
      <div className="mx-auto flex max-w-[1190px] flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-center text-[13px] sm:text-[16px]">{copy.footerCopyright}</p>
        <div className="flex flex-wrap justify-center gap-3 text-white">
          {site.socialLinks.map((item) => (
            <a href={item.href} aria-label={item.label} key={`${item.label}-${item.icon}`}>
              <SocialIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
