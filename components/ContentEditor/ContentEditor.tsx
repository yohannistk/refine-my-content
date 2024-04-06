"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Clipboard, Trash2, Trash2Icon } from "lucide-react";
import LoadingDots from "../ui/LoadingDots";
import diff from "diff";
import {
  GrammarChecker,
  GrammarCheckerOperations,
} from "./extensions/GrammarChecker";
import { Match, Range, Replacement } from "./extensions/GrammarChecker.types";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Correction } from "@/app/api/grammar/route";
import { LanguageDropDown } from "./language_dropdown";
import { Badge } from "../ui/badge";

const defaultContent = `The car needs washed`;

const ContentEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const display = useRef<HTMLDivElement>(null);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [language, setLanguage] = useState("en-US");

  const editor = useEditor({
    extensions: [
      StarterKit,
      GrammarChecker.configure({
        documentId: "grammar-checker-v1",
      }),
    ],
    content: defaultContent,
    editorProps: {
      attributes: {
        class:
          "border border-l border-r text-base leading-9 min-h-[300px] p-6 prose dark:prose-invert focus:outline-none max-w-full",
      },
    },
    onUpdate({ editor }) {
      setTimeout(() => updateMatch(editor as any));
    },
    onSelectionUpdate({ editor }) {
      setTimeout(() => updateMatch(editor as any));
    },
    onTransaction({ transaction: tr }) {
      if (tr.getMeta(GrammarCheckerOperations.LoadingTransactionName))
        loading.current = true;
      else loading.current = false;
    },
  });

  const copyToClipboard = async () => {
    if (!editor) {
      console.error("Tiptap editor instance is not provided");
      return;
    }
    const content = editor.getText(); // Get text content
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard!"); // Optional notification
    } catch (error) {
      toast.error("Failed to copy content!"); // Optional notification
    }
  };
  function countWords(value: string) {
    const text = value.trim();

    // Split the text into words using a regular expression that handles various word delimiters
    const wordArray = text.match(/\b\w+\b/g);

    const wordCount = wordArray ? wordArray.length : 0; // Handle potential null/empty case

    return wordCount;
  }
  const checkGrammar = async () => {
    const cleanText = editor?.getText();
    editor?.chain().deleteSelection();
    console.log(cleanText, language);
    if (!cleanText) {
      toast.error("Content is missing!");
      return;
    }
    if (!language) {
      toast.error("Language is missing!");
      return;
    }

    // max word limit
    if (cleanText.split(" ")?.length > 800) {
      toast.error("You may only use 800 words at once!");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://6eda1985-2247-4a74-b4b7-e94f4753ee6c.deepnoteproject.com/v2/check?language=en-US&text=${cleanText}`
      );
      if (res.data?.matches?.length > 0) {
        console.log(res.data?.matches);
        const corrections: Correction[] = res.data?.matches.map((cor: any) => ({
          original: "",
          replacements: cor.replacements,
          offset: cor.offset + 1,
          length: cor.context.length,
          message: cor.shortMessage ? cor.shortMessage : cor.message,
        }));

        setCorrections(corrections);
        editor?.commands.proofread(corrections);
      } else {
        toast.success("Your content looks fine");
      }
    } catch (err: any) {
      toast.error("Failed to process your request");
    } finally {
      setIsLoading(false);
    }
  };

  // Grammar checking extension
  const match = useRef<Match | null>(null);
  const matchRange = useRef<Range | null>(null);
  const loading = useRef(false);
  const updateMatch = (editor: Editor) => {
    match.current = editor.storage.grammarChecker.match;
    matchRange.current = editor.storage.grammarChecker.matchRange;
  };

  const replacements = match.current?.replacements || [];
  const matchMessage = match.current?.message || "No Message";

  const shouldShow = useCallback(
    (editor: Editor) => {
      const match = editor.storage.grammarChecker.match;
      const matchRange = editor.storage.grammarChecker.matchRange;
      // Uncomented
      const { from, to } = editor.state.selection;

      // return (
      //   !!match &&
      //   !!matchRange &&
      //   matchRange?.from <= from &&
      //   to <= matchRange?.to
      // );

      return !!match && !!matchRange;
    },
    [match, matchRange, editor]
  );

  const acceptSuggestion = (suggestion: Replacement) => {
    if (suggestion.value.length >= 0 && editor?.state.selection) {
      const { from, to } = editor?.state.selection;
      const range = { from, to };
      const value = suggestion.value;

      editor?.commands?.deleteRange(range);
      editor?.commands.insertContentAt(range.from, value);
    }
  };

  const ignoreSuggestion = () =>
    editor?.commands.ignoreGrammarCheckerSuggestion();

  return (
    <>
      <div className="my-2">
        {editor ? (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: "bottom-start",
              animation: "fade",
            }}
            className="bubble-menu w-[300px] rounded-md"
            shouldShow={({ editor }) => shouldShow(editor)}
          >
            <div className="bg-secondary/45 absolute left-0 m-1  w-[300px] overflow-y-auto rounded-[6px] border p-2 shadow-xl">
              <span className="text-start text-xs">{matchMessage}</span>
              <div className="mt-3 flex flex-wrap gap-1">
                {replacements?.map((replacement: Replacement, i: number) => {
                  return (
                    <button
                      className="bg-primary h-6 w-auto rounded p-1 px-1 text-xs font-medium text-white"
                      onClick={() => acceptSuggestion(replacement)}
                      key={i + replacement.value}
                    >
                      {replacement.value}
                    </button>
                  );
                })}
                <button
                  className="border-input hover:bg-accent hover:text-accent-foreground text-muted-foreground h-6 w-auto rounded border px-1 text-xs font-medium"
                  onClick={ignoreSuggestion}
                >
                  Ignore
                </button>
              </div>
            </div>
          </BubbleMenu>
        ) : null}
        <div className="rounded-xl shadow-lg">
          <div className="bg-secondary/30 flex h-auto items-center justify-between rounded-t-xl border p-1 px-3">
            <div className="">
              <LanguageDropDown language={language} setLanguage={setLanguage} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  editor?.commands.clearContent();
                }}
                className="inline-flex items-center justify-center rounded"
              >
                <Trash2Icon strokeWidth={1} size={23} />
              </button>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center rounded"
              >
                <Clipboard strokeWidth={1} size={23} />
              </button>
            </div>
          </div>
          <div className="relative">
            <EditorContent editor={editor} />
          </div>
          <div className="bg-secondary/30 flex h-14 items-center justify-between rounded-b-xl border p-1 px-3 ">
            <div className="text-muted-foreground flex gap-3 px-3 text-sm">
              <span> Words {editor && countWords(editor!.getText())}</span>
              <span> Characters {editor && editor!.getText().length}</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="font-semibold text-white"
                size={"sm"}
                onClick={checkGrammar}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingDots color="white" style="large" />
                ) : (
                  "Check for error"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4" ref={display}></div>
    </>
  );
};

export default ContentEditor;
