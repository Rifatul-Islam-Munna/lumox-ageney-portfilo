import type { Metadata } from "next";
import { Aperture, Camera, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { defaultAboutContent } from "@/lib/about-defaults";
import { getAboutContent } from "@/lib/cms-store";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/about");
  return toMetadata(seo, entry);
}

const features = [
  { title: "Professional in-house assistants", icon: Camera },
  { title: "Top standard studio", icon: Aperture },
  { title: "High technology equipments", icon: Sparkles },
];

export default async function AboutPage() {
  let content = defaultAboutContent;
  try {
    content = (await getAboutContent()) ?? defaultAboutContent;
  } catch {
    content = defaultAboutContent;
  }
  const { entry } = await getSeoEntry("/about");

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[520px] overflow-hidden bg-black text-white md:min-h-[620px]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.66), rgba(0,0,0,.82)), url(${content.hero.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 flex flex-col items-center pt-36 text-center md:pt-48">
          <h1 className="text-[42px] font-black uppercase tracking-[-0.05em] md:text-[55px]">
            {content.hero.title}
          </h1>
          <p className="mt-2 text-[15px] font-black text-[#ffd018]">{content.hero.sub}</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <img
          alt="Studio sparkler"
          className="h-[360px] w-full object-cover md:h-[520px]"
          src={content.intro.image}
        />
        <div className="flex items-center px-7 py-16 sm:px-12 lg:px-24">
          <div>
            <h2 className="max-w-[620px] text-[18px] font-black uppercase leading-[1.55]">
              {content.intro.title}
            </h2>
            <p className="mt-5 inline-block bg-[#ffd018] px-3 py-2 text-[12px] font-black uppercase tracking-[0.12em]">
              {content.intro.badge}
            </p>
            <div
              className="mt-7 max-w-[650px] text-[14px] font-medium leading-[1.8] text-[#666] [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: content.intro.body }}
            />
          </div>
        </div>

        <div className="flex items-center px-7 py-16 sm:px-12 lg:px-24">
          <div>
            <h2 className="max-w-[620px] text-[18px] font-black uppercase leading-[1.55]">
              {content.story.title}
            </h2>
            <p className="mt-5 inline-block bg-[#ffd018] px-3 py-2 text-[12px] font-black uppercase tracking-[0.12em]">
              {content.story.badge}
            </p>
            <ul className="mt-7 flex flex-col gap-4 text-[13px] font-black uppercase">
              {content.story.points.map((point) => (
                <li key={point}>* {point}</li>
              ))}
            </ul>
          </div>
        </div>
        <img
          alt="Portrait"
          className="h-[360px] w-full object-cover md:h-[520px]"
          src={content.story.image}
        />
      </section>

      <section className="grid bg-black px-7 py-16 text-center text-white sm:px-12 md:grid-cols-4">
        {content.stats.map(({ value, label }) => (
          <div className="py-6" key={label}>
            <p className="text-[30px] font-black">{value}</p>
            <p className="mt-2 text-[14px] font-medium">{label}</p>
          </div>
        ))}
      </section>

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
            className="mx-auto h-[320px] w-full max-w-[420px] object-cover"
            src={content.testimonial.image}
          />
        </div>
      </section>

      <section className="bg-white px-7 pb-24 sm:px-12">
        <div className="mx-auto grid max-w-[1100px] border-y border-black/10 py-14 text-center md:grid-cols-3">
          {content.features.map(({ title, body }, index) => {
            const Icon = features[index]?.icon ?? Camera;
            return (
              <article className="px-8 py-8" key={title}>
                <Icon className="mx-auto h-12 w-12 stroke-[1.8]" />
                <h3 className="mt-7 text-[13px] font-black uppercase">{title}</h3>
                <div
                  className="mt-5 text-[13px] font-medium leading-[1.7] text-[#777] [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white pt-8 text-black" id="photographers">
        <div className="mx-auto max-w-[1100px] pb-12 text-center">
          <h2 className="text-[18px] font-black uppercase tracking-[0.12em]">
            Meet photographers
          </h2>
          <p className="mt-3 inline-block bg-[#ffd018] px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em]">
            We are a team of super professional photographers
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {content.photographers.map((person) => (
            <article className="relative h-[430px] overflow-hidden" key={person.name}>
              <img
                alt={person.name}
                className="h-full w-full object-cover grayscale"
                src={person.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                <h3 className="text-[14px] font-black uppercase tracking-[0.14em]">
                  {person.name}
                </h3>
                <div className="mt-4 flex justify-center gap-4 text-[18px] font-black">
                  <a href="#" aria-label={`${person.name} Facebook`}>f</a>
                  <a href="#" aria-label={`${person.name} LinkedIn`}>in</a>
                  <a href="#" aria-label={`${person.name} Twitter`}>t</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
