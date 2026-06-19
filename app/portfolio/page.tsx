import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPortfolioContent } from "@/lib/cms-store";
import { defaultPortfolioContent } from "@/lib/portfolio-defaults";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/portfolio");
  return toMetadata(seo, entry);
}

export default async function PortfolioPage() {
  let content = defaultPortfolioContent;
  try {
    content = (await getPortfolioContent()) ?? defaultPortfolioContent;
  } catch {
    content = defaultPortfolioContent;
  }
  const { entry } = await getSeoEntry("/portfolio");

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[520px] overflow-hidden bg-black text-white md:min-h-[620px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.76), rgba(0,0,0,.9)), url(${content.hero.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 flex flex-col items-center px-7 pt-36 text-center md:pt-48">
          <h1 className="image-hero-title text-[38px] font-black uppercase tracking-[-0.05em] sm:text-[48px] md:text-[55px]">
            {content.hero.title}
          </h1>
          <p className="image-hero-kicker mt-4 text-[15px] font-black">
            {content.hero.sub}
          </p>
        </div>
      </section>

      <section className="bg-white px-7 py-16 sm:px-12 md:py-20">
        <PortfolioGrid projects={content.projects} tabs={content.tabs} />
      </section>

      <SiteFooter />
    </main>
  );
}
