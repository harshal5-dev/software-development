import PropTypes from "prop-types";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Heading } from "@tiptap/extension-heading";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { BulletList } from "@tiptap/extension-bullet-list";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import ToolBar from "./ToolBar";

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-3" } }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc ml-3" } }),
      Highlight,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          class: "text-blue-500 text-sm underline hover:text-blue-700",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "h-40 rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-y-scroll",
      },
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

RichTextEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
};

export default RichTextEditor;
