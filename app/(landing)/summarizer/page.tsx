import Container from "@/components/common/Container";
import React from "react";
import ContentSummarizer from "./components/ContentSummarizer";
import Title from "@/components/common/title";
import FAQ from "@/components/common/faq";
import { summarizerFaq } from "@/data/faq";
import { DetailTable } from "@/components/common/detail-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Straight to the Point: Free Online Text Summarizer",
  description: ` Condense lengthy text instantly with our FREE summarizer! Extract key points, save time, and improve comprehension.  Effortless summarization for articles, reports, and more!`,
};

const Summarizer = () => {
  return (
    <Container>
      <ContentSummarizer />
      <Title
        title="Summarizer"
        subtitle="Need to quickly grasp key points? Our free summarizer tool condenses lengthy texts into concise summaries. Simply upload your document or paste text, and our AI will summarize it for easy comprehension. Summarize articles, essays, or research papers – it's the perfect tool to save time and verify information!"
      />
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
