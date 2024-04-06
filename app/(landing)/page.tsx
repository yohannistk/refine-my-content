import Container from "@/components/common/Container";
import ContentEditor from "@/components/ContentEditor/ContentEditor";
import FAQ from "@/components/common/faq";
import Title from "@/components/common/title";
import { grammarCheckerFaq } from "@/data/faq";
import React from "react";

const GrammarChecker = () => {
  return (
    <Container>
      <Title
        title="Grammar Checker"
        subtitle="Grammar Checker identifies and corrects errors in your writing, ensuring clarity and professionalism."
      />
      <ContentEditor />
      <FAQ faqs={grammarCheckerFaq} />
    </Container>
  );
};

export default GrammarChecker;
