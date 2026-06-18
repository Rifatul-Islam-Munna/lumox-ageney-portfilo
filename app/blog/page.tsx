import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { defaultBlogContent } from "@/lib/blog-defaults";
import { getBlogContent } from "@/lib/cms-store";
import { getSeoEntry, toMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, entry } = await getSeoEntry("/blog");
  return toMetadata(seo, entry);
}

function postHref(post: { href: string; slug?: string; title: string }) {
  if (post.slug) return `/blog/${post.slug}`;
  if (post.href && post.href !== "#") return post.href;
  return `/blog/${post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  let content = defaultBlogContent;
  try {
    content = (await getBlogContent()) ?? defaultBlogContent;
  } catch {
    content = defaultBlogContent;
  }
  const { entry } = await getSeoEntry("/blog");

  const currentPage = Math.max(1, Number((await searchParams).page ?? "1"));
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(content.posts.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const visiblePosts = content.posts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-white text-black">
      <SeoJsonLd json={entry?.structuredData} />
      <section
        className="relative min-h-[460px] overflow-hidden bg-black text-white md:min-h-[520px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.82)), url(${content.hero.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <SiteHeader />
        <div className="relative z-10 flex flex-col items-center px-7 pt-32 text-center md:pt-44">
          <h1 className="text-[40px] font-black uppercase tracking-[-0.05em] sm:text-[50px] md:text-[58px]">
            {content.hero.title}
          </h1>
          {content.hero.sub && (
            <p className="mt-4 text-[15px] font-black text-[#ffd018]">
              {content.hero.sub}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white px-7 py-14 sm:px-12 md:py-20">
        <div className="mx-auto grid max-w-[980px] gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-14">
          {visiblePosts.map((post) => (
            <article key={`${post.title}-${post.image}`}>
              <a href={postHref(post)}>
                <img
                  alt={post.imageAlt ?? post.title}
                  className="h-[280px] w-full object-cover sm:h-[330px]"
                  src={post.image}
                />
                <h2 className="mt-6 text-[22px] font-black leading-[1.32] tracking-[-0.04em]">
                  {post.title}
                </h2>
              </a>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#999]">
                <span>{post.date}</span>
                <span>By {post.author}</span>
                <span>In {post.category}</span>
                <span>{post.comments}</span>
              </div>
              <div className="mt-4 h-[2px] w-9 bg-[#ffd018]" />
              <div
                className="mt-5 text-[14px] font-medium leading-[1.75] text-[#777] [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <a
                className="mt-8 inline-flex h-12 items-center bg-[#ffd018] px-7 text-[12px] font-black uppercase tracking-[0.08em]"
                href={postHref(post)}
              >
                Read more
              </a>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-[980px] gap-3">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-black",
                pageNumber === page ? "bg-[#ffd018] text-black" : "bg-[#f1f1f1] text-[#777]",
              ].join(" ")}
              href={`/blog?page=${pageNumber}`}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          ))}
          {page < totalPages && (
            <Link className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f1f1] text-[12px] font-black text-[#777]" href={`/blog?page=${page + 1}`}>
              &gt;
            </Link>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
