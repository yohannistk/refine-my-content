import Container from "@/components/common/Container";
import Title from "@/components/common/title";
import React from "react";
import ContentParaphraser from "./components/ContentParaphraser";
import FAQ from "@/components/common/faq";
import { paraphraserFaq } from "@/data/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rephrase It Right: Free Online Paraphrasing Tool",
  description: `Need to rephrase text without losing meaning? Our FREE paraphrasing tool offers quick and effective synonyms and sentence structure variations. Rewrite effortlessly and avoid plagiarism!`,
};

const Paraphraser = () => {
  return (
    <Container>
      <Title
        title="Paraphraser"
        subtitle="Paraphraser rewrites your sentences in fresh ways, helping you find new clarity and avoid plagiarism."
      />
      <ContentParaphraser />

      <FAQ faqs={paraphraserFaq} />
    </Container>
  );
};

export default Paraphraser;
