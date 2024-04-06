import Container from "@/components/common/Container";
import React from "react";
import ContentSummarizer from "./components/ContentSummarizer";
import Title from "@/components/common/title";
import FAQ from "@/components/common/faq";
import { summarizerFaq } from "@/data/faq";

const Summarizer = () => {
  return (
    <Container>
      <Title
        title="Summarizer"
        subtitle="Summarizer condenses lengthy text into key ideas, saving you time and helping you grasp the essentials quickly."
      />
      <ContentSummarizer />
      <FAQ faqs={summarizerFaq} />
    </Container>
  );
};

export default Summarizer;
