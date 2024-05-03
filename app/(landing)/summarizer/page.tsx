import Container from "@/components/common/Container";
import React from "react";
import ContentSummarizer from "./components/ContentSummarizer";
import Title from "@/components/common/title";
import FAQ from "@/components/common/faq";
import { summarizerFaq } from "@/constants/faq";
import { DetailTable } from "@/components/common/detail-table";
import { Metadata } from "next";
import UseCase from "@/components/common/use-case";
import { summarizer } from "@/constants/use-cases";

export const metadata: Metadata = {
  title: "Get Straight to the Point: Free Online Text Summarizer",
  description: ` Condense lengthy text instantly with our FREE summarizer! Extract key points, save time, and improve comprehension.  Effortless summarization for articles, reports, and more!`,
};

const Summarizer = () => {
  return (
    <Container>
      <ContentSummarizer />
      <div className="max-w-4xl">
        <Title
          title="Summarizer"
          subtitle="Need to quickly grasp key points? Our free summarizer tool condenses lengthy texts into concise summaries. Simply upload your document or paste text, and our AI will summarize it for easy comprehension. Summarize articles, essays, or research papers – it's the perfect tool to save time and verify information!"
        />
        <DetailTable
          tableData={{
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
        <div className="my-5 mb-1 pb-4">
          <h2 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
            How to use our text summarizer?
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Save time and effort with our powerful summarizing tool that
            delivers clear results with minimal input.
          </p>
          <ul className="text-muted-foreground mt-5 list-inside list-disc space-y-1 text-lg">
            <li>
              Insert the text (article, research paper, book extract) into the
              text area.
            </li>
            <li>
              Click the{" "}
              <span className="text-primary font-bold">"Summarize"</span>{" "}
              Button.{" "}
            </li>
            <li>
              You can also choose between different styles{" "}
              <span className="text-primary font-semibold">bullets</span>,{" "}
              <span className="text-primary font-semibold">paragraph</span>, you
              can also provide a custom style.
            </li>
          </ul>
        </div>
      </div>
      <div className="py-12">
        <h2 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
          Who needs a summarizer?
        </h2>

        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
          A free summarizer can be a valuable asset for a wide range of people.
          Here's a detailed explanation for each user group of your online free
          Summarizer:
        </p>
        <UseCase useCase={summarizer} />
      </div>
      <FAQ faqs={summarizerFaq} />
    </Container>
  );
};

export default Summarizer;
