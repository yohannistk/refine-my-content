"use client";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClipboardIcon,
  ClipboardPasteIcon,
  Download,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingDots from "@/components/ui/LoadingDots";
import useCopyToClipboardAndDownload from "@/hooks/useCopyToClipboardAndDownload";
import { getParagraphs } from "@/helpers";
import { ParaphraserMode } from "@/custom";
import ParaphraserModeChooser from "./ParaphraserModeChooser";

const modes = [
  { title: "Standard", value: "standard" },
  { title: "Fluency", value: "fluency" },
  { title: "Academic", value: "academic" },
  { title: "Creative", value: "creative" },
  { title: "Simple", value: "simple" },
  { title: "Shorten", value: "shorten" },
  { title: "Formal", value: "formal" },
];

const ContentParaphraser = () => {
  const [mode, setMode] = useState<ParaphraserMode>("standard");
  const [original, setOriginal] = useState("");
  const originalRef = useRef<HTMLTextAreaElement>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const { downloadDocx, textAreaRef, copied, copy } =
    useCopyToClipboardAndDownload();
  function countWords(value: string) {
    const text = value.trim();

    // Split the text into words using a regular expression that handles various word delimiters
    const wordArray = text.match(/\b\w+\b/g);

    const wordCount = wordArray ? wordArray.length : 0; // Handle potential null/empty case

    return wordCount;
  }
  const handleParaphraser = async () => {
    const content = original;
    if (!content) {
      toast.error("Content is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/paraphraser", {
        content,
        mode: mode,
      });
      setSummary(res.data.result.summary!);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleGetClipboardContent = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (originalRef.current && originalRef.current.tagName === "TEXTAREA") {
        setOriginal(text);
      }
    } catch (err) {
      console.log(err);
      toast.error("Paste permission denied!");
    }
  };
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];

    if (!file) return; // No file selected

    const allowedExtensions = [".docx"];
    const fileSplited = file.name.split(".");
    const extension = `.${fileSplited[fileSplited.length - 1].toLowerCase()}`;
    console.log(extension);
    if (allowedExtensions.indexOf(extension) === -1) {
      toast.error("Invalid file type. Please select DOCX file.");
      fileInput.current!.value = "";
      return; // Clear file selection
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      const paragraphs = getParagraphs(content);
      console.log(paragraphs);
      let fullParagraph = "";
      for (let paragraph of paragraphs) {
        fullParagraph += paragraph;
        fullParagraph += "\n";
        fullParagraph += "\n";
      }
      console.log(fullParagraph);
      setOriginal(fullParagraph);
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
  }

  return (
    <div className="rounded-lg border shadow-2xl">
      <div className=" flex flex-col items-center justify-between gap-3 px-3 py-2 sm:flex-row sm:gap-0 lg:justify-start">
        <div className="block lg:hidden">
          <ParaphraserModeChooser mode={mode} setMode={setMode} />
        </div>
        <div className="ml-3 mt-2  hidden gap-2 sm:mt-0 lg:flex">
          {modes.map((m) => {
            return (
              <Button
                key={m.value}
                onClick={(e) => setMode(m.value as ParaphraserMode)}
                className={cn("", {
                  "border-primary border-2": mode == m.value,
                })}
                variant={"outline"}
              >
                {m.title}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="relative flex h-96 flex-col overflow-y-auto border-r md:flex-1">
          <div className="relative flex-1 p-3">
            {original.trim().length == 0 && (
              <Button
                onClick={handleGetClipboardContent}
                variant={"outline"}
                className="absolute left-1/2 top-1/2 z-50 h-20 w-28 -translate-x-1/2 -translate-y-1/2 shadow"
              >
                <ClipboardPasteIcon
                  size={30}
                  className="text-primary"
                  strokeWidth={1}
                />
              </Button>
            )}
            <form className="h-full w-full">
              <Textarea
                ref={originalRef}
                placeholder="Type or paste your content here to paraphrase it... "
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                className="h-full w-full resize-none border-none text-base outline-none focus-visible:ring-0"
              />
            </form>
          </div>

          <div className=" flex h-16 items-center justify-between px-5 py-3">
            <form hidden>
              <input
                accept=".docx"
                onChange={handleFileUpload}
                type="file"
                hidden
                ref={fileInput}
              />
            </form>
            {original.trim().length > 0 ? (
              <span className="text-muted-foreground text-sm">
                {countWords(original)} Words
              </span>
            ) : (
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={(e) => {
                  fileInput.current?.click();
                }}
              >
                <UploadIcon size={17} />
              </Button>
            )}
            <Button
              disabled={loading}
              className="font-semibold text-white"
              onClick={handleParaphraser}
            >
              {loading ? <LoadingDots color="white" style="" /> : "Paraphraser"}
            </Button>
          </div>
        </div>
        <div className="flex h-96 flex-col overflow-y-auto  md:flex-1">
          <div className="flex-1 p-3">
            <Textarea
              ref={textAreaRef}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="h-full w-full  resize-none border-none text-base outline-none focus-visible:ring-0"
            />
          </div>
          <div className=" flex h-16 items-center justify-between p-3">
            <div>
              {summary.length > 0 ? (
                <span className="text-muted-foreground text-sm">
                  {countWords(summary)} Words
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={(e) => {
                  setSummary("");
                }}
              >
                <TrashIcon size={18} />
              </Button>
              <Button
                variant={"outline"}
                onClick={(e) => {
                  copy();
                }}
                size={"icon"}
              >
                <ClipboardIcon size={18} />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={(e) => {
                  downloadDocx();
                }}
              >
                <Download size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentParaphraser;
