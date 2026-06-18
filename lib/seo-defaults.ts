import type { SeoContent, SeoEntry } from "@/lib/cms-types";

const defaults = {
  keywords: "photography studio, production, portfolio, shooting booking",
  robots: "index, follow",
  imageAltDefault: "Luumox photography studio image",
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
  siteName: "Luumox",
  defaultTitle: "Luumox Photography Studio",
  defaultDescription: "Photography, production, portfolio, and shooting booking studio.",
  defaultOgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=90",
  entries: [
    entry("Home", "/", "Luumox Photography Studio", "Full-service photography, production, and post-production studio."),
    entry("About", "/about", "About Luumox", "Meet the studio, team, and creative production process."),
    entry("Services", "/services", "Photography Services", "Book photography, production, and post-production services."),
    entry("Portfolio", "/portfolio", "Photography Portfolio", "Explore photography, fashion, product, and architecture work."),
    entry("Blog", "/blog", "Photography Blog", "Photography news, tips, gear, and studio stories."),
    entry("Book", "/book", "Book for Shooting", "Contact Luumox to book your next photography shoot."),
  ],
};
