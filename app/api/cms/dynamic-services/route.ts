import { getDynamicServicesContent } from "@/lib/cms-store";
import { defaultDynamicServicesContent } from "@/lib/dynamic-services-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = (await getDynamicServicesContent()) ?? defaultDynamicServicesContent;
    return Response.json({ content });
  } catch {
    return Response.json({ content: defaultDynamicServicesContent });
  }
}
