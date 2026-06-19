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
    image: "/uploads/site-images/event-lobby.jpg",
  },
  {
    eyebrow: "Production. fashion. editorial",
    title: "Studio",
    body: "We shape campaigns, portraits, product stories, and full-service visual systems for brands that need sharp direction from shoot to delivery.",
    cta: "Meet photographers",
    href: "#photographers",
    image: "/uploads/site-images/conference-room.jpg",
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
    image: "/uploads/site-images/conference-room.jpg",
  },
  {
    id: "production",
    tone: "dark",
    title: "Production services",
    ghost: "Production",
    sub: "Advertise. filming. you name it",
    icon: Film,
    image: "/uploads/site-images/event-lobby.jpg",
  },
  {
    id: "post-production",
    tone: "yellow",
    title: "Post production",
    ghost: "Production",
    sub: "Products. watches. bags",
    icon: ShoppingBag,
    image: "/uploads/site-images/food-detail.jpg",
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
    image: "/uploads/site-images/team-portrait.jpg",
  },
  {
    name: "Peter Sandler",
    image: "/uploads/site-images/conference-panel.jpg",
  },
  {
    name: "Ricardo Gomez",
    image: "/uploads/site-images/event-lobby.jpg",
  },
  {
    name: "James Smith",
    image: "/uploads/site-images/conference-room.jpg",
  },
];

const works = [
  { image: "/uploads/site-images/team-portrait.jpg", imageAlt: "Fashion portfolio photo", title: "Fashion set", href: "/portfolio" },
  { image: "/uploads/site-images/conference-room.jpg", imageAlt: "Interior portfolio photo", title: "Interior shoot", href: "/portfolio" },
  { image: "/uploads/site-images/conference-panel.jpg", imageAlt: "Model campaign photo", title: "Campaign", href: "/portfolio" },
  { image: "/uploads/site-images/property-aerial.jpg", imageAlt: "Architecture portfolio photo", title: "Architecture", href: "/portfolio" },
  { image: "/uploads/site-images/event-lobby.jpg", imageAlt: "City editorial photo", title: "Editorial", href: "/portfolio" },
  { image: "/uploads/site-images/food-detail.jpg", imageAlt: "Studio production photo", title: "Production", href: "/portfolio" },
];

const facilities = [
  {
    title: "Professional in-house assistants",
    image: "/uploads/site-images/conference-room.jpg",
  },
  {
    title: "Top standard studio",
    image: "/uploads/site-images/conference-panel.jpg",
  },
  {
    title: "High technology equipments",
    image: "/uploads/site-images/event-lobby.jpg",
  },
];

const posts = [
  {
    title: "Sigma 16mm f/1.4 for micro four-thirds captures the artistic view of the world",
    comments: "2 comments",
    image: "/uploads/site-images/conference-panel.jpg",
  },
  {
    title: "4 reasons why you should consider getting an office out from your home",
    comments: "One comment",
    image: "/uploads/site-images/conference-room.jpg",
  },
  {
    title: "Hasselblad 1.21 firmware update for X1D and H6D cameras",
    comments: "3 comments",
    image: "/uploads/site-images/team-portrait.jpg",
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
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const heroList = content.heroSlides.length ? content.heroSlides : defaultHomeContent.heroSlides;
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
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.98) 0%, rgba(0,0,0,.9) 34%, rgba(0,0,0,.68) 68%, rgba(0,0,0,.5) 100%), linear-gradient(180deg, rgba(0,0,0,.34), rgba(0,0,0,.96)), url(${slide.image})`,
            }}
          />
        ))}

        <SiteHeader />

        <div className="relative z-10 mx-auto flex max-w-[1290px] flex-col px-5 pt-24 sm:px-12 sm:pt-32 md:pt-48 lg:px-0">
          <p className="image-hero-kicker mb-3 max-w-[92vw] text-[14px] font-black uppercase tracking-[0.18em] sm:text-[22px] md:text-[30px]">
            {hero.eyebrow}
          </p>
          <h1 className="image-hero-title relative w-fit max-w-[92vw] text-[52px] font-black uppercase leading-[0.82] tracking-[-0.055em] min-[380px]:text-[64px] sm:text-[112px] md:text-[136px] lg:text-[155px]">
            {hero.title}
            <span className="absolute bottom-[.08em] left-0 -z-10 h-3 w-[112%] bg-[#ffd018]/90 md:h-4" />
          </h1>
          <div
            className="image-hero-body mt-8 max-w-[760px] text-[14px] font-semibold normal-case leading-[1.62] [&_p]:mb-3 sm:mt-12 sm:text-[16px] md:text-[18px]"
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

      {content.itServices?.items?.length ? (
        <section className="it-service-section relative overflow-hidden bg-[#050505] px-5 py-16 text-white sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute left-[14%] top-8 h-12 w-12 rounded-full border border-[#ffd018] sm:h-14 sm:w-14" />
          <div className="pointer-events-none absolute left-[18%] top-16 h-2 w-2 rounded-full bg-[#ffd018]" />
          <div className="mx-auto max-w-[1250px]">
            <h2 className="text-center text-[32px] font-extrabold leading-none text-[#ffd018] sm:text-[42px] md:text-[52px]">
              {content.itServices.title}
            </h2>
            <div className="mt-16 grid gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {content.itServices.items.map((service, index) => (
                <article
                  className="it-service-card group relative isolate min-h-[310px] overflow-visible rounded-[28px] rounded-tr-none bg-[#111] px-8 pb-16 pt-12 text-center ring-1 ring-[#ffd018]/20 transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,208,24,0.18)] sm:px-12"
                  key={`${service.title}-${index}`}
                >
                  <span className="absolute left-0 top-0 z-20 h-1 w-full bg-white/15" />
                  <span className="absolute left-[16%] top-0 z-20 h-1 w-[42%] bg-[#ffd018] transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                  <span className="it-circuit absolute inset-0 z-0 rounded-[28px] rounded-tr-none opacity-20 transition duration-300 group-hover:opacity-35" />
                  <div className="relative z-10">
                    <h3 className="text-[23px] font-extrabold leading-tight text-white sm:text-[27px]">
                      {service.title}
                    </h3>
                    <div className="mx-auto mt-9 h-px max-w-[330px] bg-[#ffd018]/45" />
                    <p className="mx-auto mt-8 max-w-[340px] text-[16px] font-medium leading-[1.65] text-white/78">
                      {service.body}
                    </p>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 z-20 grid h-24 w-24 -translate-x-1/2 place-items-start overflow-hidden rounded-t-full bg-[#050505] pt-7 ring-1 ring-[#ffd018]/30">
                    <img
                      alt={service.imageAlt ?? service.title}
                      className="h-10 w-16 object-cover transition duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                      src={service.image}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
                "readable-image-panel relative min-h-[640px] overflow-hidden px-5 py-16 sm:min-h-[680px] sm:px-12 sm:py-24 md:py-32",
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
                <div className="absolute left-[18%] top-0 hidden h-44 items-start justify-center bg-[#ffd018] px-4 pt-7 text-black md:flex">
                  <span className="[writing-mode:vertical-rl] text-[13px] font-extrabold uppercase tracking-[0.28em]">
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
                <div className="max-w-[760px] bg-black/58 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] ring-1 ring-white/10 backdrop-blur-[2px] sm:p-9">
                <h2 className="relative text-[48px] font-extrabold uppercase leading-[.9] tracking-normal text-white min-[380px]:text-[56px] sm:text-[92px]">
                  <span
                    className={[
                      "absolute -top-[.18em] left-0 text-[#ffd018]/20",
                    ].join(" ")}
                  >
                    {service.ghost}
                  </span>
                  <span
                    className={[
                      "relative block pt-10 text-[32px] font-extrabold tracking-normal text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)] min-[380px]:text-[38px] sm:pt-12 sm:text-[58px]",
                    ].join(" ")}
                  >
                    {service.title}
                  </span>
                </h2>
                <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#ffd018] sm:text-[16px]">
                  {service.sub}
                </p>

                <div className="mt-10 grid max-w-[720px] gap-5 sm:mt-12 sm:grid-cols-[74px_1fr] sm:gap-7">
                  <Icon className="mt-1 h-12 w-12 stroke-[2.2] text-[#ffd018] sm:h-16 sm:w-16" />
                  <div
                    className={[
                      "text-[14px] font-semibold normal-case leading-[1.7] [&_p]:mb-3 sm:text-[16px]",
                      "text-white/90",
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
                    "mt-8 inline-flex items-center gap-5 text-[15px] font-extrabold uppercase tracking-[0.12em] text-[#ffd018]",
                  ].join(" ")}
                  href={copy.serviceCtaHref}
                >
                  {copy.serviceCtaText} <span className="text-3xl leading-none">&larr;</span>
                </a>
                </div>
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
