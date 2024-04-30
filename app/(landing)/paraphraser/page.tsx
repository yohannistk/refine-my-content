import Container from "@/components/common/Container";
import Title from "@/components/common/title";
import React from "react";
import ContentParaphraser from "./components/ContentParaphraser";
import FAQ from "@/components/common/faq";
import { paraphraserFaq } from "@/data/faq";
import { Metadata } from "next";
import { Brain, Repeat, Smile, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Rephrase It Right: Free Online Paraphrasing Tool",
  description: `Need to rephrase text without losing meaning? Our FREE paraphrasing tool offers quick and effective synonyms and sentence structure variations. Rewrite effortlessly and avoid plagiarism!`,
};

const Paraphraser = () => {
  return (
    <Container>
      <ContentParaphraser />
      <div className="max-w-4xl">
        <Title
          title="Paraphraser"
          subtitle="Struggling to paraphrase? Our free online paraphrasing tool can help! Simply enter your text and get clear, concise paraphrases in seconds.  Improve your writing and avoid plagiarism with our easy-to-use paraphrase tool."
        />
      </div>

      <div className="bg-background py-12">
        <div className="flex max-w-4xl flex-col items-start justify-center">
          <h2 className="text-muted-foregrounds text-4xl font-bold tracking-tight">
            Features of Paraphraser
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            This paraphraser stands out with its powerful AI capabilities. It
            excels at rephrasing essays, crafting compelling content, and even
            creating original copies. Whether you need to improve your essays or
            generate fresh ideas, this tool has you covered.
          </p>
        </div>
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-lg font-bold leading-7 text-gray-900">
                <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Brain className="text-white" />
                </div>
                Human-Level Quality
              </dt>
              <dd className="text-muted-foreground mt-2 text-base leading-7">
                Experience the art of human-like paraphrasing. Our tool goes
                beyond simple word swapping, leveraging advanced AI to
                understand the nuances of language and context. This ensures
                your paraphrased content remains creative, more readable,
                sensible, and plagiarism-free, just like a human writer would
                produce.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-lg font-bold leading-7 text-gray-900">
                <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Repeat className="text-white" />
                </div>
                Effortless Rephrasing
              </dt>
              <dd className="text-muted-foreground mt-2 text-base leading-7">
                Say goodbye to the tedious task of manually rephrasing text! Our
                AI-powered paraphraser seamlessly rewrites your sentences while
                preserving the original meaning. Whether you need to improve
                clarity, avoid plagiarism, or simply find fresh wording, this
                tool delivers accurate and natural-sounding paraphrases
                effortlessly.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-lg font-bold leading-7 text-gray-900">
                <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Smile className="text-white" />
                </div>
                Maintain Original Meaning
              </dt>
              <dd className="text-muted-foreground mt-2 text-base leading-7">
                Unlike other online paraphrase tools, our AI-based sentence
                rephraser doesn't just change the wording; it maintains the core
                meaning of the text while restructuring the sentence for clarity
                and flow. This ensures your message remains accurate and
                consistent even when expressed in a new way.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-lg font-bold leading-7 text-gray-900">
                <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg">
                  <ThumbsUp className="text-white" />
                </div>
                Free and Easy to Use
              </dt>
              <dd className="text-muted-foreground mt-2 text-base leading-7">
                With our user-friendly interface and intuitive design, anyone
                can start paraphrasing in seconds, regardless of technical
                expertise. Whether you're a student, writer, or simply someone
                looking to enhance their communication, our free tool empowers
                you to achieve your goals with ease.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <FAQ faqs={paraphraserFaq} />
    </Container>
  );
};

export default Paraphraser;
