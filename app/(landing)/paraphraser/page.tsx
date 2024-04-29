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
      <ContentParaphraser />
      <Title
        title="Paraphraser"
        subtitle="Struggling to paraphrase? Our free online paraphrasing tool can help! Simply enter your text and get clear, concise paraphrases in seconds.  Improve your writing and avoid plagiarism with our easy-to-use paraphrase tool."
      />

      <FAQ faqs={paraphraserFaq} />
    </Container>
  );
};

export default Paraphraser;
