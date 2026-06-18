import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);

  return Response.json({ url: `/uploads/${name}` });
}
