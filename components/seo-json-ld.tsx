export function SeoJsonLd({ json }: { json?: string }) {
  if (!json?.trim()) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
