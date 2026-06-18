import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { defaultBlogContent } from "@/lib/blog-defaults";
import { getBlogContent } from "@/lib/cms-store";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

function postSlug(post: { slug?: string; href: string; title: string }) {
  if (post.slug) return post.slug;
  if (post.href.startsWith("/blog/")) return post.href.replace("/blog/", "");
  return post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function getPost(slug: string) {
  let content = defaultBlogContent;
  try {
    content = (await getBlogContent()) ?? defaultBlogContent;
  } catch {
    content = defaultBlogContent;
  }
  return content.posts.find((item) => postSlug(item) === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const { seo, entry } = await getSeoEntry(`/blog/${slug}`, false);
  return toMetadata(seo, entry, post ? {
    title: entry?.title || post.title,
    description: entry?.description || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 155),
    openGraph: {
      title: entry?.ogTitle || post.title,
      description: entry?.ogDescription || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 155),
      images: [{ url: entry?.ogImage || post.image, alt: entry?.ogImageAlt || post.imageAlt || post.title }],
    },
  } : undefined);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { entry } = await getSeoEntry(`/blog/${slug}`, false);

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[460px] overflow-hidden bg-black text-white md:min-h-[560px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.84)), url(${post.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 mx-auto flex max-w-[980px] flex-col px-7 pt-32 md:pt-44">
          <p className="text-[13px] font-black uppercase tracking-[0.18em] text-[#ffd018]">{post.category}</p>
          <h1 className="mt-4 max-w-[820px] text-[38px] font-black uppercase leading-[1.02] tracking-[-0.05em] sm:text-[48px] md:text-[58px]">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-[860px] px-7 py-14 sm:px-12 md:py-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#999]">
          <span>{post.date}</span>
          <span>By {post.author}</span>
          <span>{post.comments}</span>
        </div>
        <div className="mt-5 h-[3px] w-11 bg-[#ffd018]" />
        <div
          className="mt-8 text-[16px] font-medium leading-[1.85] text-[#555] [&_p]:mb-5"
          dangerouslySetInnerHTML={{ __html: post.body ?? post.excerpt }}
        />
      </article>
      <SiteFooter />
    </main>
  );
}
