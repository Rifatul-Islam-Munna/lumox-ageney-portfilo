"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { deleteBlogPostCms, saveBlogCms } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { BlogContent } from "@/lib/cms-types";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return String(data.url);
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function BlogCmsForm({ initialContent }: { initialContent: BlogContent }) {
  const [content, setContent] = useState<BlogContent>(() => clone(initialContent));
  const [pending, startTransition] = useTransition();

  function update(path: Array<string | number>, value: unknown) {
    setContent((current) => {
      const next = clone(current);
      let target: any = next;
      for (let i = 0; i < path.length - 1; i += 1) target = target[path[i]];
      target[path[path.length - 1]] = value;
      return next;
    });
  }

  function save() {
    startTransition(async () => {
      try {
        await saveBlogCms(content);
        toast.success("Blog CMS saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  function imageInput(path: Array<string | number>, value: string) {
    return (
      <Field>
        <FieldLabel>Image URL (recommended 1200x800px)</FieldLabel>
        <div className="flex gap-2">
          <Input value={value} onChange={(event) => update(path, event.target.value)} />
          <label className="inline-flex">
            <Button asChild size="icon" type="button" variant="outline">
              <span>
                <UploadIcon data-icon="inline-start" />
                <input
                  accept="image/*"
                  className="sr-only"
                  type="file"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      update(path, await uploadFile(file));
                      toast.success("Image uploaded");
                    } catch {
                      toast.error("Upload failed");
                    }
                  }}
                />
              </span>
            </Button>
          </label>
        </div>
      </Field>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog CMS</h1>
          <p className="text-sm text-muted-foreground">Hero and post list. Create/edit posts on dedicated pages.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <SectionCard title="Hero" description="Blog page top banner.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.hero.title} onChange={(event) => update(["hero", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Subtitle</FieldLabel><Input value={content.hero.sub ?? ""} onChange={(event) => update(["hero", "sub"], event.target.value)} /></Field>
              {imageInput(["hero", "image"], content.hero.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="posts">
          <SectionCard title="Posts" description="Newest post stays first. Each slug becomes its own blog page.">
            <FieldGroup>
              <Button asChild type="button" variant="outline">
                <Link href="/admin/blog/new">
                  <PlusIcon data-icon="inline-start" />
                  Add post
                </Link>
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[260px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Image alt SEO</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.posts.map((post, index) => (
                    <TableRow key={`${post.slug ?? post.title}-${index}`}>
                      <TableCell><Textarea value={post.title} onChange={(event) => update(["posts", index, "title"], event.target.value)} /></TableCell>
                      <TableCell><Input value={post.category} onChange={(event) => update(["posts", index, "category"], event.target.value)} /></TableCell>
                      <TableCell><Input value={post.date} onChange={(event) => update(["posts", index, "date"], event.target.value)} /></TableCell>
                      <TableCell><Input value={post.author} onChange={(event) => update(["posts", index, "author"], event.target.value)} /></TableCell>
                      <TableCell>
                        <Input
                          value={post.slug ?? ""}
                          onChange={(event) => {
                            const slug = event.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                            update(["posts", index, "slug"], slug);
                            update(["posts", index, "href"], `/blog/${slug}`);
                          }}
                        />
                      </TableCell>
                      <TableCell><Input value={post.imageAlt ?? ""} onChange={(event) => update(["posts", index, "imageAlt"], event.target.value)} /></TableCell>
                      <TableCell className="min-w-[260px]">{imageInput(["posts", index, "image"], post.image)}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button asChild type="button" variant="outline">
                          <Link href={`/admin/blog/${post.slug ?? ""}`}>Edit</Link>
                        </Button>
                        <Button type="button" variant="destructive" onClick={() => {
                          const slug = post.slug ?? "";
                          setContent((current) => ({ ...current, posts: current.posts.filter((_, i) => i !== index) }));
                          if (slug) {
                            startTransition(async () => {
                              try {
                                await deleteBlogPostCms(slug);
                                toast.success("Post deleted");
                              } catch {
                                toast.error("Delete failed");
                              }
                            });
                          }
                        }}>
                          <TrashIcon data-icon="inline-start" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="json">
          <SectionCard title="Full JSON" description="Power edit. Keep valid JSON.">
            <Field>
              <FieldLabel>Blog content</FieldLabel>
              <Textarea
                className="min-h-[520px] font-mono text-xs"
                value={JSON.stringify(content, null, 2)}
                onChange={(event) => {
                  try {
                    setContent(JSON.parse(event.target.value));
                  } catch {}
                }}
              />
            </Field>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
