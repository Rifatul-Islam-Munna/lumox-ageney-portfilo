import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getServicesContent } from "@/lib/cms-store";
import { defaultServicesContent } from "@/lib/services-defaults";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/book");
  return toMetadata(seo, entry);
}

export default async function BookPage() {
  let content = defaultServicesContent;
  try {
    content = (await getServicesContent()) ?? defaultServicesContent;
  } catch {
    content = defaultServicesContent;
  }
  const { entry } = await getSeoEntry("/book");

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[520px] overflow-hidden bg-black text-white md:min-h-[620px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.78), rgba(0,0,0,.92)), url(${content.hero.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 mx-auto max-w-[1100px] px-7 pt-36 sm:px-12 md:pt-48">
          <p className="image-hero-kicker text-[13px] font-black uppercase tracking-[0.22em]">Contact</p>
          <h1 className="image-hero-title mt-4 max-w-[760px] text-[42px] font-black uppercase leading-[1] tracking-[-0.05em] md:text-[64px]">
            {content.booking.title}
          </h1>
          <p className="image-hero-body mt-6 max-w-[560px] text-[15px] font-semibold leading-[1.8]">
            {content.booking.body}
          </p>
        </div>
      </section>

      <section className="bg-white px-7 py-16 sm:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[.8fr_1.2fr]">
          <aside>
            <h2 className="text-[24px] font-black uppercase tracking-[-0.04em]">Book for shooting</h2>
            <div className="mt-8 h-[3px] w-20 bg-[#ffd018]" />
            <a className="mt-9 flex items-center gap-4 text-[18px] font-medium" href={`tel:${content.booking.phone}`}>
              <Phone className="h-5 w-5 fill-[#ffd018] text-[#ffd018]" /> {content.booking.phone}
            </a>
            <a className="mt-5 flex items-center gap-4 text-[18px] font-medium" href={`mailto:${content.booking.email}`}>
              <Mail className="h-5 w-5 text-[#ffd018]" /> {content.booking.email}
            </a>
          </aside>
          <form className="grid gap-4 bg-[#f6f6f6] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="h-12 bg-white px-4 text-[12px] font-black uppercase outline-none" placeholder="Name*" />
              <input className="h-12 bg-white px-4 text-[12px] font-black uppercase outline-none" placeholder="Phone*" />
            </div>
            <input className="h-12 bg-white px-4 text-[12px] font-black uppercase outline-none" placeholder="Email*" />
            <input className="h-12 bg-white px-4 text-[12px] font-black uppercase outline-none" placeholder="Shoot type" />
            <textarea className="min-h-[160px] bg-white p-4 text-[12px] font-black uppercase outline-none" placeholder="Message*" />
            <button className="h-12 w-36 bg-black text-[11px] font-black uppercase text-white" type="button">
              Submit now
            </button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
