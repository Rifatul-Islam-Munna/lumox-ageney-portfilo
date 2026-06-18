import type { Metadata } from "next";
import HomePageClient from "@/components/home-page-client";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/");
  return toMetadata(seo, entry);
}

export default async function Home() {
  const { entry } = await getSeoEntry("/");
  return (
    <>
      <SeoJsonLd json={entry?.structuredData} />
      <HomePageClient />
    </>
  );
}
