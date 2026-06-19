import type { SeoContent, SeoEntry } from "@/lib/cms-types";

const defaults = {
  keywords:
    "Lumos Visuals, corporate photography, commercial video production, event photography, virtual tours, post-production",
  robots: "index, follow",
  imageAltDefault: "Lumos Visuals commercial visual production image",
  structuredData: "",
};

function entry(page: string, path: string, title: string, description: string, ogImage = ""): SeoEntry {
  return {
    page,
    path,
    title,
    description,
    keywords: defaults.keywords,
    canonical: path,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: defaults.imageAltDefault,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    robots: defaults.robots,
    imageAltDefault: defaults.imageAltDefault,
    structuredData: defaults.structuredData,
  };
}

export const defaultSeoContent: SeoContent = {
  siteName: "Lumos Visuals",
  defaultTitle: "Lumos Visuals | Corporate & Commercial Visual Production",
  defaultDescription:
    "Photography, video production, 360-degree virtual tours, and creative post-production for brands, events, hospitality, architecture, and commercial spaces.",
  defaultOgImage: "/uploads/site-images/conference-panel.jpg",
  entries: [
    entry(
      "Home",
      "/",
      "Lumos Visuals | Corporate & Commercial Visual Production",
      "Premium visual content for brands, events, and spaces.",
    ),
    entry(
      "About",
      "/about",
      "About Lumos Visuals",
      "Commercial visual production beyond photography.",
    ),
    entry(
      "Services",
      "/services",
      "Visual Production Services",
      "Photography, video production, virtual tours, and creative post-production services.",
    ),
    entry(
      "Portfolio",
      "/portfolio",
      "Lumos Visuals Portfolio",
      "Explore visual production work for brands, events, spaces, and commercial campaigns.",
    ),
    entry(
      "Blog",
      "/blog",
      "Lumos Visuals Clients & Insights",
      "Client-focused notes and visual production insights from Lumos Visuals.",
    ),
    entry(
      "Book",
      "/book",
      "Request a Quote | Lumos Visuals",
      "Contact Lumos Visuals to plan photography, video, virtual tour, or post-production work.",
    ),
  ],
};
