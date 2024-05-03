import { IconType } from "react-icons";
import { ImSpellCheck } from "react-icons/im";
import { FiFileText } from "react-icons/fi";
import { LucideIcon, ScanText } from "lucide-react";
import { TbFilePencil } from "react-icons/tb";
import { MdOutlineDocumentScanner } from "react-icons/md";
export type Features = {
  title: string;
  href: string;
  description: string;
  icon: IconType;
};
export const features: Features[] = [
  {
    title: "Grammar Checker",
    icon: ImSpellCheck,
    href: "/",
    description:
      "Grammar Checker identifies and corrects errors in your writing, ensuring clarity and professionalism.",
  },
  {
    title: "Paraphraser",
    icon: TbFilePencil,
    href: "/paraphraser",
    description:
      "Paraphraser rewrites your sentences in fresh ways, helping you find new clarity and avoid plagiarism.",
  },
  {
    title: "Summarizer",
    icon: FiFileText,
    href: "/summarizer",
    description:
      "Summarizer condenses lengthy text into key ideas, saving you time and helping you grasp the essentials quickly.",
  },
  {
    title: "Image to Text",
    href: "/image-to-text",
    icon: MdOutlineDocumentScanner,
    description:
      "Stop retyping! Extract text from images instantly. Upload your documents, photos, or screenshots and get editable text in seconds with our Image to Text tool.",
  },
];

export const languages = [
  {
    name: "Arabic",
    code: "ar",
    longCode: "ar",
  },
  {
    name: "Asturian",
    code: "ast",
    longCode: "ast-ES",
  },
  {
    name: "Belarusian",
    code: "be",
    longCode: "be-BY",
  },
  {
    name: "Breton",
    code: "br",
    longCode: "br-FR",
  },
  {
    name: "Catalan",
    code: "ca",
    longCode: "ca-ES",
  },
  {
    name: "Catalan (Valencian)",
    code: "ca",
    longCode: "ca-ES-valencia",
  },
  {
    name: "Catalan (Balearic)",
    code: "ca",
    longCode: "ca-ES-balear",
  },
  {
    name: "Danish",
    code: "da",
    longCode: "da-DK",
  },
  {
    name: "German",
    code: "de",
    longCode: "de",
  },
  {
    name: "German (Germany)",
    code: "de",
    longCode: "de-DE",
  },
  {
    name: "German (Austria)",
    code: "de",
    longCode: "de-AT",
  },
  {
    name: "German (Swiss)",
    code: "de",
    longCode: "de-CH",
  },
  {
    name: "Simple German",
    code: "de-DE-x-simple-language",
    longCode: "de-DE-x-simple-language",
  },
  {
    name: "Greek",
    code: "el",
    longCode: "el-GR",
  },
  {
    name: "English",
    code: "en",
    longCode: "en",
  },
  {
    name: "English (US)",
    code: "en",
    longCode: "en-US",
  },
  {
    name: "English (GB)",
    code: "en",
    longCode: "en-GB",
  },
  {
    name: "English (Australian)",
    code: "en",
    longCode: "en-AU",
  },
  {
    name: "English (Canadian)",
    code: "en",
    longCode: "en-CA",
  },
  {
    name: "English (New Zealand)",
    code: "en",
    longCode: "en-NZ",
  },
  {
    name: "English (South African)",
    code: "en",
    longCode: "en-ZA",
  },
  {
    name: "Esperanto",
    code: "eo",
    longCode: "eo",
  },
  {
    name: "Spanish",
    code: "es",
    longCode: "es",
  },
  {
    name: "Spanish (voseo)",
    code: "es",
    longCode: "es-AR",
  },
  {
    name: "Persian",
    code: "fa",
    longCode: "fa",
  },
  {
    name: "French",
    code: "fr",
    longCode: "fr",
  },
  {
    name: "French (Canada)",
    code: "fr",
    longCode: "fr-CA",
  },
  {
    name: "French (Switzerland)",
    code: "fr",
    longCode: "fr-CH",
  },
  {
    name: "French (Belgium)",
    code: "fr",
    longCode: "fr-BE",
  },
  {
    name: "Irish",
    code: "ga",
    longCode: "ga-IE",
  },
  {
    name: "Galician",
    code: "gl",
    longCode: "gl-ES",
  },
  {
    name: "Italian",
    code: "it",
    longCode: "it",
  },
  {
    name: "Japanese",
    code: "ja",
    longCode: "ja-JP",
  },
  {
    name: "Khmer",
    code: "km",
    longCode: "km-KH",
  },
  {
    name: "Dutch",
    code: "nl",
    longCode: "nl",
  },
  {
    name: "Dutch (Belgium)",
    code: "nl",
    longCode: "nl-BE",
  },
  {
    name: "Polish",
    code: "pl",
    longCode: "pl-PL",
  },
  {
    name: "Portuguese",
    code: "pt",
    longCode: "pt",
  },
  {
    name: "Portuguese (Portugal)",
    code: "pt",
    longCode: "pt-PT",
  },
  {
    name: "Portuguese (Brazil)",
    code: "pt",
    longCode: "pt-BR",
  },
  {
    name: "Portuguese (Angola preAO)",
    code: "pt",
    longCode: "pt-AO",
  },
  {
    name: "Portuguese (Moçambique preAO)",
    code: "pt",
    longCode: "pt-MZ",
  },
  {
    name: "Romanian",
    code: "ro",
    longCode: "ro-RO",
  },
  {
    name: "Russian",
    code: "ru",
    longCode: "ru-RU",
  },
  {
    name: "Slovak",
    code: "sk",
    longCode: "sk-SK",
  },
  {
    name: "Slovenian",
    code: "sl",
    longCode: "sl-SI",
  },
  {
    name: "Swedish",
    code: "sv",
    longCode: "sv",
  },
  {
    name: "Tamil",
    code: "ta",
    longCode: "ta-IN",
  },
  {
    name: "Tagalog",
    code: "tl",
    longCode: "tl-PH",
  },
  {
    name: "Ukrainian",
    code: "uk",
    longCode: "uk-UA",
  },
  {
    name: "Chinese",
    code: "zh",
    longCode: "zh-CN",
  },
  {
    name: "Crimean Tatar",
    code: "crh",
    longCode: "crh-UA",
  },
  {
    name: "Dutch",
    code: "nl",
    longCode: "nl-NL",
  },
  {
    name: "Simple German",
    code: "de-DE-x-simple-language",
    longCode: "de-DE-x-simple-language-DE",
  },
  {
    name: "Spanish",
    code: "es",
    longCode: "es-ES",
  },
  {
    name: "Italian",
    code: "it",
    longCode: "it-IT",
  },
  {
    name: "Persian",
    code: "fa",
    longCode: "fa-IR",
  },
  {
    name: "Swedish",
    code: "sv",
    longCode: "sv-SE",
  },
  {
    name: "German",
    code: "de",
    longCode: "de-LU",
  },
  {
    name: "French",
    code: "fr",
    longCode: "fr-FR",
  },
];
