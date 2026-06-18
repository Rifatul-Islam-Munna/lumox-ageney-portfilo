"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { SaveIcon, UploadIcon } from "lucide-react";
import { saveBlogPostCms } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogContent } from "@/lib/cms-types";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return String(data.url);
}

export function BlogPostCmsForm({
  initialPost,
  originalSlug,
}: {
  initialPost: BlogContent["posts"][number];
  originalSlug?: string;
}) {
  const [post, setPost] = useState(() => clone(initialPost));
  const [pending, startTransition] = useTransition();
  const slug = useMemo(() => post.slug || slugify(post.title), [post.slug, post.title]);

  function update<K extends keyof BlogContent["posts"][number]>(key: K, value: BlogContent["posts"][number][K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  function save() {
    startTransition(async () => {
      try {
        const result = await saveBlogPostCms(originalSlug, { ...post, slug, href: `/blog/${slug}` });
        update("slug", result.slug);
        update("href", `/blog/${result.slug}`);
        toast.success("Blog post saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog post</h1>
          <p className="text-sm text-muted-foreground">Thumbnail, slug, card description, and full page body.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save post"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription>Slug creates the dynamic public page.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field><FieldLabel>Title</FieldLabel><Textarea value={post.title} onChange={(event) => {
              const title = event.target.value;
              update("title", title);
              if (!originalSlug) update("slug", slugify(title));
            }} /></Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field><FieldLabel>Slug</FieldLabel><Input value={slug} onChange={(event) => update("slug", slugify(event.target.value))} /></Field>
              <Field><FieldLabel>Public link</FieldLabel><Input readOnly value={`/blog/${slug}`} /></Field>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Field><FieldLabel>Category</FieldLabel><Input value={post.category} onChange={(event) => update("category", event.target.value)} /></Field>
              <Field><FieldLabel>Date</FieldLabel><Input value={post.date} onChange={(event) => update("date", event.target.value)} /></Field>
              <Field><FieldLabel>Author</FieldLabel><Input value={post.author} onChange={(event) => update("author", event.target.value)} /></Field>
            </div>
            <Field><FieldLabel>Comments text</FieldLabel><Input value={post.comments} onChange={(event) => update("comments", event.target.value)} /></Field>
            <Field><FieldLabel>Thumbnail image URL (recommended 1200x800px)</FieldLabel><div className="flex gap-2"><Input value={post.image} onChange={(event) => update("image", event.target.value)} /><label className="inline-flex"><Button asChild size="icon" type="button" variant="outline"><span><UploadIcon data-icon="inline-start" /><input accept="image/*" className="sr-only" type="file" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                update("image", await uploadFile(file));
                toast.success("Image uploaded");
              } catch {
                toast.error("Upload failed");
              }
            }} /></span></Button></label></div></Field>
            <Field><FieldLabel>Thumbnail image alt SEO</FieldLabel><Input value={post.imageAlt ?? ""} onChange={(event) => update("imageAlt", event.target.value)} /></Field>
            <Field><FieldLabel>Card description</FieldLabel><RichTextEditor value={post.excerpt} onChange={(value) => update("excerpt", value)} /></Field>
            <Field><FieldLabel>Full blog page body</FieldLabel><RichTextEditor value={post.body ?? post.excerpt} onChange={(value) => update("body", value)} /></Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
