import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAdminAuthed } from "@/lib/admin-auth";

type ImgBBResponse = {
  data?: {
    url?: string;
    display_url?: string;
  };
};

async function uploadImageToImgBB(file: File) {
  const apiKey = process.env.IMGBB_API_KEY;
  const uploadUrl = process.env.IMGBB_UPLOAD_URL;

  if (!apiKey || !uploadUrl || !file.type.startsWith("image/")) {
    return null;
  }

  const url = new URL(uploadUrl);
  url.searchParams.set("key", apiKey);

  const form = new FormData();
  form.append("image", file, file.name);

  const response = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as ImgBBResponse;
  return payload.data?.url ?? payload.data?.display_url ?? null;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }

  const imgbbUrl = await uploadImageToImgBB(file).catch(() => null);
  if (imgbbUrl) {
    return Response.json({ url: imgbbUrl });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);

  return Response.json({ url: `/uploads/${name}` });
}
