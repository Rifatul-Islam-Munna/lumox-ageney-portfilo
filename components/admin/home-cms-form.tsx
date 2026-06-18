"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon, UploadIcon } from "lucide-react";
import { saveHomeCms } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { HomeContent } from "@/lib/cms-types";
import { defaultHomeContent } from "@/lib/home-defaults";

const socialIconOptions = ["facebook", "twitter", "linkedin", "instagram", "pinterest", "youtube"] as const;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function withDefaults(value: HomeContent): HomeContent {
  const normalizedWorks = (value.works ?? defaultHomeContent.works).map((work) =>
    typeof work === "string" ? { image: work, imageAlt: "", title: "", href: "" } : work,
  );

  return {
    ...clone(defaultHomeContent),
    ...clone(value),
    works: normalizedWorks,
    site: {
      ...defaultHomeContent.site!,
      ...value.site,
      socialLinks: value.site?.socialLinks?.length ? value.site.socialLinks : defaultHomeContent.site!.socialLinks,
    },
    copy: {
      ...defaultHomeContent.copy!,
      ...value.copy,
    },
  };
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

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return String(data.url);
}

export function HomeCmsForm({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState<HomeContent>(() => withDefaults(initialContent));
  const [pending, startTransition] = useTransition();
  const copy = content.copy ?? defaultHomeContent.copy!;
  const site = content.site ?? defaultHomeContent.site!;

  function update(path: Array<string | number>, value: unknown) {
    setContent((current) => {
      const next = clone(current);
      let target: any = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      return next;
    });
  }

  function save() {
    startTransition(async () => {
      try {
        await saveHomeCms(content);
        toast.success("Home CMS saved");
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
                className="sr-only"
                type="file"
                accept="image/*"
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
          <h1 className="text-2xl font-semibold">Home CMS</h1>
          <p className="text-sm text-muted-foreground">Every home text/image lives here. Upload image or paste URL.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="works">Works</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="nav">Nav/Footer</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <SectionCard title="Hero slider" description="Add unlimited slides. CTA link supports anchors or pages.">
            <FieldGroup>
              {content.heroSlides.map((slide, index) => (
                <Card key={index} size="sm">
                  <CardHeader>
                    <CardTitle>Slide {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Eyebrow</FieldLabel>
                        <Input value={slide.eyebrow} onChange={(event) => update(["heroSlides", index, "eyebrow"], event.target.value)} />
                      </Field>
                      <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input value={slide.title} onChange={(event) => update(["heroSlides", index, "title"], event.target.value)} />
                      </Field>
                      <Field>
                        <FieldLabel>Description</FieldLabel>
                        <RichTextEditor value={slide.body ?? ""} onChange={(value) => update(["heroSlides", index, "body"], value)} />
                      </Field>
                      <Field>
                        <FieldLabel>CTA text</FieldLabel>
                        <Input value={slide.cta ?? ""} onChange={(event) => update(["heroSlides", index, "cta"], event.target.value)} />
                      </Field>
                      <Field>
                        <FieldLabel>CTA link</FieldLabel>
                        <Input value={slide.href ?? ""} onChange={(event) => update(["heroSlides", index, "href"], event.target.value)} />
                      </Field>
                      {imageInput(["heroSlides", index, "image"], slide.image)}
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setContent((current) => ({ ...current, heroSlides: current.heroSlides.filter((_, i) => i !== index) }))}
                      >
                        <TrashIcon data-icon="inline-start" />
                        Remove slide
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    heroSlides: [
                      ...current.heroSlides,
                      { eyebrow: "New slide", title: "Title", body: "Description", cta: "Learn more", href: "#", image: "" },
                    ],
                  }))
                }
              >
                <PlusIcon data-icon="inline-start" />
                Add slide
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="about">
          <SectionCard title="About copy" description="All about section text. Rich fields keep bold, italic, lists, and new lines.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Textarea value={copy.aboutTitle} onChange={(event) => update(["copy", "aboutTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Left description</FieldLabel><RichTextEditor value={copy.aboutBodyLeft} onChange={(value) => update(["copy", "aboutBodyLeft"], value)} /></Field>
              <Field><FieldLabel>Right description</FieldLabel><RichTextEditor value={copy.aboutBodyRight} onChange={(value) => update(["copy", "aboutBodyRight"], value)} /></Field>
              <Field><FieldLabel>Button text</FieldLabel><Input value={copy.aboutCtaText} onChange={(event) => update(["copy", "aboutCtaText"], event.target.value)} /></Field>
              <Field><FieldLabel>Button link</FieldLabel><Input value={copy.aboutCtaHref} onChange={(event) => update(["copy", "aboutCtaHref"], event.target.value)} /></Field>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="services">
          <SectionCard title="Service bands" description="Controls service blocks on home.">
            <FieldGroup>
              <Field><FieldLabel>Side label</FieldLabel><Input value={copy.servicesSideLabel} onChange={(event) => update(["copy", "servicesSideLabel"], event.target.value)} /></Field>
              <Field><FieldLabel>Service button text</FieldLabel><Input value={copy.serviceCtaText} onChange={(event) => update(["copy", "serviceCtaText"], event.target.value)} /></Field>
              <Field><FieldLabel>Service button link</FieldLabel><Input value={copy.serviceCtaHref} onChange={(event) => update(["copy", "serviceCtaHref"], event.target.value)} /></Field>
              {content.services.map((service, index) => (
                <Card key={index} size="sm">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Title</FieldLabel><Input value={service.title} onChange={(event) => update(["services", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Ghost text</FieldLabel><Input value={service.ghost} onChange={(event) => update(["services", index, "ghost"], event.target.value)} /></Field>
                      <Field><FieldLabel>Subtitle</FieldLabel><Input value={service.sub ?? ""} onChange={(event) => update(["services", index, "sub"], event.target.value)} /></Field>
                      <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={service.body ?? ""} onChange={(value) => update(["services", index, "body"], value)} /></Field>
                      {imageInput(["services", index, "image"], service.image)}
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="works">
          <SectionCard title="Works section" description="Works header and image list.">
            <FieldGroup>
              <Field><FieldLabel>Title</FieldLabel><Input value={copy.worksTitle} onChange={(event) => update(["copy", "worksTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={copy.worksBody} onChange={(value) => update(["copy", "worksBody"], value)} /></Field>
              <Field><FieldLabel>Button text</FieldLabel><Input value={copy.worksCtaText} onChange={(event) => update(["copy", "worksCtaText"], event.target.value)} /></Field>
              <Field><FieldLabel>Button link</FieldLabel><Input value={copy.worksCtaHref} onChange={(event) => update(["copy", "worksCtaHref"], event.target.value)} /></Field>
              <Field><FieldLabel>Load more text</FieldLabel><Input value={copy.worksLoadMoreText} onChange={(event) => update(["copy", "worksLoadMoreText"], event.target.value)} /></Field>
              <Field>
                <FieldLabel>Works</FieldLabel>
                <FieldGroup>
                  {content.works.map((work, index) => (
                    <Card key={index} size="sm">
                      <CardContent>
                        <FieldGroup>
                          <Field><FieldLabel>Title</FieldLabel><Input value={work.title ?? ""} onChange={(event) => update(["works", index, "title"], event.target.value)} /></Field>
                          <Field><FieldLabel>Link</FieldLabel><Input value={work.href ?? ""} onChange={(event) => update(["works", index, "href"], event.target.value)} /></Field>
                          <Field><FieldLabel>Image alt SEO</FieldLabel><Input value={work.imageAlt ?? ""} onChange={(event) => update(["works", index, "imageAlt"], event.target.value)} /></Field>
                          {imageInput(["works", index, "image"], work.image)}
                          <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, works: current.works.filter((_, i) => i !== index) }))}>
                            <TrashIcon data-icon="inline-start" />
                            Remove work
                          </Button>
                        </FieldGroup>
                      </CardContent>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, works: [...current.works, { image: "", imageAlt: "", title: "New work", href: "/portfolio" }] }))}>
                    <PlusIcon data-icon="inline-start" />
                    Add work
                  </Button>
                </FieldGroup>
              </Field>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="people">
          <SectionCard title="Photographers" description="Names and images for people cards.">
            <FieldGroup>
              <Field><FieldLabel>Section title</FieldLabel><Input value={copy.photographersTitle} onChange={(event) => update(["copy", "photographersTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Section subtitle</FieldLabel><Input value={copy.photographersSubtitle} onChange={(event) => update(["copy", "photographersSubtitle"], event.target.value)} /></Field>
              {content.photographers.map((person, index) => (
                <Card key={index} size="sm">
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Name</FieldLabel><Input value={person.name} onChange={(event) => update(["photographers", index, "name"], event.target.value)} /></Field>
                      {imageInput(["photographers", index, "image"], person.image)}
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="sections">
          <SectionCard title="Facilities and blog" description="Facilities live here. Home blog cards come from Blog CMS newest first.">
            <FieldGroup>
              <Field><FieldLabel>Facilities title</FieldLabel><Input value={copy.facilitiesTitle} onChange={(event) => update(["copy", "facilitiesTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Facilities subtitle</FieldLabel><Input value={copy.facilitiesSubtitle} onChange={(event) => update(["copy", "facilitiesSubtitle"], event.target.value)} /></Field>
              {content.facilities.map((item, index) => (
                <Card key={index} size="sm">
                  <CardHeader><CardTitle>Facility {index + 1}</CardTitle></CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field><FieldLabel>Title</FieldLabel><Input value={item.title} onChange={(event) => update(["facilities", index, "title"], event.target.value)} /></Field>
                      <Field><FieldLabel>Description</FieldLabel><RichTextEditor value={item.body ?? ""} onChange={(value) => update(["facilities", index, "body"], value)} /></Field>
                      {imageInput(["facilities", index, "image"], item.image)}
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Field><FieldLabel>Blog title</FieldLabel><Input value={copy.blogTitle} onChange={(event) => update(["copy", "blogTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Blog subtitle</FieldLabel><Input value={copy.blogSubtitle} onChange={(event) => update(["copy", "blogSubtitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Blog button text</FieldLabel><Input value={copy.blogCtaText} onChange={(event) => update(["copy", "blogCtaText"], event.target.value)} /></Field>
              <Field><FieldLabel>Blog button link</FieldLabel><Input value={copy.blogCtaHref} onChange={(event) => update(["copy", "blogCtaHref"], event.target.value)} /></Field>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="contact">
          <SectionCard title="Contact and footer" description="Contact, map, and footer copy.">
            <FieldGroup>
              <Field><FieldLabel>Contact title</FieldLabel><Input value={copy.contactTitle} onChange={(event) => update(["copy", "contactTitle"], event.target.value)} /></Field>
              <Field><FieldLabel>Address</FieldLabel><RichTextEditor value={copy.contactAddress} onChange={(value) => update(["copy", "contactAddress"], value)} /></Field>
              <Field><FieldLabel>Phone</FieldLabel><Input value={copy.contactPhone} onChange={(event) => update(["copy", "contactPhone"], event.target.value)} /></Field>
              <Field><FieldLabel>Email</FieldLabel><Input value={copy.contactEmail} onChange={(event) => update(["copy", "contactEmail"], event.target.value)} /></Field>
              <Field><FieldLabel>Button text</FieldLabel><Input value={copy.contactCtaText} onChange={(event) => update(["copy", "contactCtaText"], event.target.value)} /></Field>
              <Field><FieldLabel>Button link</FieldLabel><Input value={copy.contactCtaHref} onChange={(event) => update(["copy", "contactCtaHref"], event.target.value)} /></Field>
              <Field><FieldLabel>Map embed URL</FieldLabel><Input value={copy.mapSrc} onChange={(event) => update(["copy", "mapSrc"], event.target.value)} /></Field>
              <Field><FieldLabel>Footer copyright</FieldLabel><Input value={copy.footerCopyright} onChange={(event) => update(["copy", "footerCopyright"], event.target.value)} /></Field>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="nav">
          <SectionCard title="Navbar and footer" description="Logo name, header phone/email, and editable footer social icon links.">
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Logo text</FieldLabel><Input value={site.logoText} onChange={(event) => update(["site", "logoText"], event.target.value)} /></Field>
                <Field><FieldLabel>Logo accent</FieldLabel><Input value={site.logoAccent} onChange={(event) => update(["site", "logoAccent"], event.target.value)} /></Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Navbar phone</FieldLabel><Input value={site.phone} onChange={(event) => update(["site", "phone"], event.target.value)} /></Field>
                <Field><FieldLabel>Navbar email</FieldLabel><Input value={site.email} onChange={(event) => update(["site", "email"], event.target.value)} /></Field>
              </div>
              {site.socialLinks.map((item, index) => (
                <Card key={`${item.label}-${index}`} size="sm">
                  <CardContent>
                    <FieldGroup>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Field><FieldLabel>Label</FieldLabel><Input value={item.label} onChange={(event) => update(["site", "socialLinks", index, "label"], event.target.value)} /></Field>
                        <Field>
                          <FieldLabel>Icon</FieldLabel>
                          <NativeSelect value={item.icon} onChange={(event) => update(["site", "socialLinks", index, "icon"], event.target.value)}>
                            {socialIconOptions.map((icon) => (
                              <NativeSelectOption key={icon} value={icon}>{icon}</NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </Field>
                        <Field><FieldLabel>Link</FieldLabel><Input value={item.href} onChange={(event) => update(["site", "socialLinks", index, "href"], event.target.value)} /></Field>
                      </div>
                      <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, site: { ...(current.site ?? defaultHomeContent.site!), socialLinks: (current.site?.socialLinks ?? []).filter((_, i) => i !== index) } }))}>
                        <TrashIcon data-icon="inline-start" />
                        Remove link
                      </Button>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, site: { ...(current.site ?? defaultHomeContent.site!), socialLinks: [...(current.site?.socialLinks ?? []), { label: "New link", href: "#", icon: "instagram" as const }] } }))}>
                <PlusIcon data-icon="inline-start" />
                Add social link
              </Button>
            </FieldGroup>
          </SectionCard>
        </TabsContent>

        <TabsContent value="json">
          <SectionCard title="Full JSON" description="Power edit. Keep valid JSON.">
            <Field>
              <FieldLabel>Home content</FieldLabel>
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
