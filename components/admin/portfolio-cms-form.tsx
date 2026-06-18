"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { savePortfolioCms } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { PortfolioContent } from "@/lib/cms-types";

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

export function PortfolioCmsForm({ initialContent }: { initialContent: PortfolioContent }) {
  const [content, setContent] = useState<PortfolioContent>(() => clone(initialContent));
  const [pending, startTransition] = useTransition();
  const categories = content.tabs.filter((tab) => tab !== "All");
  const categoryOptions = categories.length ? categories : ["All"];

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
        await savePortfolioCms(content);
        toast.success("Portfolio CMS saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  function imageInput(path: Array<string | number>, value: string) {
    return (
      <Field>
        <FieldLabel>Image URL (recommended 1200x900px)</FieldLabel>
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
          <h1 className="text-2xl font-semibold">Portfolio CMS</h1>
          <p className="text-sm text-muted-foreground">Hero, categories, projects. Projects choose one category.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="tabs">Categories</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <SectionCard title="Hero" description="Portfolio top banner.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.hero.title} onChange={(event) => update(["hero", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Subtitle</FieldLabel><Input value={content.hero.sub ?? ""} onChange={(event) => update(["hero", "sub"], event.target.value)} /></Field>
              {imageInput(["hero", "image"], content.hero.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="tabs">
          <SectionCard title="Categories" description="Add categories one by one. Projects choose from these categories.">
            <FieldGroup>
              {content.tabs.map((tab, index) => (
                <Card key={`${tab}-${index}`} size="sm">
                  <CardContent>
                    <div className="flex gap-2">
                      <Input value={tab} onChange={(event) => update(["tabs", index], event.target.value)} />
                      <Button
                        disabled={tab === "All"}
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          setContent((current) => ({
                            ...current,
                            tabs: current.tabs.filter((_, i) => i !== index),
                            projects: current.projects.map((project) =>
                              project.filter === tab ? { ...project, filter: "All", category: "All" } : project,
                            ),
                          }))
                        }
                      >
                        <TrashIcon data-icon="inline-start" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, tabs: [...current.tabs, "New category"] }))}>
                <PlusIcon data-icon="inline-start" />
                Add category
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="projects">
          <SectionCard title="Projects" description="Add/remove work cards and choose category.">
            <FieldGroup>
              {content.projects.map((project, index) => (
                <Card key={index} size="sm">
                  <CardHeader><CardTitle>{project.title}</CardTitle></CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Title</FieldLabel><Input value={project.title} onChange={(event) => update(["projects", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Link</FieldLabel><Input value={project.href ?? ""} onChange={(event) => update(["projects", index, "href"], event.target.value)} /></Field>
                      <Field><FieldLabel>Image alt SEO</FieldLabel><Input value={project.imageAlt ?? ""} onChange={(event) => update(["projects", index, "imageAlt"], event.target.value)} /></Field>
                      <Field>
                        <FieldLabel>Category</FieldLabel>
                        <NativeSelect
                          className="w-full"
                          value={project.filter}
                          onChange={(event) => {
                            update(["projects", index, "filter"], event.target.value);
                            update(["projects", index, "category"], event.target.value);
                          }}
                        >
                          {categoryOptions.map((category) => (
                            <NativeSelectOption key={category} value={category}>{category}</NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </Field>
                      {imageInput(["projects", index, "image"], project.image)}
                      <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }))}>
                        <TrashIcon data-icon="inline-start" />
                        Remove
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => {
                const category = current.tabs.find((tab) => tab !== "All") ?? "All";
                return { ...current, projects: [...current.projects, { title: "New project", category, filter: category, image: "", imageAlt: "", href: "" }] };
              })}>
                <PlusIcon data-icon="inline-start" />
                Add project
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="json">
          <SectionCard title="Full JSON" description="Power edit. Keep valid JSON.">
            <Field>
              <FieldLabel>Portfolio content</FieldLabel>
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
