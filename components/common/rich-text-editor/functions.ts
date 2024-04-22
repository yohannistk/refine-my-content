import { Editor } from "@tiptap/core";

export const toggleBold = (editor: Editor) => {
  editor.chain().focus().toggleBold().run();
};
export const toggleCode = (editor: Editor) => {
  editor.chain().focus().toggleCode().run();
};
export const toggleItalic = (editor: Editor) => {
  editor.chain().focus().toggleItalic().run();
};
export const toggleUnderLine = (editor: Editor) => {
  editor.chain().focus().toggleUnderline().run();
};
export const toggleStrikeThrough = (editor: Editor) => {
  editor.chain().focus().toggleStrike().run();
};
export const toggleSuperscript = (editor: Editor) => {
  editor.chain().focus().toggleSuperscript().run();
};
export const toggleSubscript = (editor: Editor) => {
  editor.chain().focus().toggleSubscript().run();
};
export const toggleCodeBlock = (editor: Editor) => {
  editor.chain().focus().toggleCodeBlock().run();
};
export const toggleBlockquote = (editor: Editor) => {
  editor.chain().focus().toggleBlockquote().run();
};
export const setTextAlignRight = (editor: Editor) => {
  editor.chain().focus().setTextAlign("right").run();
};
export const setTextAlignLeft = (editor: Editor) => {
  editor.chain().focus().setTextAlign("left").run();
};
export const setTextAlignCenter = (editor: Editor) => {
  editor.chain().focus().setTextAlign("center").run();
};
export const setTextAlignJustify = (editor: Editor) => {
  editor.chain().focus().setTextAlign("justify").run();
};
export const toggleBulletList = (editor: Editor) => {
  editor.chain().focus().toggleBulletList().run();
};
export const toggleOrderedList = (editor: Editor) => {
  editor.chain().focus().toggleOrderedList().run();
};
export const toggleHeadingLevelOne = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 1 }).run();
};
export const toggleHeadingLevelTwo = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 2 }).run();
};
export const toggleHeadingLevelThree = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 3 }).run();
};
export const toggleHeadingLevelFour = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 4 }).run();
};
export const toggleHeadingLevelFive = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 5 }).run();
};
export const toggleHeadingLevelSix = (editor: Editor) => {
  editor.chain().focus().toggleHeading({ level: 6 }).run();
};
