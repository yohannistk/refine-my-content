import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Document, Packer, Paragraph } from "docx";

function useCopyToClipboardAndDownload() {
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadLink) {
        window.URL.revokeObjectURL(downloadLink);
      }
    };
  }, [downloadLink]);

  const downloadDocx = async (content?: string) => {
    const text = content ? content : textAreaRef.current!.value;
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(text)],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = window.URL.createObjectURL(blob);
    setDownloadLink(url);

    const link = document.createElement("a");
    link.href = url;
    link.download = `refine-${Date.now()}.docx`;
    link.click();
    link.remove();

    setTimeout(() => window.URL.revokeObjectURL(url), 5000);
  };

  const copy = async () => {
    try {
      const text = textAreaRef.current!.value;
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
      setCopied(true);
    } catch (error) {
      toast.error("Failed to copy text");
    } finally {
      setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
    }
  };

  return { textAreaRef, copied, copy, downloadDocx };
}

export default useCopyToClipboardAndDownload;
