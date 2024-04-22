"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { copyToClipboard } from "@/utils/helpers";
import { Editor } from "@tiptap/core";
import { Clipboard, Trash } from "lucide-react";
import { useState } from "react";

export const WordCountFooter = ({ editor }: { editor?: Editor }) => {
  const [include, setInclude] = useState(false);
  if (!editor) return;
  const withSpacesCount = editor.storage.wordCounter.withSpaces;
  const withoutSpacesCount = editor.storage.wordCounter.withoutSpaces;
  const wordCount = editor.storage.wordCounter.wordCount;

  return (
    <div className="flex h-12 items-center justify-between border-t px-6 py-2">
      <div className="flex gap-3">
        <span className="text-muted-foreground text-sm font-bold">
          {wordCount} words
        </span>
        <span className="text-muted-foreground text-sm font-bold">
          {include ? withSpacesCount : withoutSpacesCount} Characters
        </span>
        <div className="flex items-center space-x-2">
          <Switch
            checked={include}
            onCheckedChange={(checked: boolean) => {
              setInclude(checked);
            }}
            id="include-space"
          />
          <Label htmlFor="include-space">Include Space</Label>
        </div>
      </div>
      {withSpacesCount > 0 && (
        <div className="flex gap-3">
          <button
            onClick={() => {
              copyToClipboard(editor.getText());
            }}
          >
            <Clipboard size={20} />
          </button>
          <button
            onClick={() => {
              editor.chain().setContent("").focus().run();
              editor.storage.wordCounter.withSpaces = 0;
              editor.storage.wordCounter.withoutSpaces = 0;
              editor.storage.wordCounter.wordCount = 0;
            }}
          >
            <Trash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
