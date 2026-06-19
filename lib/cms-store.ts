import "server-only";

import { MongoClient } from "mongodb";
import type { AboutContent, BlogContent, DynamicServiceContent, HomeContent, PortfolioContent, SeoContent, ServicesContent } from "@/lib/cms-types";

let clientPromise: Promise<MongoClient> | undefined;

function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }

  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
}

async function getCollection() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB ?? "luumox").collection("cms_pages");
}

export async function getHomeContent() {
  return getCmsContent<HomeContent>("home");
}

export async function saveHomeContent(content: HomeContent) {
  return saveCmsContent("home", content);
}

export async function getAboutContent() {
  return getCmsContent<AboutContent>("about");
}

export async function saveAboutContent(content: AboutContent) {
  return saveCmsContent("about", content);
}

export async function getServicesContent() {
  return getCmsContent<ServicesContent>("services");
}

export async function saveServicesContent(content: ServicesContent) {
  return saveCmsContent("services", content);
}

export async function getDynamicServicesContent() {
  return getCmsContent<DynamicServiceContent>("dynamic-services");
}

export async function saveDynamicServicesContent(content: DynamicServiceContent) {
  return saveCmsContent("dynamic-services", content);
}

export async function getPortfolioContent() {
  return getCmsContent<PortfolioContent>("portfolio");
}

export async function savePortfolioContent(content: PortfolioContent) {
  return saveCmsContent("portfolio", content);
}

export async function getBlogContent() {
  return getCmsContent<BlogContent>("blog");
}

export async function saveBlogContent(content: BlogContent) {
  return saveCmsContent("blog", content);
}

export async function getSeoContent() {
  return getCmsContent<SeoContent>("seo");
}

export async function saveSeoContent(content: SeoContent) {
  return saveCmsContent("seo", content);
}

async function getCmsContent<T>(slug: string) {
  const collection = await getCollection();
  const doc = await collection.findOne<{ content: T }>({ slug });
  return doc?.content ?? null;
}

async function saveCmsContent(slug: string, content: unknown) {
  const collection = await getCollection();
  await collection.updateOne(
    { slug },
    { $set: { slug, content, updatedAt: new Date() } },
    { upsert: true },
  );
}
