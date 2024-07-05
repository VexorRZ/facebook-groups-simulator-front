import React from "react";

import {
  StyledBold,
  StyledItalic,
  StyledUnderlined,
  StyledFormatListBulleted,
  StyledFormatListNumbered,
  Container,
} from "./styles";
const TextOperation = ({ editor }: any) => {
  return (
    <Container>
      <button
        title="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <StyledBold />
      </button>
      <button
        title="Italic"
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
      <button
        title="bullet-list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bullet-list") ? "is-active" : ""}
      >
        <StyledFormatListBulleted />
      </button>

      <button
        title="list-numbered"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("list-numbered") ? "is-active" : ""}
      >
        <StyledFormatListNumbered />
      </button>
    </Container>
  );
};

export default TextOperation;
