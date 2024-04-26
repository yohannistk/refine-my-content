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
        <Title
          title="Grammar Checker"
          subtitle="Grammar Checker identifies and corrects errors in your writing, ensuring clarity and professionalism."
        />
        <ContentEditorUpdated />
      </Container>

      <section className="bg-secondary/75 py-20 ">
        <div className="container mx-auto max-w-6xl items-center px-10 sm:px-20 md:px-32 lg:px-16">
          <div className="-mx-3 flex flex-wrap items-center">
            <div className="lg:order-0 order-1 w-full px-3 lg:w-1/2">
              <div className="w-full lg:max-w-md">
                <h2 className="font-heading mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Your Ultimate Online Free Grammar Checker
                </h2>
                <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
                  Elevate your writing prowess using powerful grammar tools to
                  create precise, error-free content that engages and
                  communicates effectively.
                </p>
                <ul>
                  <li className="flex items-center space-x-4 py-2 xl:py-3">
                    <span className="text-xl">🛠️</span>
                    <span className="text-muted-foreground font-medium">
                      Improve Writing with Free Grammar Check.
                    </span>
                  </li>
                  <li className="flex items-center space-x-4 py-2 xl:py-3">
                    <span className="text-xl">🤖</span>
                    <span className="text-muted-foreground font-medium">
                      Unleash the Power of AI to Perfect Your Grammar, Spelling,
                      and Style
                    </span>
                  </li>
                  <li className="flex items-center space-x-4 py-2 xl:py-3">
                    <span className="text-xl">🌍</span>
                    <span className="text-muted-foreground font-medium">
                      Supports multiple dialects, including US, UK, CA
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-0 mb-12 w-full px-3 lg:order-1 lg:mb-0 lg:w-1/2">
              <img
                className="mx-auto sm:max-w-sm lg:max-w-full"
                src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
                alt="feature image"
              />
            </div>
          </div>
        </div>
      </section>

      <Container>
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

        <FAQ faqs={grammarCheckerFaq} />
      </Container>
    </>
  );
};

export default GrammarChecker;
