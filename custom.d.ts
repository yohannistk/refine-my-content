export {};

export type UseCase = { title: string; description: string };
export type ParaphraserMode =
  | "smooth"
  | "formal"
  | "shorten"
  | "fluency"
  | "academic"
  | "creative"
  | "simple"
  | "standard";

export interface TFAQ {
  title: string;
  subTitle: string;
}

declare global {
  interface Window {
    showMenu: (event: any, corrected: string) => void;
    showMenuPrototype: (event: any, word: string, corrected: string) => void;
  }

  interface FileReader {
    fileName: string;
    fileSize: number;
  }
}
