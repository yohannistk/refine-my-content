"use client";

import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRef, useState } from "react";
import { Correction } from "@/app/api/grammar/route";
import { cn } from "@/lib/utils";
import {
  CircleCheckBig,
  Copy,
  Edit,
  Trash,
  Trash2Icon,
  Undo,
} from "lucide-react";
import { Replacement } from "./extensions/GrammarChecker.types";
import { LanguageDropDown } from "./language_dropdown";
import LoadingDots from "../ui/LoadingDots";

const ContentEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState("en-US");
  const [content, setContent] = useState("");
  const [currentStatus, setCurrentStatus] = useState<"edit" | "result">("edit");

  const copyToClipboard = async () => {
    const contentToCopy =
      currentStatus == "edit" ? content : contentRef.current!.textContent;
    try {
      await navigator.clipboard.writeText(contentToCopy!);
      toast.success("Content copied to clipboard!"); // Optional notification
    } catch (error) {
      toast.error("Failed to copy content!"); // Optional notification
    }
  };
  const deleteContent = async () => {
    if (currentStatus == "edit") {
      setContent("");
    } else {
      contentRef.current!.innerHTML = "";
    }
  };
  const getCurrentCorrectionHtml = (
    original: string,
    current: string,
    replacements: string,
    message: string,
    offset: number,
    lenght: number
  ): string => {
    return `
    <div class="editable-span inline-block group relative text-blue-500 underline cursor-pointer"
          id="${offset.toString()}-${(lenght + offset).toString()}"      
          data-replacements=${JSON.stringify(replacements)}
          data-original=${original}
          data-current=${current}
          data-message=${JSON.stringify(message)}
          >${current}</div>
    `;
  };
  const updateCurrentCorrection = (id: string) => {
    const word = document.getElementById(id);
    if (!word) return;
    const replacementData = word.dataset.replacements;
    const message = word.dataset.message;
    const original = word.dataset.original;
    const current = word.dataset.current;
    const replacements: Replacement[] = [];
    if (replacementData) {
      try {
        const parsedData = JSON.parse(replacementData); // Parse JSON data (adjust if format is different)
        parsedData.forEach((replacement: Replacement) => {
          if (replacement.value != current) {
            replacements.push({
              value: replacement.value,
            });
          }
        });
      } catch (error) {
        console.error("Error parsing replacement data:", error);
      }
    }
    const popup = document.createElement("div");
    popup.classList.add(
      "absolute",
      "hidden",
      "left-0",
      "px-3",
      "py-2",
      "space-y-2",
      "group-hover:block",
      "rounded-md",
      "bg-white",
      "shadow-2xl",
      "text-gray-700",
      "z-10",
      "w-72",
      "text-sm",
      "text-gray-500",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow-sm"
    );
    popup.innerHTML = `
    <h3 class="font-normal uppercase text-gray-900 dark:text-white">Popover title</h3>
    <p class="text-sm text-black">${message}</p>
  `;
    const undoButton = document.createElement("button");
    undoButton.className =
      "bg-secondary mt-4 w-full h-8 flex justify-center items-center";
    undoButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
      <span class="font-medium ml-2">
      ${original}</span></button>
      `;
    undoButton.addEventListener("click", (e) => {
      word.setAttribute("data-current", original!);
      word.innerHTML = original!;
      updateCurrentCorrection(word.id);
    });
    const buttons = document.createElement("div");
    buttons.className = "mt-3 flex flex-wrap gap-1";

    replacements.forEach((replacement) => {
      const button = document.createElement("button");
      button.className =
        "bg-primary h-6 w-auto rounded py-1 px-3 font-medium text-white";
      button.textContent = replacement.value;
      button.addEventListener("click", () => {
        word.setAttribute("data-current", replacement.value);
        word.innerHTML = replacement.value;
        updateCurrentCorrection(word.id);
      });
      buttons.appendChild(button);
    });
    word.appendChild(popup);
    popup.appendChild(buttons);
    console.log(current, original);
    if (current != original) {
      popup.appendChild(undoButton);
    }
  };

  const revalidateCorrection = () => {
    const editableSpans = document.querySelectorAll(".editable-span");

    editableSpans.forEach((span) => {
      const replacements: Replacement[] = [];
      const spanElement = span as HTMLElement;
      const replacementData = spanElement.dataset.replacements;
      const message = spanElement.dataset.message;
      const original = spanElement.dataset.original;
      const current = spanElement.dataset.current;
      console.log(message);
      if (replacementData) {
        try {
          const parsedData = JSON.parse(replacementData); // Parse JSON data (adjust if format is different)
          parsedData.forEach((replacement: Replacement) => {
            if (replacement.value != current) {
              replacements.push({
                value: replacement.value,
              });
            }
          });
        } catch (error) {
          console.error("Error parsing replacement data:", error);
        }
      }
      const popup = document.createElement("div");
      popup.classList.add(
        "absolute",
        "hidden",
        "left-0",
        "px-3",
        "py-2",
        "space-y-2",
        "group-hover:block",
        "rounded-md",
        "bg-white",
        "shadow-2xl",
        "text-gray-700",
        "z-10",
        "w-72",
        "text-sm",
        "text-gray-500",
        "border",
        "border-gray-200",
        "rounded-lg",
        "shadow-sm"
      );
      popup.innerHTML = `
        <h3 class="font-normal uppercase text-gray-900 dark:text-white">Grammatical Error</h3>
        <p class="text-sm text-black">${message}</p>
      `;
      const undoButton = document.createElement("button");
      undoButton.className =
        "bg-secondary mt-4 w-full h-8 flex justify-center items-center";
      undoButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
      <span class="font-medium ml-2">
      ${original}</span></button>
      `;
      undoButton.addEventListener("click", (e) => {
        span.setAttribute("data-current", original!);
        span.innerHTML = original!;
        updateCurrentCorrection(span.id);
      });
      const buttons = document.createElement("div");
      buttons.className = "mt-3 flex flex-wrap gap-1";

      replacements.forEach((replacement) => {
        const button = document.createElement("button");
        button.className =
          "bg-primary h-6 w-auto rounded py-1 px-3 font-medium text-white";
        button.textContent = replacement.value;
        button.addEventListener("click", () => {
          span.setAttribute("data-current", replacement.value);
          span.innerHTML = replacement.value;
          updateCurrentCorrection(span.id);
        });
        buttons.appendChild(button);
      });
      span.appendChild(popup);
      popup.appendChild(buttons);
      popup.appendChild(undoButton);
    });
  };
  function countWords(value: string) {
    const text = value.trim();

    // Split the text into words using a regular expression that handles various word delimiters
    const wordArray = text.match(/\b\w+\b/g);

    const wordCount = wordArray ? wordArray.length : 0; // Handle potential null/empty case

    return wordCount;
  }
  function getOriginal(str: string, offset: number, lenght: number) {
    return str.substring(offset, offset + lenght + 1).trim();
  }
  function insertString(str: string, position: number, toInsert: string) {
    return str.slice(0, position) + toInsert + str.slice(position);
  }
  function removeString(str: string, offset: number, lenght: number) {
    return (
      str.substring(0, offset) + "" + str.substring(offset + lenght, str.length)
    );
  }
  const replaceWord = (
    str: string,
    offset: number,
    lenght: number,
    toInsert: string
  ) => {
    return insertString(removeString(str, offset, lenght), offset, toInsert);
  };

  const checkGrammar = async () => {
    const cleanText = content;

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
    // console.log(cleanText);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://api.refinemycontent.com/v2/check?language=en-US&text=${encodeURIComponent(
          cleanText
        )}&disabledRules=WHITESPACE_RULE&allowIncompleteResults=true`
      );
      const matches = res.data?.matches;
      console.log(matches);
      if (matches.length > 0) {
        let newcontent = content;
        let prevCalc = 0;

        for (let match of matches) {
          const original = getOriginal(
            match.context.text,
            match.context.offset,
            match.context.length
          );

          const html = getCurrentCorrectionHtml(
            original,
            match.replacements[0].value,
            match.replacements.map((replacement: Replacement) => ({
              value: replacement.value,
            })),
            match.message,
            match.offset,
            match.length
          );
          let newLenght = html.length;
          let oldLenght = match.length;
          newcontent = replaceWord(
            newcontent,
            match.offset + prevCalc,
            match.length,
            html
          );

          if (oldLenght > newLenght) {
            prevCalc -= oldLenght - newLenght;
          } else if (oldLenght < newLenght) {
            prevCalc += newLenght - oldLenght;
          }
        }
        console.log(newcontent);
        contentRef.current!.innerHTML = newcontent;
        revalidateCorrection();
        setCurrentStatus("result");
      } else {
        toast.success("Your content looks fine");
      }
    } catch (err: any) {
      toast.error("Failed to process your request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border shadow-2xl">
      <div className="flex h-80 flex-col">
        <div className="flex h-auto items-center justify-between rounded-t-xl p-1 px-3">
          <LanguageDropDown language={language} setLanguage={setLanguage} />
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="hover:bg-secondary text-muted-foreground hover:text-primary flex items-center rounded-md px-3 py-1 text-sm"
            >
              <Copy size={16} className="mr-1" /> Copy
            </button>
            <button
              onClick={deleteContent}
              className="hover:bg-secondary text-muted-foreground hover:text-primary flex items-center rounded-md px-3 py-1 text-sm"
            >
              <Trash size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>
        <div
          className={cn("flex-1 p-6 text-lg", {
            hidden: currentStatus == "edit",
          })}
          ref={contentRef}
        ></div>

        <div
          className={cn("flex-1", {
            hidden: currentStatus == "result",
          })}
        >
          <textarea
            onChange={(event) => {
              setContent(event.target.value);
            }}
            value={content}
            placeholder="Enter or paste text here..."
            id="content-editable"
            className={cn(
              "mb-5 h-full w-full resize-none rounded-md border-none p-6 outline-none placeholder:text-lg"
            )}
            translate="no"
            spellCheck="false"
            autoCorrect="off"
            contentEditable="true"
          />
        </div>
        <div className="bg-secondary/60 flex items-center justify-between rounded-b-xl border p-1 px-6 py-2 ">
          <div>
            {currentStatus == "edit" && content.length > 0 && (
              <span className="text-muted-foreground text-sm">
                {countWords(content)} words
              </span>
            )}
            {currentStatus == "result" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentStatus("edit");
                  }}
                  className="hover:bg-secondary text-muted-foreground hover:text-primary flex items-center rounded-md px-3 py-1 text-sm"
                >
                  <Undo size={16} className="mr-1" /> Back
                </button>
                <button
                  onClick={() => {
                    setCurrentStatus("edit");
                  }}
                  className="hover:bg-secondary text-muted-foreground hover:text-primary flex items-center rounded-md px-3 py-1 text-sm"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </button>
              </div>
            )}
          </div>
          {currentStatus == "edit" && (
            <Button
              className="font-semibold text-white"
              size={"sm"}
              onClick={checkGrammar}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingDots color="white" style="large" />
              ) : (
                <>
                  <CircleCheckBig size={17} className="mr-2" /> Correct
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
