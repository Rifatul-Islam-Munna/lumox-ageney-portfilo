"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { saveServicesCms } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { ServicesContent } from "@/lib/cms-types";

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

export function ServicesCmsForm({ initialContent }: { initialContent: ServicesContent }) {
  const [content, setContent] = useState<ServicesContent>(() => clone(initialContent));
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
        await saveServicesCms(content);
        toast.success("Services CMS saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  function imageInput(path: Array<string | number>, value: string, label = "Image URL") {
    return (
      <Field>
        <FieldLabel>{label} (recommended 1600x1000px)</FieldLabel>
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
          <h1 className="text-2xl font-semibold">Services CMS</h1>
          <p className="text-sm text-muted-foreground">Hero, steps, service blocks, video, people, review, booking.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="feature">Feature</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <SectionCard title="Hero" description="Top page banner.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.hero.title} onChange={(event) => update(["hero", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Subtitle</FieldLabel><Input value={content.hero.sub ?? ""} onChange={(event) => update(["hero", "sub"], event.target.value)} /></Field>
              {imageInput(["hero", "image"], content.hero.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="feature">
          <SectionCard title="Top feature" description="Large intro service block below hero.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.feature.title} onChange={(event) => update(["feature", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Subtitle</FieldLabel><Input value={content.feature.sub ?? ""} onChange={(event) => update(["feature", "sub"], event.target.value)} /></Field>
              <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={content.feature.body ?? ""} onChange={(value) => update(["feature", "body"], value)} /></Field>
              {imageInput(["feature", "image"], content.feature.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="steps">
          <SectionCard title="Steps" description="Admin can edit all process steps.">
            <FieldGroup>
              {content.steps.map((step, index) => (
                <Card key={index} size="sm">
                  <CardHeader><CardTitle>{step.number}. {step.title}</CardTitle></CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Number</FieldLabel><Input value={step.number} onChange={(event) => update(["steps", index, "number"], event.target.value)} /></Field>
                      <Field><FieldLabel>Eyebrow</FieldLabel><Input value={step.eyebrow} onChange={(event) => update(["steps", index, "eyebrow"], event.target.value)} /></Field>
                      <Field><FieldLabel>Title</FieldLabel><Input value={step.title} onChange={(event) => update(["steps", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={step.body} onChange={(value) => update(["steps", index, "body"], value)} /></Field>
                      <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, steps: current.steps.filter((_, i) => i !== index) }))}>
                        <TrashIcon data-icon="inline-start" />
                        Remove
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, steps: [...current.steps, { number: String(current.steps.length + 1), eyebrow: "Next step", title: "New step", body: "Description" }] }))}>
                <PlusIcon data-icon="inline-start" />
                Add step
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="services">
          <SectionCard title="Service blocks" description="Add as many service bands as needed.">
            <FieldGroup>
              {content.services.map((service, index) => (
                <Card key={index} size="sm">
                  <CardHeader><CardTitle>{service.title}</CardTitle></CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Title</FieldLabel><Input value={service.title} onChange={(event) => update(["services", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Subtitle</FieldLabel><Input value={service.sub ?? ""} onChange={(event) => update(["services", index, "sub"], event.target.value)} /></Field>
                      <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={service.body ?? ""} onChange={(value) => update(["services", index, "body"], value)} /></Field>
                      {imageInput(["services", index, "image"], service.image)}
                      {imageInput(["services", index, "backdrop"], service.backdrop ?? "", "Text background URL")}
                      <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, services: current.services.filter((_, i) => i !== index) }))}>
                        <TrashIcon data-icon="inline-start" />
                        Remove
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, services: [...current.services, { title: "New service", sub: "Subtitle", body: "Description", image: "", backdrop: "" }] }))}>
                <PlusIcon data-icon="inline-start" />
                Add service
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="video">
          <SectionCard title="Video" description="Use YouTube embed URL.">
            <Field>
              <FieldLabel>Video embed URL</FieldLabel>
              <Input value={content.videoUrl} onChange={(event) => update(["videoUrl"], event.target.value)} />
            </Field>
          </SectionCard>
        </TabsContent>

        <TabsContent value="people">
          <SectionCard title="Photographers" description="People strip.">
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

        <TabsContent value="review">
          <SectionCard title="Testimonial" description="Review area.">
            <FieldGroup>
              <Field><FieldLabel>Quote</FieldLabel><Textarea value={content.testimonial.quote} onChange={(event) => update(["testimonial", "quote"], event.target.value)} /></Field>
              <Field><FieldLabel>Name</FieldLabel><Input value={content.testimonial.name} onChange={(event) => update(["testimonial", "name"], event.target.value)} /></Field>
              <Field><FieldLabel>Company</FieldLabel><Input value={content.testimonial.company} onChange={(event) => update(["testimonial", "company"], event.target.value)} /></Field>
              {imageInput(["testimonial", "image"], content.testimonial.image)}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="booking">
          <SectionCard title="Booking box" description="Yellow contact box.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={content.booking.title} onChange={(event) => update(["booking", "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Body</FieldLabel><Textarea value={content.booking.body} onChange={(event) => update(["booking", "body"], event.target.value)} /></Field>
              <Field><FieldLabel>Phone</FieldLabel><Input value={content.booking.phone} onChange={(event) => update(["booking", "phone"], event.target.value)} /></Field>
              <Field><FieldLabel>Email</FieldLabel><Input value={content.booking.email} onChange={(event) => update(["booking", "email"], event.target.value)} /></Field>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="json">
          <SectionCard title="Full JSON" description="Power edit. Keep valid JSON.">
            <Field>
              <FieldLabel>Services content</FieldLabel>
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
