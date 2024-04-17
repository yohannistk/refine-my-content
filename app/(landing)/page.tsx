import Container from "@/components/common/Container";
import ContentEditorUpdated from "@/components/ContentEditor/ContentEditorUpdated";
import FAQ from "@/components/common/faq";
import Title from "@/components/common/title";
import { grammarCheckerFaq } from "@/data/faq";
import React, { useEffect } from "react";
import { DetailTable } from "@/components/common/detail-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Grammar Checker & Sentence Corrector",
  description: `Polish your writing with our FREE grammar checker!  Catch errors instantly, improve sentence structure, and ensure clear communication.  Easy to use, powerful, and 100% free!`,
};

const GrammarChecker = () => {
  return (
    <Container>
      {/* <GrammarTest /> */}
      <Title
        title="Grammar Checker"
        subtitle="Grammar Checker identifies and corrects errors in your writing, ensuring clarity and professionalism."
      />
      <div
        id="popup"
        className="popup dark:bg-secondary/40 text-muted-foreground border-secondary absolute left-0 z-10 hidden w-72 space-y-2 rounded-md border-2 bg-white px-3 py-2 text-sm shadow-2xl"
      >
        <h3 className="font-normal uppercase text-gray-900 dark:text-white">
          Grammatical Error
        </h3>
      </div>
      <ContentEditorUpdated />

      <DetailTable
        tableData={{
          title: "Your Powerful Grammar Ally",
          sutitle:
            "Catch errors and enhance your writing with our comprehensive grammar checker.",
          rows: [
            {
              feature: "AI Grammar Checker",
              explanation: "Instantly corrects grammatical errors",
            },
            {
              feature: "✅ Reviews",
              explanation: "grammar, spelling, and punctuation.",
            },
            {
              feature: "🌐 Supported languages",
              explanation: "Supports 30 languages",
            },
            {
              feature: "🌍 English dialects",
              explanation: "Supports multiple dialects, including US, UK, CA.",
            },
            {
              feature: "💰 Completely free",
              explanation: "unlimited grammar checks.",
            },
          ],
        }}
      />
      <FAQ faqs={grammarCheckerFaq} />
    </Container>
  );
};

export default GrammarChecker;
