"use client";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { PropsWithChildren, ReactHTML, useEffect } from "react";
import { Button } from "../../ui/button";
import { Editor } from "@tiptap/core";
import { Toggle } from "../../ui/toggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckIcon,
  ChevronDown,
  Italic,
  List,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { cn } from "@/lib/utils";
import TextAlign from "@tiptap/extension-text-align";
import {
  setTextAlignCenter,
  setTextAlignJustify,
  setTextAlignLeft,
  setTextAlignRight,
  toggleBlockquote,
  toggleBold,
  toggleBulletList,
  toggleCode,
  toggleCodeBlock,
  toggleHeadingLevelFive,
  toggleHeadingLevelFour,
  toggleHeadingLevelOne,
  toggleHeadingLevelSix,
  toggleHeadingLevelThree,
  toggleHeadingLevelTwo,
  toggleItalic,
  toggleOrderedList,
  toggleStrikeThrough,
  toggleSubscript,
  toggleSuperscript,
  toggleUnderLine,
} from "./functions";
import { WordCounter } from "./extentions";
const extensions = [
  WordCounter,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  Underline,
  Paragraph,
  Blockquote,
  Text,
  Superscript,
  Subscript,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = ``;

const FormatsButton = ({
  editor,
  property,
  title,
  toggle,
}: {
  title: string;
  editor: Editor;
  property: string;
  toggle: any;
}) => {
  const alignments = ["left", "right", "center", "justify"];
  const isActive = alignments.includes(property)
    ? editor.isActive({ textAlign: property })
    : editor.isActive(property);
  return (
    <MenubarItem className="p-0">
      <button
        onClick={() => toggle(editor)}
        className={cn(
          "flex w-full items-center justify-between px-3 py-1 text-start",
          {
            "bg-primary/10": isActive,
          }
        )}
      >
        {title}
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            isActive ? "opacity-100" : "opacity-0"
          )}
        />
      </button>
    </MenubarItem>
  );
};
const HeadingToggle = ({
  level,
  onClick,
  editor,
  titleAs,
}: {
  level: number;
  onClick: any;
  editor: Editor;
  titleAs: keyof ReactHTML;
}) => {
  const isActive = editor.isActive("heading", { level });
  const HeadingTag = titleAs ? titleAs : "h1";
  return (
    <MenubarItem
      onClick={() => {
        onClick(editor);
      }}
    >
      <HeadingTag
        className={cn("font-bold", {
          "text-2xl": level == 1,
          "text-xl": level == 2,
          "text-lg": level == 3,
          "text-base": level == 4,
          "text-sm": level == 5,
          "text-xs": level == 6,
        })}
      >
        Heading {level}
      </HeadingTag>
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />
    </MenubarItem>
  );
};
function Formats({ editor }: { editor: Editor }) {
  return (
    <Menubar className="m-0 h-fit w-24 cursor-pointer border p-0">
      <MenubarMenu>
        <MenubarTrigger className="flex w-full cursor-pointer justify-between pl-2 pr-1">
          Formats <ChevronDown size={18} className="p-0" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Headings</MenubarSubTrigger>
            <MenubarSubContent className="w-60">
              <HeadingToggle
                editor={editor}
                level={1}
                onClick={toggleHeadingLevelOne}
                titleAs="h1"
              />
              <HeadingToggle
                editor={editor}
                level={2}
                onClick={toggleHeadingLevelTwo}
                titleAs="h2"
              />
              <HeadingToggle
                editor={editor}
                level={3}
                onClick={toggleHeadingLevelThree}
                titleAs="h3"
              />
              <HeadingToggle
                editor={editor}
                level={4}
                onClick={toggleHeadingLevelFour}
                titleAs="h4"
              />
              <HeadingToggle
                editor={editor}
                level={5}
                onClick={toggleHeadingLevelFive}
                titleAs="h5"
              />
              <HeadingToggle
                editor={editor}
                level={6}
                onClick={toggleHeadingLevelSix}
                titleAs="h6"
              />
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Inline</MenubarSubTrigger>
            <MenubarSubContent className="w-48">
              <FormatsButton
                editor={editor}
                toggle={toggleBold}
                property="bold"
                title="Bold"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleItalic}
                property="italic"
                title="Italic"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleUnderLine}
                property="underline"
                title="Underline"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleStrikeThrough}
                property="strike"
                title="Strike"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleCode}
                property="code"
                title="Code"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleSuperscript}
                property="superscript"
                title="Superscript"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleSubscript}
                property="subscript"
                title="Subscript"
              />
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Blocks</MenubarSubTrigger>
            <MenubarSubContent className="w-48">
              <FormatsButton
                editor={editor}
                toggle={toggleBlockquote}
                property="blockquote"
                title="Blockquote"
              />
              <FormatsButton
                editor={editor}
                toggle={toggleCodeBlock}
                property="codeblock"
                title="Code block"
              />
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Align</MenubarSubTrigger>
            <MenubarSubContent className="w-48">
              <FormatsButton
                editor={editor}
                toggle={setTextAlignLeft}
                property="left"
                title="Left"
              />
              <FormatsButton
                editor={editor}
                toggle={setTextAlignRight}
                property="right"
                title="Right"
              />
              <FormatsButton
                editor={editor}
                toggle={setTextAlignCenter}
                property="center"
                title="Center"
              />
              <FormatsButton
                editor={editor}
                toggle={setTextAlignJustify}
                property="justify"
                title="Justify"
              />
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const ToolBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 rounded-t-2xl border-b p-2">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo size={16} />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo size={16} />
      </Button>
      <Toggle
        size={"sm"}
        onPressedChange={() => toggleBold(editor)}
        pressed={editor.isActive("bold")}
      >
        <Bold size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => toggleItalic(editor)}
        pressed={editor.isActive("italic")}
      >
        <Italic size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => toggleStrikeThrough(editor)}
        pressed={editor.isActive("strike")}
      >
        <Strikethrough size={16} strokeWidth={3} />
      </Toggle>

      <Formats editor={editor} />
      <Toggle
        size={"sm"}
        onPressedChange={() => toggleBulletList(editor)}
        pressed={editor.isActive("bulletList")}
      >
        <List size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => toggleOrderedList(editor)}
        pressed={editor.isActive("orderedList")}
      >
        <ListOrderedIcon size={16} strokeWidth={3} />
      </Toggle>

      <Toggle
        size={"sm"}
        onPressedChange={() => setTextAlignLeft(editor)}
        pressed={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => setTextAlignRight(editor)}
        pressed={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => setTextAlignJustify(editor)}
        pressed={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify size={16} strokeWidth={3} />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => setTextAlignCenter(editor)}
        pressed={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter size={16} strokeWidth={3} />
      </Toggle>
    </div>
  );
};

export default function RichTextEditor({ children }: PropsWithChildren) {
  const editor = useEditor({
    content,
    extensions,
    editorProps: {
      attributes: {
        class:
          "p-3 h-full whitespace-normal ring-0 focus:outline-none break-words",
      },
    },
  });

  if (!editor) return;
  const renderFooter = () => {
    return React.cloneElement(children as React.ReactElement, {
      editor: editor,
    });
  };
  return (
    <div className="flex h-96 max-h-96 flex-col overflow-hidden rounded-2xl border shadow-2xl ">
      <ToolBar editor={editor} />
      <div className="max-h-full flex-1 overflow-hidden">
        <EditorContent content={content} editor={editor} />
      </div>
      {renderFooter()}
    </div>
  );
}
