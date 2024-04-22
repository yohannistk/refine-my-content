import { Editor, RawCommands } from "@tiptap/core";
import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    wordCounter: {
      /**
       * Comments will be added to the autocomplete.
       */
      reset: () => ReturnType;
    };
  }
}

export const WordCounter = Extension.create({
  name: "wordCounter",

  addStorage() {
    return {
      withSpaces: 0,
      withoutSpaces: 0,
      wordCount: 0,
    };
  },

  onUpdate(this: { name: string; options: any; storage: any; editor: Editor }) {
    const content = this.editor.getText();
    // Reset counters
    this.storage.withSpaces = countCharactersWithSpaces(content);
    this.storage.withoutSpaces = countCharactersWithoutSpaces(content);
    this.storage.wordCount = countWords(content);
  },
});

function countCharactersWithSpaces(text: string) {
  // Use the built-in length property to get the total number of characters
  return text.length;
}

function countWords(text: string) {
  // Trim leading and trailing whitespace
  const trimmedInput = text.trim();

  // Split the input text into an array of words using a regular expression
  // that matches one or more non-whitespace characters
  const words = trimmedInput.split(/\s+/);

  // Return the length of the words array (number of words)
  return words.length;
}
function countCharactersWithoutSpaces(text: string) {
  // Use regular expression to replace all spaces with an empty string
  // and then get the length of the resulting string
  return text.replace(/\s/g, "").length;
}
