import { getBlogContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const content = await getBlogContent();
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Number(url.searchParams.get("limit") ?? String(content?.posts.length ?? 1)));
    const posts = content?.posts ?? [];
    const totalPages = Math.max(1, Math.ceil(posts.length / limit));
    const start = (page - 1) * limit;
    return Response.json({
      content,
      pagination: { page, limit, total: posts.length, totalPages },
      posts: posts.slice(start, start + limit),
    });
  } catch {
    return Response.json({ content: null }, { status: 200 });
  }
}
