"use client";

import Link from "next/link";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultHomeContent } from "@/lib/home-defaults";
import type { DynamicServiceContent, HomeContent } from "@/lib/cms-types";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Book", href: "/book" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [dynamicServices, setDynamicServices] = useState<DynamicServiceContent["services"]>([]);
  const site = { ...defaultHomeContent.site!, ...content.site };
  const phoneHref = site.phone.replace(/[^\d+]/g, "");

  useEffect(() => {
    fetch("/api/cms/home")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => null);
    fetch("/api/cms/dynamic-services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content?.services) setDynamicServices(data.content.services.filter((item: DynamicServiceContent["services"][number]) => item.published));
      })
      .catch(() => null);
  }, []);

  return (
    <>
      <nav className="relative z-30 flex h-28 items-center justify-between px-7 text-white sm:px-12 lg:px-14">
        <Link className="nav-link text-[32px] font-light leading-none tracking-[-0.04em]" href="/">
          {site.logoText}<span className="font-extrabold text-[#ffd018]">{site.logoAccent}</span>
        </Link>

        <div className="hidden items-center gap-6 text-[17px] font-extrabold tracking-[-0.02em] lg:flex">
          <div className="relative">
            <div className="flex items-center gap-2">
              <Link className="nav-link flex items-center gap-2" href="/services">
                Services
              </Link>
              {dynamicServices.length ? (
                <button
                  aria-expanded={servicesOpen}
                  aria-label={servicesOpen ? "Close services menu" : "Open services menu"}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-[#ffd018] transition hover:border-[#ffd018]"
                  onClick={() => setServicesOpen((value) => !value)}
                  type="button"
                >
                  <ChevronDown className={["h-4 w-4 transition", servicesOpen ? "rotate-180" : ""].join(" ")} />
                </button>
              ) : null}
            </div>
            {dynamicServices.length ? (
              <div
                className={[
                  "absolute left-1/2 top-full z-50 mt-4 min-w-64 -translate-x-1/2 bg-black/92 p-3 shadow-2xl ring-1 ring-white/10 transition",
                  servicesOpen ? "visible opacity-100" : "invisible opacity-0",
                ].join(" ")}
              >
                {dynamicServices.map((service) => (
                  <Link
                    className="block border-b border-white/10 px-4 py-3 text-[15px] font-black text-white last:border-b-0 hover:bg-[#ffd018] hover:text-black"
                    href={`/services/${service.slug}`}
                    key={service.slug}
                    onClick={() => setServicesOpen(false)}
                  >
                    {service.navLabel || service.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <a className="nav-link flex items-center gap-3" href={`tel:${phoneHref}`}>
            {site.phone} <Phone className="h-5 w-5 fill-[#ffd018] text-[#ffd018]" />
          </a>
          <a className="nav-link flex items-center gap-4" href={`mailto:${site.email}`}>
            {site.email} <Mail className="h-5 w-5 text-[#ffd018]" />
          </a>
          <button aria-label="Open menu" className="ml-2" onClick={() => { setServicesOpen(false); setOpen(true); }} type="button">
            <Menu className="h-10 w-10 stroke-[3]" />
          </button>
        </div>

        <button aria-label="Open menu" className="lg:hidden" onClick={() => { setServicesOpen(false); setOpen(true); }} type="button">
          <Menu className="h-9 w-9 stroke-[3]" />
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.92), rgba(0,0,0,.92)), url(/uploads/site-images/conference-panel.jpg)",
          }}
        >
          <div className="flex h-28 items-center justify-between px-7 sm:px-12 lg:px-14">
            <Link className="text-[32px] font-light leading-none tracking-[-0.04em] opacity-45" href="/" onClick={() => { setServicesOpen(false); setOpen(false); }}>
              {site.logoText}<span className="font-extrabold text-[#ffd018]">{site.logoAccent}</span>
            </Link>
            <button aria-label="Close menu" onClick={() => { setServicesOpen(false); setOpen(false); }} type="button">
              <X className="h-10 w-10 stroke-[2.5]" />
            </button>
          </div>

          <div className="mx-auto mt-14 w-[min(90vw,570px)]">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.href === "/services" && dynamicServices.length ? (
                  <div className="flex items-center border-b border-white/20">
                    <Link
                      className="block flex-1 py-5 text-center text-[24px] font-black tracking-[-0.04em] transition hover:text-[#ffd018]"
                      href={item.href}
                      onClick={() => { setServicesOpen(false); setOpen(false); }}
                    >
                      {item.label}
                    </Link>
                    <button
                      aria-expanded={servicesOpen}
                      aria-label={servicesOpen ? "Close services list" : "Open services list"}
                      className="grid h-14 w-14 place-items-center text-[#ffd018]"
                      onClick={() => setServicesOpen((value) => !value)}
                      type="button"
                    >
                      <ChevronDown className={["h-6 w-6 transition", servicesOpen ? "rotate-180" : ""].join(" ")} />
                    </button>
                  </div>
                ) : (
                  <Link
                    className="block border-b border-white/20 py-5 text-center text-[24px] font-black tracking-[-0.04em] transition hover:text-[#ffd018]"
                    href={item.href}
                    onClick={() => { setServicesOpen(false); setOpen(false); }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.href === "/services" && dynamicServices.length ? (
                  <div
                    className={[
                      "overflow-hidden border-b border-white/20 bg-white/5 transition-all duration-300",
                      servicesOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 py-0 opacity-0",
                    ].join(" ")}
                  >
                    {dynamicServices.map((service) => (
                      <Link
                        className="block py-2 text-center text-[18px] font-black text-white/72 transition hover:text-[#ffd018]"
                        href={`/services/${service.slug}`}
                        key={service.slug}
                        onClick={() => { setServicesOpen(false); setOpen(false); }}
                      >
                        {service.navLabel || service.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
