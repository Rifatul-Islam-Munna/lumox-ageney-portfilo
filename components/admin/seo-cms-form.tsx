"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusIcon, SaveIcon, TrashIcon } from "lucide-react";
import { saveSeoCms } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { defaultSeoContent } from "@/lib/seo-defaults";
import type { SeoContent } from "@/lib/cms-types";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function withDefaults(value: SeoContent): SeoContent {
  return {
    ...clone(defaultSeoContent),
    ...clone(value),
    entries: value.entries?.length ? value.entries : defaultSeoContent.entries,
  };
}

export function SeoCmsForm({ initialContent }: { initialContent: SeoContent }) {
  const [content, setContent] = useState<SeoContent>(() => withDefaults(initialContent));
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
        await saveSeoCms(content);
        toast.success("SEO CMS saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Save failed");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">SEO CMS</h1>
          <p className="text-sm text-muted-foreground">Page metadata, social share cards, image alt defaults, robots, and JSON-LD.</p>
        </div>
        <Button disabled={pending} onClick={save}>
          <SaveIcon data-icon="inline-start" />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site defaults</CardTitle>
          <CardDescription>Used when a page has no exact SEO row.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field><FieldLabel>Site name</FieldLabel><Input value={content.siteName} onChange={(event) => update(["siteName"], event.target.value)} /></Field>
            <Field><FieldLabel>Default title</FieldLabel><Input value={content.defaultTitle} onChange={(event) => update(["defaultTitle"], event.target.value)} /></Field>
            <Field><FieldLabel>Default description</FieldLabel><Textarea value={content.defaultDescription} onChange={(event) => update(["defaultDescription"], event.target.value)} /></Field>
            <Field><FieldLabel>Default OG image</FieldLabel><Input value={content.defaultOgImage} onChange={(event) => update(["defaultOgImage"], event.target.value)} /></Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {content.entries.map((entry, index) => (
        <Card key={`${entry.path}-${index}`}>
          <CardHeader>
            <CardTitle>{entry.page || entry.path}</CardTitle>
            <CardDescription>{entry.path}</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Page name</FieldLabel><Input value={entry.page} onChange={(event) => update(["entries", index, "page"], event.target.value)} /></Field>
                <Field><FieldLabel>Path</FieldLabel><Input value={entry.path} onChange={(event) => update(["entries", index, "path"], event.target.value)} /></Field>
              </div>
              <Field><FieldLabel>SEO title</FieldLabel><Input value={entry.title} onChange={(event) => update(["entries", index, "title"], event.target.value)} /></Field>
              <Field><FieldLabel>Meta description</FieldLabel><Textarea value={entry.description} onChange={(event) => update(["entries", index, "description"], event.target.value)} /></Field>
              <Field><FieldLabel>Keywords</FieldLabel><Input value={entry.keywords} onChange={(event) => update(["entries", index, "keywords"], event.target.value)} /></Field>
              <Field><FieldLabel>Canonical URL/path</FieldLabel><Input value={entry.canonical} onChange={(event) => update(["entries", index, "canonical"], event.target.value)} /></Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>OG title</FieldLabel><Input value={entry.ogTitle} onChange={(event) => update(["entries", index, "ogTitle"], event.target.value)} /></Field>
                <Field><FieldLabel>OG image</FieldLabel><Input value={entry.ogImage} onChange={(event) => update(["entries", index, "ogImage"], event.target.value)} /></Field>
              </div>
              <Field><FieldLabel>OG description</FieldLabel><Textarea value={entry.ogDescription} onChange={(event) => update(["entries", index, "ogDescription"], event.target.value)} /></Field>
              <Field><FieldLabel>OG image alt</FieldLabel><Input value={entry.ogImageAlt} onChange={(event) => update(["entries", index, "ogImageAlt"], event.target.value)} /></Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field><FieldLabel>Twitter title</FieldLabel><Input value={entry.twitterTitle} onChange={(event) => update(["entries", index, "twitterTitle"], event.target.value)} /></Field>
                <Field><FieldLabel>Twitter image</FieldLabel><Input value={entry.twitterImage} onChange={(event) => update(["entries", index, "twitterImage"], event.target.value)} /></Field>
              </div>
              <Field><FieldLabel>Twitter description</FieldLabel><Textarea value={entry.twitterDescription} onChange={(event) => update(["entries", index, "twitterDescription"], event.target.value)} /></Field>
              <Field><FieldLabel>Robots</FieldLabel><Input value={entry.robots} onChange={(event) => update(["entries", index, "robots"], event.target.value)} /></Field>
              <Field><FieldLabel>Default image alt SEO</FieldLabel><Input value={entry.imageAltDefault} onChange={(event) => update(["entries", index, "imageAltDefault"], event.target.value)} /></Field>
              <Field><FieldLabel>Structured data JSON-LD</FieldLabel><Textarea className="min-h-32 font-mono text-xs" value={entry.structuredData} onChange={(event) => update(["entries", index, "structuredData"], event.target.value)} /></Field>
              <Button type="button" variant="destructive" onClick={() => setContent((current) => ({ ...current, entries: current.entries.filter((_, i) => i !== index) }))}>
                <TrashIcon data-icon="inline-start" />
                Remove page
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={() => setContent((current) => ({ ...current, entries: [...current.entries, { ...defaultSeoContent.entries[0], page: "New page", path: "/new-page" }] }))}>
        <PlusIcon data-icon="inline-start" />
        Add page SEO
      </Button>
    </div>
  );
}
