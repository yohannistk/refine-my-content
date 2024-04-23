import Container from "@/components/common/Container";
import FAQ from "@/components/common/faq";
import RichTextEditor from "@/components/common/rich-text-editor";
import { WordCountFooter } from "@/components/common/rich-text-editor/word-count-footer";
import Title from "@/components/common/title";
import { wordCounterFaq } from "@/data/faq";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Word Count Pro: Your Free Online Word Counter Tool",
  description:
    "Count words, characters, and sentences instantly with Word Count Pro. Perfect for writers, students, and professionals needing accurate word analysis. Try it now for free!",
};
const TextEditor = () => {
  return (
    <Container>
      <Title
        title="Word Counter"
        subtitle="Count words, characters, sentences, and paragraphs effortlessly with our word counter app. Track your writing progress accurately and efficiently."
      />
      <div className="mt-8">
        <RichTextEditor>
          <WordCountFooter />
        </RichTextEditor>
      </div>

      <FAQ faqs={wordCounterFaq} />
    </Container>
  );
};

export default TextEditor;
