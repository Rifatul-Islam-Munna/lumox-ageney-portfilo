import { redirect } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { BlogPostCmsForm } from "@/components/admin/blog-post-cms-form";
import { isAdminAuthed } from "@/lib/admin-auth";

const blankPost = {
  title: "New post",
  category: "Blog",
  comments: "0",
  date: "June 6, 2016",
  author: "John Smith",
  excerpt: "Short card description",
  href: "/blog/new-post",
  slug: "new-post",
  body: "Full blog content",
  image: "",
  imageAlt: "",
};

export default async function NewBlogPostPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  return (
    <AdminPageShell title="Create blog post" subtitle="New post creates a dynamic slug page.">
      <BlogPostCmsForm initialPost={blankPost} />
    </AdminPageShell>
  );
}
