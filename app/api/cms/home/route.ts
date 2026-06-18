import { getHomeContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getHomeContent();
    return Response.json({ content });
  } catch {
    return Response.json({ content: null }, { status: 200 });
  }
}
