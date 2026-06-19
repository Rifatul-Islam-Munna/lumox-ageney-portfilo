"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { saveDynamicServicesCms } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { DynamicServiceContent, DynamicServicePage } from "@/lib/cms-types";
import { defaultDynamicServicesContent } from "@/lib/dynamic-services-defaults";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function withDefaults(value: DynamicServiceContent): DynamicServiceContent {
  const fallback = defaultDynamicServicesContent.services[0];
  return {
    ...clone(defaultDynamicServicesContent),
    ...clone(value),
    services: value.services?.length
      ? value.services.map((service) => ({
          ...clone(fallback),
          ...service,
          bullets: service.bullets?.length ? service.bullets : fallback.bullets,
          downloads: service.downloads?.length ? service.downloads : fallback.downloads,
          faqs: service.faqs?.length ? service.faqs : fallback.faqs,
          sectionVisibility: {
            ...fallback.sectionVisibility,
            ...service.sectionVisibility,
          },
          processSteps: service.processSteps?.length ? service.processSteps : fallback.processSteps,
          extraSections: service.extraSections?.length
            ? service.extraSections.map((section) => ({ ...fallback.extraSections?.[0], ...section }))
            : fallback.extraSections,
        }))
      : defaultDynamicServicesContent.services,
  };
}

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return String(data.url);
}

function newService(): DynamicServicePage {
  return {
    ...clone(defaultDynamicServicesContent.services[0]),
    slug: "new-service",
    title: "New Service",
    navLabel: "New Service",
    published: true,
  };
}

export function DynamicServicesCmsForm({ initialContent }: { initialContent: DynamicServiceContent }) {
  const [content, setContent] = useState<DynamicServiceContent>(() => withDefaults(initialContent));
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

  function imageInput(path: Array<string | number>, value: string, label = "Image URL") {
    return (
      <Field>
        <FieldLabel>{label}</FieldLabel>
        <div className="flex gap-2">
          <Input value={value} onChange={(event) => update(path, event.target.value)} />
          <label className="inline-flex">
            <Button asChild size="icon" type="button" variant="outline">
              <span>
                <UploadIcon data-icon="inline-start" />
                <input
                  className="sr-only"
                  type="file"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      update(path, await uploadFile(file));
                      toast.success("File uploaded");
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

  function save() {
    startTransition(async () => {
      try {
        const normalized = {
          services: content.services.map((service) => ({
            ...service,
            slug: slugify(service.slug || service.title),
          })),
        };
        await saveDynamicServicesCms(normalized);
        setContent(normalized);
        toast.success("Dynamic services saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dynamic Services</h1>
          <p className="text-sm text-muted-foreground">Create, edit, remove, publish, and control service detail pages.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="service-0">
        <TabsList>
          {content.services.map((service, index) => (
            <TabsTrigger key={`${service.slug}-${index}`} value={`service-${index}`}>
              {service.navLabel || service.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {content.services.map((service, index) => (
          <TabsContent key={`${service.slug}-${index}`} value={`service-${index}`}>
            <Card>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{`/services/${service.slug}`}</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field><FieldLabel>Title</FieldLabel><Input value={service.title} onChange={(event) => update(["services", index, "title"], event.target.value)} /></Field>
                    <Field><FieldLabel>Slug</FieldLabel><Input value={service.slug} onChange={(event) => update(["services", index, "slug"], slugify(event.target.value))} /></Field>
                    <Field><FieldLabel>Navbar label</FieldLabel><Input value={service.navLabel} onChange={(event) => update(["services", index, "navLabel"], event.target.value)} /></Field>
                    <Field className="flex-row items-center justify-between rounded-lg border p-3"><FieldLabel>Published</FieldLabel><Switch checked={service.published} onCheckedChange={(value) => update(["services", index, "published"], value)} /></Field>
                  </div>
                  <Field><FieldLabel>Excerpt</FieldLabel><Textarea value={service.excerpt} onChange={(event) => update(["services", index, "excerpt"], event.target.value)} /></Field>
                  {imageInput(["services", index, "heroImage"], service.heroImage, "Hero image URL")}
                  {imageInput(["services", index, "mainImage"], service.mainImage, "Main image URL")}
                  <Field><FieldLabel>Main image alt SEO</FieldLabel><Input value={service.mainImageAlt ?? ""} onChange={(event) => update(["services", index, "mainImageAlt"], event.target.value)} /></Field>
                  <Field><FieldLabel>Main content</FieldLabel><RichTextEditor value={service.body} onChange={(value) => update(["services", index, "body"], value)} /></Field>

                  <Card size="sm">
                    <CardHeader><CardTitle>Section visibility</CardTitle><CardDescription>Turn public page blocks on or off.</CardDescription></CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-3">
                        {(["overview", "valueCards", "process", "downloads", "faqs", "contact"] as const).map((key) => (
                          <Field className="flex-row items-center justify-between rounded-lg border p-3" key={key}>
                            <FieldLabel>{key}</FieldLabel>
                            <Switch
                              checked={service.sectionVisibility?.[key] ?? true}
                              onCheckedChange={(value) => update(["services", index, "sectionVisibility", key], value)}
                            />
                          </Field>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field><FieldLabel>Why choose title</FieldLabel><Input value={service.chooseTitle} onChange={(event) => update(["services", index, "chooseTitle"], event.target.value)} /></Field>
                    <Field><FieldLabel>Feature title</FieldLabel><Input value={service.featureTitle} onChange={(event) => update(["services", index, "featureTitle"], event.target.value)} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field><FieldLabel>Why choose body</FieldLabel><Textarea value={service.chooseBody} onChange={(event) => update(["services", index, "chooseBody"], event.target.value)} /></Field>
                    <Field><FieldLabel>Feature body</FieldLabel><Textarea value={service.featureBody} onChange={(event) => update(["services", index, "featureBody"], event.target.value)} /></Field>
                  </div>

                  <Card size="sm">
                    <CardHeader><CardTitle>Bullets</CardTitle></CardHeader>
                    <CardContent>
                      <FieldGroup>
                        {service.bullets.map((bullet, bulletIndex) => (
                          <div className="flex gap-2" key={bulletIndex}>
                            <Input value={bullet} onChange={(event) => update(["services", index, "bullets", bulletIndex], event.target.value)} />
                            <Button type="button" variant="destructive" onClick={() => update(["services", index, "bullets"], service.bullets.filter((_, i) => i !== bulletIndex))}><TrashIcon /></Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => update(["services", index, "bullets"], [...service.bullets, "New bullet"])}><PlusIcon data-icon="inline-start" />Add bullet</Button>
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  <Card size="sm">
                    <CardHeader><CardTitle>Downloads</CardTitle><CardDescription>Upload files or paste URLs.</CardDescription></CardHeader>
                    <CardContent>
                      <FieldGroup>
                        {service.downloads.map((download, downloadIndex) => (
                          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" key={downloadIndex}>
                            <Input value={download.label} onChange={(event) => update(["services", index, "downloads", downloadIndex, "label"], event.target.value)} />
                            {imageInput(["services", index, "downloads", downloadIndex, "url"], download.url, "File/link")}
                            <Button type="button" variant="destructive" onClick={() => update(["services", index, "downloads"], service.downloads.filter((_, i) => i !== downloadIndex))}><TrashIcon /></Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => update(["services", index, "downloads"], [...service.downloads, { label: "New download", url: "" }])}><PlusIcon data-icon="inline-start" />Add download</Button>
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  <Card size="sm">
                    <CardHeader><CardTitle>Process steps</CardTitle><CardDescription>Shown when Process is enabled.</CardDescription></CardHeader>
                    <CardContent>
                      <FieldGroup>
                        {(service.processSteps ?? []).map((step, stepIndex) => (
                          <Card key={stepIndex} size="sm">
                            <CardContent>
                              <FieldGroup>
                                <Field><FieldLabel>Title</FieldLabel><Input value={step.title} onChange={(event) => update(["services", index, "processSteps", stepIndex, "title"], event.target.value)} /></Field>
                                <Field><FieldLabel>Body</FieldLabel><Textarea value={step.body} onChange={(event) => update(["services", index, "processSteps", stepIndex, "body"], event.target.value)} /></Field>
                                <Button type="button" variant="destructive" onClick={() => update(["services", index, "processSteps"], (service.processSteps ?? []).filter((_, i) => i !== stepIndex))}><TrashIcon data-icon="inline-start" />Remove step</Button>
                              </FieldGroup>
                            </CardContent>
                          </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={() => update(["services", index, "processSteps"], [...(service.processSteps ?? []), { title: "New step", body: "Step details" }])}><PlusIcon data-icon="inline-start" />Add step</Button>
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  <Card size="sm">
                    <CardHeader><CardTitle>Extra dynamic sections</CardTitle><CardDescription>Add service-specific content blocks.</CardDescription></CardHeader>
                    <CardContent>
                      <FieldGroup>
                        {(service.extraSections ?? []).map((section, sectionIndex) => (
                          <Card key={sectionIndex} size="sm">
                            <CardContent>
                              <FieldGroup>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <Field><FieldLabel>Eyebrow</FieldLabel><Input value={section.eyebrow} onChange={(event) => update(["services", index, "extraSections", sectionIndex, "eyebrow"], event.target.value)} /></Field>
                                  <Field><FieldLabel>Title</FieldLabel><Input value={section.title} onChange={(event) => update(["services", index, "extraSections", sectionIndex, "title"], event.target.value)} /></Field>
                                  <Field className="flex-row items-center justify-between rounded-lg border p-3"><FieldLabel>Enabled</FieldLabel><Switch checked={section.enabled} onCheckedChange={(value) => update(["services", index, "extraSections", sectionIndex, "enabled"], value)} /></Field>
                                  <Field>
                                    <FieldLabel>Image position</FieldLabel>
                                    <select className="h-10 rounded-md border bg-background px-3 text-sm" value={section.imagePosition} onChange={(event) => update(["services", index, "extraSections", sectionIndex, "imagePosition"], event.target.value)}>
                                      <option value="left">Left</option>
                                      <option value="right">Right</option>
                                    </select>
                                  </Field>
                                </div>
                                <Field><FieldLabel>Body</FieldLabel><RichTextEditor value={section.body} onChange={(value) => update(["services", index, "extraSections", sectionIndex, "body"], value)} /></Field>
                                {imageInput(["services", index, "extraSections", sectionIndex, "image"], section.image ?? "", "Section image URL")}
                                <Field><FieldLabel>Image alt SEO</FieldLabel><Input value={section.imageAlt ?? ""} onChange={(event) => update(["services", index, "extraSections", sectionIndex, "imageAlt"], event.target.value)} /></Field>
                                <Button type="button" variant="destructive" onClick={() => update(["services", index, "extraSections"], (service.extraSections ?? []).filter((_, i) => i !== sectionIndex))}><TrashIcon data-icon="inline-start" />Remove section</Button>
                              </FieldGroup>
                            </CardContent>
                          </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={() => update(["services", index, "extraSections"], [...(service.extraSections ?? []), { enabled: true, eyebrow: "New section", title: "Section title", body: "<p>Section content</p>", image: "", imageAlt: "", imagePosition: "right" }])}><PlusIcon data-icon="inline-start" />Add section</Button>
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  <Card size="sm">
                    <CardHeader><CardTitle>FAQs</CardTitle></CardHeader>
                    <CardContent>
                      <FieldGroup>
                        {service.faqs.map((faq, faqIndex) => (
                          <Card key={faqIndex} size="sm">
                            <CardContent>
                              <FieldGroup>
                                <Field><FieldLabel>Question</FieldLabel><Input value={faq.question} onChange={(event) => update(["services", index, "faqs", faqIndex, "question"], event.target.value)} /></Field>
                                <Field><FieldLabel>Answer</FieldLabel><Textarea value={faq.answer} onChange={(event) => update(["services", index, "faqs", faqIndex, "answer"], event.target.value)} /></Field>
                                <Button type="button" variant="destructive" onClick={() => update(["services", index, "faqs"], service.faqs.filter((_, i) => i !== faqIndex))}><TrashIcon data-icon="inline-start" />Remove FAQ</Button>
                              </FieldGroup>
                            </CardContent>
                          </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={() => update(["services", index, "faqs"], [...service.faqs, { question: "New question", answer: "Answer" }])}><PlusIcon data-icon="inline-start" />Add FAQ</Button>
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field><FieldLabel>Contact title</FieldLabel><Input value={service.contactTitle} onChange={(event) => update(["services", index, "contactTitle"], event.target.value)} /></Field>
                    <Field><FieldLabel>Contact phone</FieldLabel><Input value={service.contactPhone} onChange={(event) => update(["services", index, "contactPhone"], event.target.value)} /></Field>
                    <Field><FieldLabel>Contact email</FieldLabel><Input value={service.contactEmail} onChange={(event) => update(["services", index, "contactEmail"], event.target.value)} /></Field>
                    <Field><FieldLabel>Contact button text</FieldLabel><Input value={service.contactCtaText} onChange={(event) => update(["services", index, "contactCtaText"], event.target.value)} /></Field>
                    <Field><FieldLabel>Contact button link</FieldLabel><Input value={service.contactCtaHref} onChange={(event) => update(["services", index, "contactCtaHref"], event.target.value)} /></Field>
                  </div>

                  <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ services: current.services.filter((_, i) => i !== index) }))}>
                    <TrashIcon data-icon="inline-start" />
                    Remove whole service page
                  </Button>
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Button type="button" variant="outline" onClick={() => setContent((current) => ({ services: [...current.services, newService()] }))}>
        <PlusIcon data-icon="inline-start" />
        Add service page
      </Button>
    </div>
  );
}
