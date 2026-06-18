"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-32 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" type="button" variant="outline" onClick={() => editor?.chain().focus().toggleBold().run()}>
          B
        </Button>
        <Button size="sm" type="button" variant="outline" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          I
        </Button>
        <Button size="sm" type="button" variant="outline" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          List
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
