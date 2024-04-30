"use client";

import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CircleCheckBig, Copy, Edit, Trash, Undo } from "lucide-react";
import { Replacement } from "./extensions/GrammarChecker.types";
import { LanguageDropDown } from "./language_dropdown";
import LoadingDots from "../ui/LoadingDots";

const ContentEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState("en-US");
  const [content, setContent] = useState("");
  const [currentStatus, setCurrentStatus] = useState<"edit" | "result">("edit");
  const hidePopup = () => {
    const popup = document.getElementById("popup");
    if (popup) popup!.classList.add("hidden");
  };
  useEffect(() => {
    const popup = document.getElementById("popup");

    document.addEventListener("click", (event) => {
      if (event.target !== popup && !popup!.contains(event.target as any)) {
        hidePopup();
      }
    });
  }, []);

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
    replacements: Replacement[],
    message: string,
    offset: number,
    lenght: number
  ): string => {
    return `<span class="editable-span inline-block group relative text-blue-500 underline cursor-pointer" id="${offset.toString()}-${(
      lenght + offset
    ).toString()}" data-replacements=${replacements
      .map((replacement) => replacement.value)
      .join(
        "|"
      )} data-original=${original} data-current=${current} data-message=${JSON.stringify(
      message
    )}>${current}</span>`;
  };

  const showPopup = (event: any) => {
    const popup = document.getElementById("popup");

    event.stopPropagation();
    const replacements: Replacement[] = [];
    const span = event.target;
    const replacementData: string = span.dataset.replacements;
    const message = span.dataset.message;
    const original = span.dataset.original;
    const current = span.dataset.current;

    if (replacementData) {
      try {
        replacementData.split("|").forEach((value: string) => {
          if (value != current) {
            replacements.push({
              value,
            });
          }
        });
      } catch (error) {
        console.error("Error parsing replacement data:", error);
      }
    }

    const undoButton = document.createElement("button");
    const errorMessage = document.createElement("p");
    errorMessage.className = "text-muted-foreground text-sm";
    errorMessage.textContent = message || "";
    undoButton.className =
      "bg-secondary mt-4 w-full h-8 flex justify-center items-center";
    undoButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
    <span class="font-medium ml-2">
    ${original}</span></button>
    `;

    undoButton.addEventListener("click", (e) => {
      span.setAttribute("data-current", original!);
      span.textContent = original!;
      hidePopup();
    });
    const buttons = document.createElement("div");
    buttons.className = "mt-3 flex flex-wrap gap-1";

    replacements.forEach((replacement) => {
      const button = document.createElement("button");
      button.className =
        "bg-primary w-auto rounded py-1 px-3 font-medium text-white";
      button.textContent = replacement.value;
      button.addEventListener("click", () => {
        span.setAttribute("data-current", replacement.value);
        span.textContent = replacement.value;
        hidePopup();
      });
      buttons.appendChild(button);
    });
    popup!.innerHTML = "";
    popup!.appendChild(errorMessage);
    popup!.appendChild(buttons);
    if (original != current) {
      popup!.appendChild(undoButton);
    }

    const spanRect = event.target.getBoundingClientRect();
    popup!.style.top = `${spanRect.bottom + window.scrollY + 5}px`; // Position below span with scroll factored in
    popup!.style.left = `${spanRect.left + window.scrollX}px`; // Align left edge with span
    popup!.classList.remove("hidden");
  };
  const revalidateCorrection = () => {
    const editableSpans = document.querySelectorAll(".editable-span");
    editableSpans.forEach((span) => {
      span.addEventListener("click", showPopup);
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
        `https://api.refinemycontent.com/v2/check?language=${language}&text=${encodeURIComponent(
          cleanText
        )}&disabledRules=WHITESPACE_RULE&allowIncompleteResults=true`
      );
      const matches = res.data?.matches;
      // console.log(matches);
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
        console.log(newcontent.split(/\r?\n/), "newcontent");
        contentRef.current!.innerHTML = newcontent.split(/\r?\n/).join("<br>");
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
    <div className="rounded-xl border shadow-xl">
      <div
        id="popup"
        className="popup dark:bg-secondary/40 text-muted-foreground border-secondary absolute left-0 z-10 hidden w-72 space-y-2 rounded-md border-2 bg-white px-3 py-2 text-sm shadow-xl"
      >
        <h3 className="font-normal uppercase text-gray-900 dark:text-white">
          Grammatical Error
        </h3>
      </div>
      <div className="bg-background flex h-80 flex-col rounded-xl">
        <div className="flex h-auto items-center justify-between rounded-t-xl border-b p-1 px-3">
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
              "mb-5 h-full w-full resize-none rounded-md border-none bg-inherit p-6 outline-none placeholder:text-lg"
            )}
            translate="no"
            spellCheck="false"
            autoCorrect="off"
            contentEditable="true"
          />
        </div>
        <div className="flex items-center justify-between rounded-b-xl border p-1 px-6 py-2 ">
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
