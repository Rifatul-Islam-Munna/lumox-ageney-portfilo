import type { Metadata } from "next";
import { defaultSeoContent } from "@/lib/seo-defaults";
import { getSeoContent } from "@/lib/cms-store";
import type { SeoEntry } from "@/lib/cms-types";

export async function getSeoEntry(path: string, fallbackToHome = true) {
  let seo = defaultSeoContent;
  try {
    seo = (await getSeoContent()) ?? defaultSeoContent;
  } catch {
    seo = defaultSeoContent;
  }

  const entry = seo.entries.find((item) => item.path === path) ?? (fallbackToHome ? seo.entries.find((item) => item.path === "/") : undefined);
  return { seo, entry };
}

export function toMetadata(seo: typeof defaultSeoContent, entry?: SeoEntry, fallback?: Partial<Metadata>): Metadata {
  const title = String(fallback?.title ?? entry?.title ?? seo.defaultTitle);
  const description = fallback?.description || entry?.description || seo.defaultDescription;
  const ogImage = entry?.ogImage || seo.defaultOgImage;
  const fallbackOpenGraph =
    fallback?.openGraph && typeof fallback.openGraph === "object"
      ? (fallback.openGraph as NonNullable<Metadata["openGraph"]>)
      : undefined;

  return {
    ...fallback,
    title,
    description,
    keywords: entry?.keywords,
    robots: entry?.robots,
    alternates: {
      canonical: entry?.canonical || entry?.path,
    },
    openGraph: {
      ...fallbackOpenGraph,
      title: entry?.ogTitle || title,
      description: entry?.ogDescription || description,
      siteName: seo.siteName,
      images: fallbackOpenGraph?.images ?? (ogImage ? [{ url: ogImage, alt: entry?.ogImageAlt || seo.defaultTitle }] : undefined),
    },
    twitter: {
      card: "summary_large_image",
      title: entry?.twitterTitle || title,
      description: entry?.twitterDescription || description,
      images: entry?.twitterImage || ogImage ? [entry?.twitterImage || ogImage] : undefined,
    },
  };
}
