"use client";

import { useEffect, useState } from "react";
import {
  Aperture,
  ArrowLeft,
  Camera,
  Film,
  Mail,
  Phone,
  Share2,
  ShoppingBag,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PhotographerSlider } from "@/components/photographer-slider";
import type { BlogContent, HomeContent } from "@/lib/cms-types";
import { defaultBlogContent } from "@/lib/blog-defaults";
import { defaultHomeContent } from "@/lib/home-defaults";

const heroSlides = [
  {
    eyebrow: "Best studio wordpress theme",
    title: "Luumox",
    body: "Founded in 2008 by professional photographer, John Smith. We product visual content full-service creative to post production. Ultimately our mission is to help people to see beauty in themselves.",
    cta: "View our works",
    href: "#services",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90",
  },
  {
    eyebrow: "Production. fashion. editorial",
    title: "Studio",
    body: "We shape campaigns, portraits, product stories, and full-service visual systems for brands that need sharp direction from shoot to delivery.",
    cta: "Meet photographers",
    href: "#photographers",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90",
  },
];

const services = [
  {
    id: "photoshoot",
    tone: "yellow",
    title: "Photoshoot services",
    ghost: "Photoshoot",
    sub: "Modeling & personal shootings",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "production",
    tone: "dark",
    title: "Production services",
    ghost: "Production",
    sub: "Advertise. filming. you name it",
    icon: Film,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "post-production",
    tone: "yellow",
    title: "Post production",
    ghost: "Production",
    sub: "Products. watches. bags",
    icon: ShoppingBag,
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=2200&q=90",
  },
] satisfies Array<HomeContent["services"][number] & { icon: typeof Camera }>;

const socialLinks = [
  { label: "Aperture", icon: Aperture },
  { label: "Camera", icon: Camera },
  { label: "Film", icon: Film },
  { label: "Share", icon: Share2 },
];

const photographers = [
  {
    name: "John Smithy",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Peter Sandler",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Ricardo Gomez",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "James Smith",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=90",
  },
];

const works = [
  { image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=90", imageAlt: "Fashion portfolio photo", title: "Fashion set", href: "/portfolio" },
  { image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=90", imageAlt: "Interior portfolio photo", title: "Interior shoot", href: "/portfolio" },
  { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90", imageAlt: "Model campaign photo", title: "Campaign", href: "/portfolio" },
  { image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=90", imageAlt: "Architecture portfolio photo", title: "Architecture", href: "/portfolio" },
  { image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=90", imageAlt: "City editorial photo", title: "Editorial", href: "/portfolio" },
  { image: "https://images.unsplash.com/photo-1532460734809-e7f8475ca917?auto=format&fit=crop&w=900&q=90", imageAlt: "Studio production photo", title: "Production", href: "/portfolio" },
];

const facilities = [
  {
    title: "Professional in-house assistants",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Top standard studio",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "High technology equipments",
    image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=90",
  },
];

const posts = [
  {
    title: "Sigma 16mm f/1.4 for micro four-thirds captures the artistic view of the world",
    comments: "2 comments",
    image:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "4 reasons why you should consider getting an office out from your home",
    comments: "One comment",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Hasselblad 1.21 firmware update for X1D and H6D cameras",
    comments: "3 comments",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=90",
  },
];

function blogHref(post: BlogContent["posts"][number]) {
  if (post.slug) return `/blog/${post.slug}`;
  if (post.href && post.href !== "#") return post.href;
  return `/blog/${post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogContent["posts"]>(defaultBlogContent.posts);
  const [content, setContent] = useState<HomeContent>({
    heroSlides,
    services,
    photographers,
    works,
    facilities,
    posts,
  });
  const heroList = content.heroSlides.length ? content.heroSlides : heroSlides;
  const hero = heroList[Math.min(activeSlide, heroList.length - 1)];
  const copy = { ...defaultHomeContent.copy!, ...content.copy };

  useEffect(() => {
    fetch("/api/cms/home")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => null);
    fetch("/api/cms/blog")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content?.posts) setBlogPosts(data.content.posts);
      })
      .catch(() => null);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative min-h-[700px] overflow-hidden bg-black text-white sm:min-h-[760px] md:min-h-[900px]">
        {heroList.map((slide, index) => (
          <div
            className={[
              "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
              activeSlide === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            key={slide.title}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.98) 0%, rgba(0,0,0,.82) 31%, rgba(0,0,0,.42) 68%, rgba(0,0,0,.18) 100%), linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.92)), url(${slide.image})`,
            }}
          />
        ))}

        <SiteHeader />

        <div className="relative z-10 mx-auto flex max-w-[1290px] flex-col px-5 pt-24 sm:px-12 sm:pt-32 md:pt-48 lg:px-0">
          <p className="mb-3 max-w-[92vw] text-[14px] font-medium uppercase tracking-[0.18em] text-[#ffd018] sm:text-[22px] md:text-[30px]">
            {hero.eyebrow}
          </p>
          <h1 className="relative w-fit max-w-[92vw] text-[52px] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white min-[380px]:text-[64px] sm:text-[112px] md:text-[136px] lg:text-[155px]">
            {hero.title}
            <span className="absolute bottom-[.08em] left-0 -z-10 h-3 w-[112%] bg-[#ffd018] md:h-4" />
          </h1>
          <div
            className="mt-8 max-w-[690px] text-[13px] font-black uppercase leading-[1.7] text-white [&_p]:mb-3 sm:mt-12 sm:text-[16px] md:text-[18px]"
            dangerouslySetInnerHTML={{ __html: hero.body ?? "" }}
          />
          <a
            className="mt-7 w-fit border-b border-[#ffd018] pb-2 text-[13px] font-black uppercase tracking-[0.18em] text-[#ffd018] sm:text-[16px] sm:tracking-[0.22em]"
            href={hero.href}
          >
            {hero.cta ?? "Learn more"}
          </a>
        </div>

        <a
          className="absolute bottom-0 right-0 z-10 flex h-[92px] w-full items-center bg-[#ffd018] px-6 text-[13px] font-black uppercase tracking-[0.12em] text-black sm:h-[140px] sm:w-[520px] sm:px-10 sm:text-[15px] md:h-[150px] lg:w-[620px]"
          href={hero.href}
        >
          {hero.cta}
        </a>

        <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-9">
          {heroList.map((slide, index) => (
            <button
              aria-label={`Show ${slide.title} slide`}
              className={[
                "h-4 w-4 rounded-full transition",
                activeSlide === index
                  ? "border-[3px] border-white bg-transparent"
                  : "bg-white/35",
              ].join(" ")}
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              type="button"
            />
          ))}
        </div>
      </section>

      <section id="about" className="bg-white px-5 py-16 sm:px-12 sm:py-24 md:py-30">
        <div className="mx-auto grid max-w-[1190px] gap-10 md:grid-cols-[1fr_1.1fr_1fr]">
          <div>
            <h2 className="whitespace-pre-line text-[19px] font-black uppercase leading-[1.45] tracking-[-0.04em] sm:text-[22px] md:text-[24px]">
              {copy.aboutTitle}
            </h2>
            <div className="mt-8 flex gap-5">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center text-black transition hover:text-[#ffd018]"
                  href="#"
                  key={label}
                >
                  <Icon className="h-5 w-5 stroke-[3]" />
                </a>
              ))}
            </div>
            <div className="mt-10 h-1 w-full bg-[#ffd018]" />
          </div>

          <div
            className="text-[15px] font-medium leading-[1.72] text-[#62616b] [&_p]:mb-3 sm:text-[17px]"
            dangerouslySetInnerHTML={{ __html: copy.aboutBodyLeft }}
          />

          <div>
            <div
              className="text-[15px] font-medium leading-[1.72] text-[#62616b] [&_p]:mb-3 sm:text-[17px]"
              dangerouslySetInnerHTML={{ __html: copy.aboutBodyRight }}
            />
            <a
              className="mt-8 inline-block text-[14px] font-black uppercase tracking-[0.22em]"
              href={copy.aboutCtaHref}
            >
              {copy.aboutCtaText}
            </a>
          </div>
        </div>
      </section>

      <div id="services">
        {content.services.map((service, index) => {
          const Icon =
            service.id === "production"
              ? Film
              : service.id === "post-production"
                ? ShoppingBag
                : Camera;
          const dark = service.tone === "dark";

          return (
            <section
              className={[
                "relative min-h-[640px] overflow-hidden px-5 py-16 sm:min-h-[680px] sm:px-12 sm:py-24 md:py-32",
                dark ? "bg-[#111] text-white" : "bg-[#f9ca00] text-black",
              ].join(" ")}
              id={service.id}
              key={service.id}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundPosition: dark ? "left center" : "right center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {index === 0 && (
                <div className="absolute left-[18%] top-0 hidden h-56 items-start justify-center bg-white px-5 pt-8 text-black md:flex">
                  <span className="[writing-mode:vertical-rl] text-[15px] font-black uppercase tracking-[0.45em]">
                    &larr; {copy.servicesSideLabel}
                  </span>
                </div>
              )}

              <div
                className={[
                  "relative mx-auto max-w-[1190px] pt-10 sm:pt-20 md:pt-28",
                  dark ? "md:ml-auto md:mr-[6%] md:w-[58%]" : "",
                ].join(" ")}
              >
                <h2 className="relative text-[40px] font-black uppercase leading-[.9] tracking-[-0.055em] min-[380px]:text-[48px] sm:text-[84px] md:text-[118px]">
                  <span
                    className={[
                      "absolute -top-[.13em] left-0",
                      dark ? "text-white/10" : "text-white/45",
                    ].join(" ")}
                  >
                    {service.ghost}
                  </span>
                  <span
                    className={[
                      "relative block pt-8 text-[30px] tracking-[-0.06em] min-[380px]:text-[36px] sm:pt-10 sm:text-[52px]",
                      dark ? "font-light tracking-[0.08em]" : "",
                    ].join(" ")}
                  >
                    {service.title}
                  </span>
                </h2>
                <p className="mt-4 text-[12px] font-black uppercase tracking-[0.22em] sm:text-[16px] sm:tracking-[0.42em]">
                  {service.sub}
                </p>

                <div className="mt-10 grid max-w-[720px] gap-5 sm:mt-12 sm:grid-cols-[74px_1fr] sm:gap-7">
                  <Icon className="mt-1 h-12 w-12 stroke-[2.2] sm:h-16 sm:w-16" />
                  <div
                    className={[
                      "text-[13px] font-black uppercase leading-[1.75] [&_p]:mb-3 sm:text-[16px] sm:leading-[1.8]",
                      dark ? "text-white/65" : "",
                    ].join(" ")}
                    dangerouslySetInnerHTML={{
                      __html:
                        service.body ??
                        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated They Live In Bookmarksgrove Right At The Coast Of The Semantics, A Large Language Ocean. A Small River Named Duden Flows By Their Place And Supplies It With The Necessary Regelialia. It Is A Paradisematic Country, In Which Roasted Parts Of Sentences.",
                    }}
                  />
                </div>

                <a
                  className={[
                    "mt-8 inline-flex items-center gap-5 text-[15px] font-black uppercase tracking-[0.28em]",
                    dark ? "text-[#ffd018]" : "text-white",
                  ].join(" ")}
                  href={copy.serviceCtaHref}
                >
                  {copy.serviceCtaText} <span className="text-3xl leading-none">&larr;</span>
                </a>
              </div>
            </section>
          );
        })}
      </div>

      <section className="grid bg-white py-14 text-black sm:py-20 lg:grid-cols-[25%_75%]" id="works">
        <aside className="px-5 pb-10 sm:px-12 sm:pb-14 lg:px-[50px] lg:py-0">
          <h2 className="text-[22px] font-black uppercase tracking-[-0.03em] sm:text-[24px]">
            {copy.worksTitle}
          </h2>
          <div
            className="mt-6 max-w-[360px] text-[13px] font-black uppercase leading-[1.8] text-[#2b2b2d] [&_p]:mb-3 sm:mt-8 sm:text-[15px]"
            dangerouslySetInnerHTML={{ __html: copy.worksBody }}
          />
          <div className="mt-10 h-[3px] max-w-[355px] bg-[#ffd018]" />
          <a className="mt-2 inline-flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.08em]" href={copy.worksCtaHref}>
            {copy.worksCtaText} <ArrowLeft className="h-5 w-5" />
          </a>
        </aside>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {content.works.map((work, index) => {
              const item = typeof work === "string" ? { image: work, href: "", title: "", imageAlt: "" } : work;
              const image = <img alt={item.imageAlt ?? item.title ?? ""} className="h-full w-full object-cover" src={item.image} />;

              return (
              <div
                className={[
                  "h-[250px] overflow-hidden sm:h-[315px]",
                  index < 3 ? "hidden md:block" : "",
                ].join(" ")}
                key={`${item.image}-${index}`}
              >
                {item.href ? <a aria-label={item.title || item.imageAlt || "View work"} href={item.href}>{image}</a> : image}
              </div>
              );
            })}
          </div>
          <button className="flex h-16 w-full items-center justify-center bg-[#ffd018] text-[13px] font-black uppercase tracking-[0.18em]">
            {copy.worksLoadMoreText}
          </button>
        </div>
      </section>

      <PhotographerSlider
        eyebrow={copy.photographersSubtitle}
        people={content.photographers}
        title={copy.photographersTitle}
      />

      <section className="bg-white px-5 py-16 text-black sm:px-12 sm:py-24 md:py-28">
        <div className="text-center">
          <h2 className="text-[23px] font-black uppercase sm:text-[25px]">{copy.facilitiesTitle}</h2>
          <p className="mt-4 inline-block bg-[#ffd018] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] sm:text-[14px] sm:tracking-[0.22em]">
            {copy.facilitiesSubtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1190px] gap-10 md:grid-cols-3">
          {content.facilities.map((item) => (
            <article key={item.title}>
              <img alt={item.title} className="h-[220px] w-full object-cover sm:h-[240px]" src={item.image} />
              <h3 className="mt-6 text-[16px] font-black uppercase tracking-[-0.04em] sm:mt-8 sm:text-[18px]">
                {item.title}
              </h3>
              <div className="mt-2 h-1 w-16 bg-[#ffd018]" />
              <div
                className="mt-2 text-[14px] font-medium leading-[1.7] [&_p]:mb-3 sm:text-[16px]"
                dangerouslySetInnerHTML={{ __html: item.body ?? "" }}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-black sm:px-12 sm:py-28 md:py-36" id="blog">
        <div className="mx-auto max-w-[1190px]">
          <div className="relative text-center">
            <h2 className="text-[23px] font-black uppercase sm:text-[25px]">{copy.blogTitle}</h2>
            <p className="mt-4 inline-block bg-[#ffd018] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] sm:text-[14px]">
              {copy.blogSubtitle}
            </p>
            <a className="mt-5 flex justify-center gap-3 text-[12px] font-black uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.22em] md:absolute md:right-0 md:top-10 md:mt-0" href={copy.blogCtaHref}>
              {copy.blogCtaText} <ArrowLeft className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.title}>
                <a href={blogHref(post)}>
                  <img alt={post.imageAlt ?? post.title} className="h-[220px] w-full object-cover grayscale sm:h-[240px]" src={post.image} />
                  <h3 className="mt-6 text-[17px] font-black uppercase leading-[1.45] tracking-[-0.04em] sm:mt-8 sm:text-[19px]">
                    {post.title}
                  </h3>
                </a>
                <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#999] sm:text-[13px]">
                  <span>{post.date ?? "June 6, 2016"}</span>
                  <span>{post.comments}</span>
                </div>
                <div
                  className="mt-4 text-[13px] font-medium leading-[1.7] text-[#777] [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <div className="mt-5 h-[3px] w-11 bg-[#ffd018]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-white text-black lg:grid-cols-[76%_24%]">
        <div className="h-[320px] overflow-hidden bg-[#dcefe8] sm:h-[420px]">
          <iframe
            aria-label="Map"
            className="h-full w-full border-0 grayscale-[15%]"
            loading="lazy"
            src={copy.mapSrc}
          />
        </div>
        <aside className="px-5 py-14 sm:px-12 sm:py-20 lg:px-[70px]">
          <h2 className="text-[22px] font-black uppercase tracking-[0.04em] sm:text-[24px]">
            {copy.contactTitle}
          </h2>
          <div
            className="mt-6 text-[13px] font-black uppercase leading-[1.8] text-[#333] [&_p]:mb-3 sm:mt-8 sm:text-[15px]"
            dangerouslySetInnerHTML={{ __html: copy.contactAddress }}
          />
          <a className="mt-7 flex items-center gap-5 text-[15px] font-medium text-[#777] sm:text-[19px]" href={`tel:${copy.contactPhone.replace(/[^\d+]/g, "")}`}>
            {copy.contactPhone} <Phone className="h-5 w-5 fill-[#ffd018] text-[#ffd018]" />
          </a>
          <a className="mt-6 flex items-center gap-5 text-[15px] font-medium text-[#555] sm:text-[19px]" href={`mailto:${copy.contactEmail}`}>
            {copy.contactEmail} <Mail className="h-5 w-5 text-[#ffd018]" />
          </a>
          <div className="mt-10 h-[3px] bg-[#ffd018]" />
          <a className="mt-2 inline-flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.08em]" href={copy.contactCtaHref}>
            {copy.contactCtaText} <ArrowLeft className="h-5 w-5" />
          </a>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
