import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
//import Image from "@tiptap/extension-image";
//import Link from "@tiptap/extension-link";
import MenuBar from "../TextEditorMenuBar";
import Placeholder from "@tiptap/extension-placeholder";

interface IEditorprops {
  onChange: (val: any) => void;
}

const TextEditor = ({ onChange }: IEditorprops) => {
  const [howToModal, setHowToModal] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder],
    autofocus: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
