import { notFound, redirect } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { BlogPostCmsForm } from "@/components/admin/blog-post-cms-form";
import { isAdminAuthed } from "@/lib/admin-auth";
import { defaultBlogContent } from "@/lib/blog-defaults";
import { getBlogContent } from "@/lib/cms-store";

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const { slug } = await params;
  let content = defaultBlogContent;
  try {
    content = (await getBlogContent()) ?? defaultBlogContent;
  } catch {
    content = defaultBlogContent;
  }

  const post = content.posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <AdminPageShell title="Edit blog post" subtitle={`/blog/${slug}`}>
      <BlogPostCmsForm initialPost={post} originalSlug={slug} />
    </AdminPageShell>
  );
}
