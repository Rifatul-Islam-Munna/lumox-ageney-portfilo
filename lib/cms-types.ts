export type CmsImageText = {
  title: string;
  sub?: string;
  body?: string;
  href?: string;
  cta?: string;
  image: string;
  imageAlt?: string;
};

export type CmsLinkedImage = {
  image: string;
  imageAlt?: string;
  title?: string;
  href?: string;
};

export type CmsSocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "twitter" | "linkedin" | "instagram" | "pinterest" | "youtube";
};

export type HomeContent = {
  site?: {
    logoText: string;
    logoAccent: string;
    phone: string;
    email: string;
    socialLinks: CmsSocialLink[];
  };
  copy?: {
    aboutTitle: string;
    aboutBodyLeft: string;
    aboutBodyRight: string;
    aboutCtaText: string;
    aboutCtaHref: string;
    servicesSideLabel: string;
    serviceCtaText: string;
    serviceCtaHref: string;
    worksTitle: string;
    worksBody: string;
    worksCtaText: string;
    worksCtaHref: string;
    worksLoadMoreText: string;
    photographersTitle: string;
    photographersSubtitle: string;
    facilitiesTitle: string;
    facilitiesSubtitle: string;
    blogTitle: string;
    blogSubtitle: string;
    blogCtaText: string;
    blogCtaHref: string;
    contactTitle: string;
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    contactCtaText: string;
    contactCtaHref: string;
    mapSrc: string;
    footerCopyright: string;
  };
  heroSlides: Array<CmsImageText & { eyebrow: string }>;
  services: Array<
    CmsImageText & {
      id: string;
      tone: "yellow" | "dark";
      ghost: string;
    }
  >;
  photographers: Array<{ name: string; image: string }>;
  works: CmsLinkedImage[];
  facilities: Array<{ title: string; image: string; imageAlt?: string; body?: string }>;
  posts: Array<{ title: string; comments: string; image: string; imageAlt?: string; date?: string; href?: string }>;
};

export type AboutContent = {
  hero: CmsImageText;
  intro: {
    image: string;
    title: string;
    badge: string;
    body: string;
  };
  story: {
    image: string;
    title: string;
    badge: string;
    points: string[];
  };
  stats: Array<{ value: string; label: string }>;
  testimonial: {
    quote: string;
    name: string;
    company: string;
    image: string;
  };
  features: Array<{ title: string; body: string }>;
  photographers: Array<{ name: string; image: string }>;
};

export type ServicesContent = {
  hero: CmsImageText;
  feature: CmsImageText;
  steps: Array<{ number: string; eyebrow: string; title: string; body: string }>;
  services: Array<CmsImageText & { backdrop?: string }>;
  videoUrl: string;
  photographers: Array<{ name: string; image: string }>;
  testimonial: {
    quote: string;
    name: string;
    company: string;
    image: string;
  };
  booking: {
    title: string;
    body: string;
    phone: string;
    email: string;
  };
};

export type PortfolioContent = {
  hero: CmsImageText;
  tabs: string[];
  projects: Array<{
    title: string;
    category: string;
    filter: string;
    image: string;
    imageAlt?: string;
    href?: string;
  }>;
};

export type BlogContent = {
  hero: CmsImageText;
  posts: Array<{
    title: string;
    category: string;
    comments: string;
    date: string;
    author: string;
    excerpt: string;
    href: string;
    image: string;
    imageAlt?: string;
    slug?: string;
    body?: string;
  }>;
};

export type SeoEntry = {
  page: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
  imageAltDefault: string;
  structuredData: string;
};

export type SeoContent = {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  entries: SeoEntry[];
};
