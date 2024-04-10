import Container from "@/components/common/Container";
import React from "react";
import ContentSummarizer from "./components/ContentSummarizer";
import Title from "@/components/common/title";
import FAQ from "@/components/common/faq";
import { summarizerFaq } from "@/data/faq";
import { DetailTable } from "@/components/common/detail-table";

const Summarizer = () => {
  return (
    <Container>
      <Title
        title="Summarizer"
        subtitle="Summarizer condenses lengthy text into key ideas, saving you time and helping you grasp the essentials quickly."
      />
      <ContentSummarizer />

      <DetailTable
        tableData={{
          title: "Effortlessly understand complex documents.",
          sutitle:
            "Our AI-powered summarizer extracts key points and creates clear summaries of essays, papers, and more. Choose your preferred format, all for free and with unlimited use!",
          rows: [
            {
              feature: "🚀 AI-driven technology",
              explanation: "Rapidly identifies main ideas",
            },
            {
              feature: "📝 Condenses",
              explanation: "Essays, papers, and documents",
            },
            {
              feature: "🧠 Various AI modes",
              explanation: "Bullet Points and Paragraphs",
            },
            {
              feature: "💸 No cost involved",
              explanation: "Limitless summarization",
            },
          ],
        }}
      />
      <FAQ faqs={summarizerFaq} />
    </Container>
  );
};

export default Summarizer;
