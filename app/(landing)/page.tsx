import Container from "@/components/common/Container";
import ContentEditorUpdated from "@/components/ContentEditor/ContentEditorUpdated";
import FAQ from "@/components/common/faq";
import Title from "@/components/common/title";
import { grammarCheckerFaq } from "@/data/faq";
import React from "react";
import { DetailTable } from "@/components/common/detail-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Grammar Checker & Sentence Corrector",
  description: `Polish your writing with our FREE grammar checker!  Catch errors instantly, improve sentence structure, and ensure clear communication.  Easy to use, powerful, and 100% free!`,
};

const GrammarChecker = () => {
  return (
    <>
      <Container>
        <ContentEditorUpdated />
        <div className="max-w-4xl">
          <Title
            title="Grammar Checker"
            subtitle="Unsure about grammar or syntax? Our free grammar checker tackles them all!  Simply copy-paste your text and get instant feedback on grammar, punctuation, and sentence structure.  Verify grammar and refine your writing for free – it's the perfect tool for students, professionals, and anyone who wants to polish their writing!"
          />
          <DetailTable
            tableData={{
              rows: [
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
                  explanation:
                    "Supports multiple dialects, including US, UK, CA.",
                },
                {
                  feature: "💰 Completely free",
                  explanation: "unlimited grammar checks.",
                },
              ],
            }}
          />
        </div>
        <FAQ faqs={grammarCheckerFaq} />
      </Container>
    </>
  );
};

export default GrammarChecker;
