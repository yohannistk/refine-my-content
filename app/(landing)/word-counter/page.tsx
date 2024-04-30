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
      <div className="mt-8">
        <RichTextEditor>
          <WordCountFooter />
        </RichTextEditor>
      </div>

      <Title
        title="Word Counter"
        subtitle="Count words, characters, sentences, and paragraphs effortlessly with our word counter app. Track your writing progress accurately and efficiently."
      />

      <div className="mx-auto max-w-5xl  px-5 py-12">
        <h2 className="mb-5 text-2xl md:text-3xl">What is a word counter?</h2>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <p className="text-muted-foreground text-base leading-relaxed">
              A word counter is a valuable tool for anyone who works with
              written content. It's a simple utility that calculates the number
              of words, characters, sentences, and even paragraphs in a given
              text. This functionality is particularly useful for writers,
              editors, students, and professionals who need to adhere to
              specific word limits or character counts in their work.
            </p>
          </div>
          <div className="md:col-span-1">
            <p className="text-muted-foreground text-base leading-relaxed">
              The primary purpose of a word counter is to provide precision and
              accuracy when dealing with textual content. Whether you're writing
              an academic paper, a blog post, a social media caption, or any
              other type of document, knowing the exact word count helps you
              stay within the prescribed guidelines or optimize your content for
              readability and engagement.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-16 max-w-5xl  px-5 py-12 text-center">
        <h2 className="md:text-gray-300xl mb-5 text-center text-2xl">
          When to use a Word Counter?
        </h2>
        <p className="text-muted-foreground">
          Word counting tools available online serve a multitude of purposes,
          ranging from aiding in the monitoring of daily writing targets to
          ensuring compliance with assignment guidelines, and even assisting in
          crafting engaging social media content that has the potential to go
          viral.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="mb-5 text-2xl md:text-3xl">Who needs a word counter?</h2>
        <p className="text-muted-foreground mb-6 text-base leading-relaxed">
          When tallying words, the aim typically revolves around reaching a
          minimum threshold or an approximate figure, albeit with a few
          exceptions. Here are several scenarios where the utility of a word
          counter becomes evident:
        </p>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">Students</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Students of all levels, from high school to graduate school,
              frequently use online word counters to ensure their essays,
              papers, and assignments meet specified word count requirements. It
              helps them stay within the expected length while conveying their
              ideas effectively.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">Writers and Authors</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Professional writers, novelists, and bloggers rely on word
              counters to track their progress during writing sessions. It
              allows them to set daily or project-based word count goals and
              monitor their productivity.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">Content Creators</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Individuals involved in content creation for websites, social
              media platforms, and digital marketing campaigns use word counters
              to optimize their content's length for SEO, readability, and
              audience engagement.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">
              Editors and Proofreaders
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Editors and proofreaders use word counters to assess the length of
              manuscripts, articles, and documents. It helps them ensure
              consistency, adherence to guidelines, and efficient editing
              processes.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">Academic Researchers</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Researchers and academics use word counters to manage the length
              of research papers, proposals, and scholarly articles. It aids in
              meeting journal submission requirements and maintaining a concise
              yet comprehensive writing style.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-semibold">Freelancers</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Freelancers working in content writing, copywriting, translation,
              and transcription rely on word counters to estimate project costs,
              track their work output, and ensure they deliver content as per
              client requirements.
            </p>
          </div>
        </div>
      </div>

      <FAQ faqs={wordCounterFaq} />
    </Container>
  );
};

export default TextEditor;
