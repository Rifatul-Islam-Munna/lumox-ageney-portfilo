import { redirect } from "next/navigation";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { DynamicServicesCmsForm } from "@/components/admin/dynamic-services-cms-form";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getDynamicServicesContent } from "@/lib/cms-store";
import { defaultDynamicServicesContent } from "@/lib/dynamic-services-defaults";

export default async function AdminDynamicServicesPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  let content = defaultDynamicServicesContent;
  try {
    content = (await getDynamicServicesContent()) ?? defaultDynamicServicesContent;
  } catch {
    content = defaultDynamicServicesContent;
  }

  return (
    <AdminPageShell activeHref="/admin/dynamic-services" title="Dynamic service pages" subtitle="Create and control slug-based service pages.">
      <DynamicServicesCmsForm initialContent={content} />
    </AdminPageShell>
  );
}
