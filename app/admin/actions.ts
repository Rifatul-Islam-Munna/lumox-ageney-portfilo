"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSession, createAdminSession, isAdminAuthed, isValidAdmin } from "@/lib/admin-auth";
import { getBlogContent, saveAboutContent, saveBlogContent, saveHomeContent, savePortfolioContent, saveSeoContent, saveServicesContent } from "@/lib/cms-store";
import type { AboutContent, BlogContent, HomeContent, PortfolioContent, SeoContent, ServicesContent } from "@/lib/cms-types";
import { defaultBlogContent } from "@/lib/blog-defaults";

export async function loginAdmin(_prev: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isValidAdmin(email, password)) {
    return { error: "Invalid email or password" };
  }

  await createAdminSession(email);
  redirect("/admin/home");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveHomeCms(content: HomeContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await saveHomeContent(content);
  revalidatePath("/");
  return { ok: true };
}

export async function saveAboutCms(content: AboutContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await saveAboutContent(content);
  revalidatePath("/about");
  return { ok: true };
}

export async function saveServicesCms(content: ServicesContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await saveServicesContent(content);
  revalidatePath("/services");
  return { ok: true };
}

export async function savePortfolioCms(content: PortfolioContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await savePortfolioContent(content);
  revalidatePath("/portfolio");
  return { ok: true };
}

export async function saveBlogCms(content: BlogContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await saveBlogContent(content);
  revalidatePath("/blog");
  revalidatePath("/");
  return { ok: true };
}

export async function saveBlogPostCms(originalSlug: string | undefined, post: BlogContent["posts"][number]) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  const content = (await getBlogContent()) ?? defaultBlogContent;
  const slug = post.slug || post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const nextPost = { ...post, slug, href: `/blog/${slug}` };
  const posts = content.posts.filter((item) => item.slug !== originalSlug && item.slug !== slug);
  await saveBlogContent({ ...content, posts: [nextPost, ...posts] });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  return { ok: true, slug };
}

export async function deleteBlogPostCms(slug: string) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  const content = (await getBlogContent()) ?? defaultBlogContent;
  await saveBlogContent({ ...content, posts: content.posts.filter((item) => item.slug !== slug) });
  revalidatePath("/blog");
  revalidatePath("/");
  return { ok: true };
}

export async function saveSeoCms(content: SeoContent) {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }

  await saveSeoContent(content);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/portfolio");
  revalidatePath("/blog");
  revalidatePath("/book");
  return { ok: true };
}
