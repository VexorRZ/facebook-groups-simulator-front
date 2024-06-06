import React from "react";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";

import { StyledBold, StyledItalic, StyledUnderlined } from "./styles";
const TextOperation = ({ editor }: any) => {
  return (
    <div className="flex">
      <button
        title="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <StyledBold />
      </button>
      <button
        title="Italics"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <StyledItalic />
      </button>
      <button
        title="underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <StyledUnderlined />
      </button>
    </div>
  );
};

export default TextOperation;
