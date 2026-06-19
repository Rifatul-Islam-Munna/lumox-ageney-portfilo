import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Download, Folder, Layers3, Mail, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDynamicServicesContent } from "@/lib/cms-store";
import { defaultDynamicServicesContent } from "@/lib/dynamic-services-defaults";

export const dynamic = "force-dynamic";

async function getContent() {
  try {
    return (await getDynamicServicesContent()) ?? defaultDynamicServicesContent;
  } catch {
    return defaultDynamicServicesContent;
  }
}

async function getService(slug: string) {
  const content = await getContent();
  const fallback = defaultDynamicServicesContent.services[0];
  const service = content.services.find((item) => item.slug === slug && item.published);
  return {
    content,
    service: service
      ? {
          ...fallback,
          ...service,
          bullets: service.bullets?.length ? service.bullets : fallback.bullets,
          downloads: service.downloads?.length ? service.downloads : fallback.downloads,
          faqs: service.faqs?.length ? service.faqs : fallback.faqs,
          sectionVisibility: { ...fallback.sectionVisibility, ...service.sectionVisibility },
          processSteps: service.processSteps?.length ? service.processSteps : fallback.processSteps,
          extraSections: service.extraSections?.length
            ? service.extraSections.map((section) => ({ ...fallback.extraSections?.[0], ...section }))
            : fallback.extraSections,
        }
      : null,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { service } = await getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Lumos Visuals`,
    description: service.excerpt,
    openGraph: {
      title: service.title,
      description: service.excerpt,
      images: [{ url: service.heroImage, alt: service.title }],
    },
  };
}

export default async function DynamicServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, service } = await getService(slug);
  if (!service) notFound();
  const visibleServices = content.services.filter((item) => item.published);
  const visible = service.sectionVisibility ?? defaultDynamicServicesContent.services[0].sectionVisibility!;

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-black">
      <section
        className="relative min-h-[520px] overflow-hidden bg-black text-white md:min-h-[640px]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.74) 52%, rgba(0,0,0,.58)), url(${service.heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 mx-auto flex max-w-[1380px] flex-col px-6 pt-28 md:pt-40">
          <div className="max-w-[840px]">
          <p className="image-hero-kicker text-[14px] font-black uppercase tracking-[0.18em]">Dynamic service</p>
          <h1 className="image-hero-title mt-4 text-[48px] font-extrabold leading-none md:text-[86px]">
            {service.title}
          </h1>
          <p className="image-hero-body mt-7 max-w-[720px] text-[18px] font-semibold leading-[1.65]">{service.excerpt}</p>
          <div className="mt-8 inline-flex w-fit items-center gap-3 bg-black/45 px-4 py-2 text-[12px] font-black uppercase text-white ring-1 ring-white/15">
            <Link href="/">Home</Link>
            <span>&lt;</span>
            <span className="text-[#ffd018]">{service.title}</span>
          </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-10 xl:grid-cols-[1fr_380px]">
          <div>
            {visible.overview ? (
              <section className="grid overflow-hidden rounded-[22px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)] ring-1 ring-black/10 lg:grid-cols-[47%_53%]">
                <img
                  alt={service.mainImageAlt ?? service.title}
                  className="h-[320px] w-full object-cover lg:h-full"
                  src={service.mainImage}
                />
                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-[13px] font-black uppercase tracking-[0.16em] text-[#b38a00]">Overview</p>
                  <h2 className="mt-4 text-[34px] font-black leading-tight text-[#050505] md:text-[48px]">
                    {`Best Solutions for ${service.title}`}
                  </h2>
                  <div
                    className="mt-6 text-[17px] font-medium leading-[1.85] text-[#5f5a52] [&_p]:mb-5"
                    dangerouslySetInnerHTML={{ __html: service.body }}
                  />
                </div>
              </section>
            ) : null}

            {visible.valueCards ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-[18px] bg-white p-8 ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-[24px] font-black">{service.chooseTitle}</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.65] text-[#737373]">{service.chooseBody}</p>
                <ul className="mt-7 space-y-4">
                  {service.bullets.map((bullet) => (
                    <li className="flex items-center gap-3 text-[15px] font-black" key={bullet}>
                      <CheckCircle2 className="h-5 w-5 text-[#b38a00]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-[18px] bg-[#050505] p-8 text-white ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#ffd018]/20 text-[#967400]">
                  <Layers3 className="h-7 w-7 text-[#ffd018]" />
                </div>
                <h3 className="mt-8 text-[24px] font-black">{service.featureTitle}</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.65] text-white/72">{service.featureBody}</p>
              </article>
            </div>
            ) : null}

            {visible.process ? (
              <section className="mt-12 rounded-[22px] bg-[#050505] p-7 text-white sm:p-10">
                <p className="text-[13px] font-black uppercase tracking-[0.16em] text-[#ffd018]">Process</p>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {(service.processSteps ?? []).map((step, index) => (
                    <article className="border-l border-[#ffd018]/40 pl-5" key={`${step.title}-${index}`}>
                      <span className="text-[13px] font-black text-[#ffd018]">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-4 text-[24px] font-black">{step.title}</h3>
                      <p className="mt-3 text-[15px] font-medium leading-[1.7] text-white/68">{step.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {(service.extraSections ?? []).filter((section) => section.enabled).map((section, index) => {
              const imageLeft = section.imagePosition === "left";
              return (
                <section className="mt-12 grid overflow-hidden rounded-[22px] bg-white ring-1 ring-black/10 lg:grid-cols-2" key={`${section.title}-${index}`}>
                  {section.image ? (
                    <img
                      alt={section.imageAlt || section.title}
                      className={["h-[300px] w-full object-cover lg:h-full", imageLeft ? "lg:order-1" : "lg:order-2"].join(" ")}
                      src={section.image}
                    />
                  ) : null}
                  <div className={["p-7 sm:p-10", imageLeft ? "lg:order-2" : "lg:order-1"].join(" ")}>
                    <p className="text-[13px] font-black uppercase tracking-[0.16em] text-[#b38a00]">{section.eyebrow}</p>
                    <h2 className="mt-4 text-[32px] font-black leading-tight md:text-[44px]">{section.title}</h2>
                    <div className="mt-5 text-[16px] font-medium leading-[1.8] text-[#666] [&_p]:mb-4" dangerouslySetInnerHTML={{ __html: section.body }} />
                  </div>
                </section>
              );
            })}

            {visible.faqs ? (
            <section className="mt-16">
              <h2 className="text-[30px] font-black">Frequently Asked Questions</h2>
              <p className="mt-4 max-w-[680px] text-[15px] font-medium leading-[1.75] text-[#737373]">{service.excerpt}</p>
              <div className="mt-8 space-y-4">
                {service.faqs.map((faq, index) => (
                  <details className="group rounded-[12px] bg-white p-6 ring-1 ring-black/10" key={faq.question} open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-black">
                      {`${String(index + 1).padStart(2, "0")} ${faq.question}`}
                      <span className="text-[#b38a00] group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-5 border-t border-black/10 pt-5 text-[15px] font-medium leading-[1.75] text-[#737373]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
            ) : null}
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <section className="rounded-[18px] bg-white p-7 ring-1 ring-black/10">
              <h2 className="text-[26px] font-black">{service.sidebarTitle}</h2>
              <div className="mt-2 h-[3px] w-8 bg-[#ffd018]" />
              <div className="mt-7 space-y-3">
                {visibleServices.map((item) => (
                  <Link
                    className={[
                      "flex items-center gap-3 rounded-[6px] border border-black/10 px-4 py-4 text-[14px] font-black uppercase transition hover:border-[#ffd018] hover:bg-[#ffd018]/15",
                      item.slug === service.slug ? "border-[#ffd018] bg-[#ffd018]/20" : "bg-white",
                    ].join(" ")}
                    href={`/services/${item.slug}`}
                    key={item.slug}
                  >
                    <Folder className="h-4 w-4 text-[#b38a00]" />
                    {item.navLabel || item.title}
                  </Link>
                ))}
              </div>
            </section>

            {visible.downloads ? (
            <section className="rounded-[18px] bg-white p-7 ring-1 ring-black/10">
              <h2 className="text-[26px] font-black">Downloads</h2>
              <div className="mt-2 h-[3px] w-8 bg-[#ffd018]" />
              <div className="mt-7 space-y-3">
                {service.downloads.map((download, index) => (
                  <a
                    className={[
                      "flex items-center justify-between rounded-[5px] px-4 py-4 text-[13px] font-black uppercase text-black transition hover:-translate-y-0.5",
                      index % 2 === 0 ? "bg-black text-white" : "bg-[#ffd018] text-black",
                    ].join(" ")}
                    href={download.url}
                    key={`${download.label}-${download.url}`}
                  >
                    <span className="flex items-center gap-3"><Download className="h-4 w-4" />{download.label}</span>
                    <Download className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
            ) : null}

            {visible.contact ? (
            <section className="relative overflow-hidden rounded-[18px] bg-black p-8 text-white">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,transparent_0_70%,#ffd018_70%_71%,transparent_72%)]" />
              <div className="relative">
                <Phone className="h-7 w-7 text-[#ffd018]" />
                <p className="mt-8 text-[15px] font-black">{service.contactTitle}</p>
                <a className="mt-3 block text-[24px] font-black" href={`tel:${service.contactPhone.replace(/[^\d+]/g, "")}`}>{service.contactPhone}</a>
                <a className="mt-2 flex items-center gap-2 text-[14px] font-medium text-white/80" href={`mailto:${service.contactEmail}`}>
                  <Mail className="h-4 w-4 text-[#ffd018]" />
                  {service.contactEmail}
                </a>
                <Link className="mt-8 inline-flex h-12 items-center gap-3 bg-[#ffd018] px-8 text-[14px] font-black text-black" href={service.contactCtaHref}>
                  {service.contactCtaText} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
            ) : null}
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
