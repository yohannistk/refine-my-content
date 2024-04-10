"use client";

import LoadingDots from "@/components/ui/LoadingDots";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateRandomId } from "@/helpers";
import useCopyToClipboardAndDownload from "@/hooks/useCopyToClipboardAndDownload";
import { cn } from "@/lib/utils";
import axios from "axios";
import {
  AlertCircle,
  CircleAlert,
  Clipboard,
  Download,
  Edit,
  X,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";

function validateFileType(file: File) {
  // Get the file extension (e.g., ".jpg")
  const fileExtension = file.name.split(".").pop();

  // Allowed image extensions
  const validImageTypes = ["jpg", "jpeg", "png", "gif"];

  // Check if the extension is valid
  return validImageTypes.includes(fileExtension!.toLowerCase());
}

function validateFileSize(file: File) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  if (file.size > MAX_FILE_SIZE) {
    return false;
  }

  return true;
}

interface Preview {
  name: string;
  size: any;
  dataUrl: any;
  id: string;
}

function bytesToMB(bytes: number) {
  if (typeof bytes !== "number" || isNaN(bytes)) {
    throw new TypeError("Input must be a number");
  }
  if (bytes < 0) {
    console.warn("Input value is negative. Returning 0 MB.");
    return 0;
  }

  const MB = bytes / (1024 * 1024);
  return MB.toFixed(2);
}

const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!"); // Optional notification
  } catch (error) {
    toast.error("Failed to copy content!"); // Optional notification
  }
};
const ConverImage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Preview[]>([]);
  const [results, setResults] = useState<Tesseract.RecognizeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { downloadDocx } = useCopyToClipboardAndDownload();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const isFileValid = acceptedFiles.every((file) => validateFileType(file));
      const isFileWithInLimit = acceptedFiles.every((file) =>
        validateFileSize(file)
      );
      if (!isFileValid) {
        toast.error("Invalid file type selected");
        return;
      }
      if (!isFileWithInLimit) {
        toast.error("File size exceeds limit. Maximum allowed size is 10 MB.");
        return;
      }

      if (acceptedFiles.length + images.length > 3) {
        toast.error("File limit excessed only 3 file are allowed");
        return;
      }
      let acceptedFilesUrls = acceptedFiles.map((file) => {
        return URL.createObjectURL(file);
      });
      setImages((prevImages) => [...prevImages, ...acceptedFilesUrls]);
      const previews: Promise<Preview>[] = [];
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        previews.push(
          new Promise((resolve) => {
            reader.onload = (ev) => {
              resolve({
                name: file.name,
                size: ev.total,
                dataUrl: ev.target!.result,
                id: generateRandomId(),
              });
            };
          })
        );
      }

      Promise.all(previews).then((previewObjects) => {
        setImagePreviews([...imagePreviews, ...previewObjects]);
      });
    },
    [images, imagePreviews]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = async () => {
    console.log(images);
    const promises: Promise<any>[] = [];
    for (let image of images) {
      promises.push(Tesseract.recognize(image));
    }
    try {
      setLoading(true);
      const recognizeResult: Tesseract.RecognizeResult[] = await Promise.all(
        promises
      );
      console.log(recognizeResult);
      setResults(recognizeResult);
    } catch (e) {
      toast.error("Unable to process your images");
    } finally {
      setLoading(false);
    }
  };

  const clearAndStartOver = () => {
    setImages([]);
    setImagePreviews([]);
    setResults([]);
  };

  return (
    <div>
      {results.length > 0 && (
        <div className="relative h-auto min-h-72 space-y-2 rounded-lg border-2 p-3 pt-0">
          <div className="flex h-10 items-center justify-end border-b">
            <button onClick={clearAndStartOver}>
              <X className="text-muted-foreground"></X>
            </button>
          </div>
          {results.map((result, index) => {
            let preview = imagePreviews[index];
            return (
              <div className="bg-secondary relative flex h-auto flex-col items-center justify-between gap-2 rounded-md border px-4 py-2 md:flex-row">
                <div className="flex h-full flex-row items-center md:gap-3">
                  <img
                    className="h-[72px] w-[72px] bg-cover"
                    src={preview.dataUrl}
                    alt={preview.name}
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground hidden text-sm md:block">
                      {preview.name}
                    </span>
                    <span className="text-muted-foreground hidden text-sm md:block">
                      {bytesToMB(preview.size)} MB
                    </span>
                  </div>
                </div>
                {result.data.text == "" ? (
                  <span>No text was found</span>
                ) : result.data.confidence < 60 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} />
                          <span className="text-sm">unable to process</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        The image appears to be blurry or low-resolution
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        copyToClipboard(result.data.text);
                      }}
                      size={"sm"}
                      variant={"outline"}
                      className="text-sm"
                    >
                      <Edit size={17} strokeWidth={1} />
                    </Button>
                    <Button
                      onClick={() => {
                        copyToClipboard(result.data.text);
                      }}
                      size={"sm"}
                      variant={"outline"}
                      className="text-sm"
                    >
                      <Clipboard size={17} strokeWidth={1} />
                    </Button>
                    <Button
                      onClick={() => downloadDocx(result.data.text)}
                      size={"sm"}
                      variant={"outline"}
                      className="text-sm"
                    >
                      <Download size={17} strokeWidth={1} />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {loading && (
        <div className="flex h-72 w-full items-center justify-center rounded-lg border-2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-sm">
              Analyzing the image, please wait a moment.
            </span>
            <LoadingDots color="black" style="large" />
          </div>
        </div>
      )}
      {!loading && !(results.length > 0) && (
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <div className="flex min-h-fit w-full flex-1 items-center justify-center md:min-h-72">
            <div
              {...getRootProps()}
              className={cn(
                "dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600",
                { "border-primary": isDragActive }
              )}
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                accept="image/*"
                {...getInputProps()}
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
              />
            </div>
          </div>
          {images?.length > 0 && (
            <div className="flex flex-1 flex-col justify-between space-y-3 rounded-lg border p-2">
              <div className="flex flex-col space-y-2">
                {imagePreviews.map((preview, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-secondary relative h-20 rounded-md border px-4 py-2"
                    >
                      <div className="flex h-full gap-2">
                        <img
                          className="h-full w-[72px] bg-cover"
                          src={preview.dataUrl}
                          alt={preview.name}
                        />
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-sm">
                            {preview.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {bytesToMB(preview.size)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          setImagePreviews(
                            imagePreviews.filter((pr) => pr.id != preview.id)
                          );
                          setImages(images.filter((image, i) => index != i));
                        }}
                        className="absolute right-1 top-1 p-2"
                      >
                        <X size={17} className="text-muted-foreground" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div>
                <Button onClick={uploadFiles} className="font-bold text-white">
                  Submit and process
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConverImage;
