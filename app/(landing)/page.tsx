import Container from "@/components/common/Container";
import ContentEditor from "@/components/ContentEditor/ContentEditor";
import FAQ from "@/components/common/faq";
import Title from "@/components/common/title";
import { grammarCheckerFaq } from "@/data/faq";
import React from "react";
import { DetailTable } from "@/components/common/detail-table";

const GrammarChecker = () => {
  return (
    <Container>
      <Title
        title="Grammar Checker"
        subtitle="Grammar Checker identifies and corrects errors in your writing, ensuring clarity and professionalism."
      />
      <ContentEditor />
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
