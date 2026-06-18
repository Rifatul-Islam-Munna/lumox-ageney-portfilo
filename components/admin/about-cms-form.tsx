"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { saveAboutCms } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { AboutContent } from "@/lib/cms-types";

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

export function AboutCmsForm({ initialContent }: { initialContent: AboutContent }) {
  const [content, setContent] = useState<AboutContent>(() => clone(initialContent));
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
        await saveAboutCms(content);
        toast.success("About CMS saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  function imageInput(path: Array<string | number>, value: string) {
    return (
      <Field>
        <FieldLabel>Image URL (recommended 1600x1000px)</FieldLabel>
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
          <h1 className="text-2xl font-semibold">About CMS</h1>
          <p className="text-sm text-muted-foreground">Full about page text, images, stats, people.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="intro">Intro</TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="testimonial">Review</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <SectionCard title="Hero" description="Top about page banner.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.hero.title} onChange={(event) => update(["hero", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Subtitle</FieldLabel><Input value={content.hero.sub ?? ""} onChange={(event) => update(["hero", "sub"], event.target.value)} /></Field>
              {imageInput(["hero", "image"], content.hero.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="intro">
          <SectionCard title="Intro block" description="First image/text section.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Textarea value={content.intro.title} onChange={(event) => update(["intro", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Badge</FieldLabel><Input value={content.intro.badge} onChange={(event) => update(["intro", "badge"], event.target.value)} /></Field>
              <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={content.intro.body} onChange={(value) => update(["intro", "body"], value)} /></Field>
              {imageInput(["intro", "image"], content.intro.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="story">
          <SectionCard title="Story block" description="Second image/text section.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Textarea value={content.story.title} onChange={(event) => update(["story", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Badge</FieldLabel><Input value={content.story.badge} onChange={(event) => update(["story", "badge"], event.target.value)} /></Field>
              <Field>
                <FieldLabel>Bullet points, one per line</FieldLabel>
                <Textarea value={content.story.points.join("\n")} onChange={(event) => update(["story", "points"], event.target.value.split("\n").filter(Boolean))} />
              </Field>
              {imageInput(["story", "image"], content.story.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="stats">
          <SectionCard title="Stats" description="Black counter band.">
            <FieldGroup>
              {content.stats.map((item, index) => (
                <Card key={index} size="sm">
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Value</FieldLabel><Input value={item.value} onChange={(event) => update(["stats", index, "value"], event.target.value)} /></Field>
                      <Field><FieldLabel>Label</FieldLabel><Input value={item.label} onChange={(event) => update(["stats", index, "label"], event.target.value)} /></Field>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="testimonial">
          <SectionCard title="Testimonial" description="Quote area.">
            <FieldGroup>
              <Field><FieldLabel>Quote</FieldLabel><Textarea value={content.testimonial.quote} onChange={(event) => update(["testimonial", "quote"], event.target.value)} /></Field>
              <Field><FieldLabel>Name</FieldLabel><Input value={content.testimonial.name} onChange={(event) => update(["testimonial", "name"], event.target.value)} /></Field>
              <Field><FieldLabel>Company</FieldLabel><Input value={content.testimonial.company} onChange={(event) => update(["testimonial", "company"], event.target.value)} /></Field>
              {imageInput(["testimonial", "image"], content.testimonial.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="features">
          <SectionCard title="Features" description="Icon info row.">
            <FieldGroup>
              {content.features.map((item, index) => (
                <Card key={index} size="sm">
                  <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Title</FieldLabel><Input value={item.title} onChange={(event) => update(["features", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Body</FieldLabel><RichTextEditor value={item.body} onChange={(value) => update(["features", index, "body"], value)} /></Field>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="people">
          <SectionCard title="Photographers" description="Add/remove people cards.">
            <FieldGroup>
              {content.photographers.map((person, index) => (
                <Card key={index} size="sm">
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Name</FieldLabel><Input value={person.name} onChange={(event) => update(["photographers", index, "name"], event.target.value)} /></Field>
                      {imageInput(["photographers", index, "image"], person.image)}
                      <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, photographers: current.photographers.filter((_, i) => i !== index) }))}>
                        <TrashIcon data-icon="inline-start" />
                        Remove
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, photographers: [...current.photographers, { name: "New photographer", image: "" }] }))}>
                <PlusIcon data-icon="inline-start" />
                Add photographer
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="json">
          <SectionCard title="Full JSON" description="Power edit. Keep valid JSON.">
            <Field>
              <FieldLabel>About content</FieldLabel>
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
