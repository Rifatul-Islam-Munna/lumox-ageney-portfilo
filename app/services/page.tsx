import type { Metadata } from "next";
import { Aperture, Camera, Film, Mail, Phone, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhotographerSlider } from "@/components/photographer-slider";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { defaultServicesContent } from "@/lib/services-defaults";
import { getServicesContent } from "@/lib/cms-store";
import type { ServicesContent } from "@/lib/cms-types";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/services");
  return toMetadata(seo, entry);
}

const serviceIcons = [Film, Camera, Aperture, Sparkles];

function ServiceCard({
  service,
  flipped,
  iconIndex,
}: {
  service: ServicesContent["services"][number];
  flipped: boolean;
  iconIndex: number;
}) {
  const Icon = serviceIcons[iconIndex % serviceIcons.length];

  return (
    <article className="grid bg-[#151515] text-white md:grid-cols-2">
      <img
        alt={service.title}
        className={[
          "h-[360px] w-full object-cover grayscale md:h-[480px]",
          flipped ? "md:order-2" : "",
        ].join(" ")}
        src={service.image}
      />
      <div
        className={[
          "flex items-center bg-cover bg-center px-7 py-14 sm:px-12 lg:px-20",
          flipped ? "md:order-1" : "",
        ].join(" ")}
        style={{
          backgroundImage: `linear-gradient(rgba(18,18,18,.88), rgba(18,18,18,.88)), url(${service.backdrop ?? service.image})`,
        }}
      >
        <div>
          <Icon className="h-11 w-11 text-[#ffd018]" />
          <h2 className="mt-8 text-[31px] font-black uppercase tracking-[-0.04em]">
            {service.title}
          </h2>
          <p className="mt-2 text-[13px] font-black uppercase tracking-[0.18em] text-[#ffd018]">
            {service.sub}
          </p>
          <div
            className="mt-8 max-w-[620px] text-[14px] font-black uppercase leading-[1.8] text-white/80 [&_li]:mb-1 [&_li]:list-disc [&_p]:mb-3 [&_ul]:mt-3 [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: service.body ?? "" }}
          />
        </div>
      </div>
    </article>
  );
}

export default async function ServicesPage() {
  let content = defaultServicesContent;
  try {
    content = (await getServicesContent()) ?? defaultServicesContent;
  } catch {
    content = defaultServicesContent;
  }
  const { entry } = await getSeoEntry("/services");

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[520px] overflow-hidden bg-black text-white md:min-h-[620px]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.78), rgba(0,0,0,.9)), url(${content.hero.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 flex flex-col items-center pt-36 text-center md:pt-48">
          <h1 className="image-hero-title text-[42px] font-black uppercase tracking-[-0.05em] md:text-[55px]">
            {content.hero.title}
          </h1>
          <p className="image-hero-kicker mt-2 text-[15px] font-black">{content.hero.sub}</p>
        </div>
      </section>

      <section className="grid bg-[#151515] text-white md:grid-cols-2">
        <img
          alt={content.feature.title}
          className="h-[360px] w-full object-cover grayscale md:h-[480px]"
          src={content.feature.image}
        />
        <div className="flex items-center px-7 py-14 sm:px-12 lg:px-20">
          <div>
            <Film className="h-11 w-11 text-[#ffd018]" />
            <h2 className="mt-8 text-[31px] font-black uppercase tracking-[-0.04em]">
              {content.feature.title}
            </h2>
            <p className="mt-2 text-[13px] font-black uppercase tracking-[0.18em] text-[#ffd018]">
              {content.feature.sub}
            </p>
            <div
              className="mt-8 max-w-[620px] text-[14px] font-black uppercase leading-[1.8] text-white/80 [&_li]:mb-1 [&_li]:list-disc [&_p]:mb-3 [&_ul]:mt-3 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: content.feature.body ?? "" }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-7 py-20 sm:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3">
          {content.steps.map((step) => (
            <article className="grid grid-cols-[56px_1fr] gap-5" key={step.number}>
              <p className="text-[52px] font-black leading-none">{step.number}</p>
              <div>
                <p className="text-[10px] font-black uppercase text-[#999]">{step.eyebrow}</p>
                <h3 className="text-[20px] font-black uppercase tracking-[-0.04em]">
                  {step.title}
                </h3>
                <div
                  className="mt-5 text-[13px] font-medium leading-[1.8] text-[#666] [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        {content.services.map((service, index) => (
          <ServiceCard
            flipped={index % 2 === 1}
            iconIndex={index}
            key={service.title}
            service={service}
          />
        ))}
      </section>

      <section className="bg-[#282828] py-16 md:py-24">
        <div className="aspect-video w-full">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
            src={content.videoUrl}
            title="Studio video"
          />
        </div>
      </section>

      <PhotographerSlider people={content.photographers} />

      <section className="bg-white px-7 py-24 sm:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-[72px] font-black leading-none text-[#ffd018]">"</p>
            <blockquote className="text-[24px] font-black leading-[1.55] tracking-[-0.04em]">
              {content.testimonial.quote}
            </blockquote>
            <p className="mt-9 text-[13px] font-black">{content.testimonial.name}</p>
            <p className="mt-1 text-[13px] text-[#777]">{content.testimonial.company}</p>
          </div>
          <img
            alt="Client"
            className="mx-auto h-[320px] w-full max-w-[420px] object-cover grayscale"
            src={content.testimonial.image}
          />
        </div>
      </section>

      <section className="bg-white px-7 pb-24 sm:px-12">
        <div className="mx-auto grid max-w-[950px] gap-10 bg-[#ffd018] p-8 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="text-[28px] font-black uppercase tracking-[-0.04em]">
              {content.booking.title}
            </h2>
            <p className="mt-5 max-w-[430px] text-[13px] font-medium leading-[1.8]">
              {content.booking.body}
            </p>
            <a className="mt-8 flex items-center gap-3 text-[14px] font-medium" href={`tel:${content.booking.phone}`}>
              {content.booking.phone} <Phone className="h-4 w-4 fill-black" />
            </a>
            <a className="mt-2 flex items-center gap-3 text-[14px] font-medium" href={`mailto:${content.booking.email}`}>
              {content.booking.email} <Mail className="h-4 w-4" />
            </a>
          </div>
          <form className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="h-12 bg-black/5 px-4 text-[12px] font-black uppercase outline-none" placeholder="Name*" />
              <input className="h-12 bg-black/5 px-4 text-[12px] font-black uppercase outline-none" placeholder="Phone*" />
            </div>
            <input className="h-12 bg-black/5 px-4 text-[12px] font-black uppercase outline-none" placeholder="Email*" />
            <textarea className="min-h-[130px] bg-black/5 p-4 text-[12px] font-black uppercase outline-none" placeholder="Message*" />
            <button className="h-11 w-32 bg-black text-[11px] font-black uppercase text-white" type="button">
              Submit now
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
