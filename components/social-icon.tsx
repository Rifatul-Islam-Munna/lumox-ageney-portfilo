import type { CmsSocialLink } from "@/lib/cms-types";

const glyphs: Record<CmsSocialLink["icon"], string> = {
  facebook: "f",
  twitter: "t",
  linkedin: "in",
  instagram: "ig",
  pinterest: "p",
  youtube: "yt",
};

export function SocialIcon({ icon }: { icon: CmsSocialLink["icon"] }) {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-full border border-current text-[11px] font-black uppercase leading-none transition duration-300 hover:-translate-y-1 hover:border-[#ffd018] hover:bg-[#ffd018] hover:text-black">
      {glyphs[icon]}
    </span>
  );
}
