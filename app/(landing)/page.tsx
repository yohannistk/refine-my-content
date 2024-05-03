import Container from "@/components/common/Container";
import ContentEditorUpdated from "@/components/ContentEditor/ContentEditorUpdated";
import FAQ from "@/components/common/faq";
import Title from "@/components/common/title";
import { grammarCheckerFaq } from "@/constants/faq";
import React from "react";
import { DetailTable } from "@/components/common/detail-table";
import { Metadata } from "next";
import {
  Brain,
  Globe,
  InfinityIcon,
  Lightbulb,
  Repeat,
  Search,
  Smile,
  ThumbsUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Grammar Checker & Sentence Corrector",
  description: `Polish your writing with our FREE grammar checker!  Catch errors instantly, improve sentence structure, and ensure clear communication.  Easy to use, powerful, and 100% free!`,
};

const GrammarChecker = () => {
  return (
    <>
      <Container>
        <ContentEditorUpdated />
        <div className="max-w-4xl">
          <Title
            title="Grammar Checker"
            subtitle="Unsure about grammar or syntax? Our free grammar checker tackles them all!  Simply copy-paste your text and get instant feedback on grammar, punctuation, and sentence structure.  Verify grammar and refine your writing for free – it's the perfect tool for students, professionals, and anyone who wants to polish their writing!"
          />
          <DetailTable
            tableData={{
              rows: [
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
        </div>
        <div className="bg-background py-12">
          <div className="flex max-w-4xl flex-col items-start justify-center">
            <h2 className="text-muted-foregrounds text-4xl font-bold tracking-tight">
              Features of Grammar Checker
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              The AI grammar correction tool provides a comprehensive set of
              features designed to simplify the grammar checking process for all
              users. Here are some of its notable features:
            </p>
          </div>
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <Globe className="text-white" />
                  </div>
                  Check Grammar in Multiple Languages
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  No matter which language you're writing in, our grammar
                  checker has got you covered. With support for over 30
                  languages, including English, Spanish, French, German,
                  Chinese, Japanese, and many more, you can confidently write in
                  your preferred language without worrying about grammatical
                  errors.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <Lightbulb className="text-white" />
                  </div>
                  Auto Suggestions
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  Say goodbye to manual proofreading and let our grammar checker
                  do the heavy lifting for you. It intelligently analyzes your
                  text and provides real-time auto suggestions for grammatical
                  corrections, spelling mistakes, punctuation errors, and more.
                  This feature not only saves you time but also enhances the
                  overall quality of your writing.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <Smile className="text-white" />
                  </div>
                  One-Click Correction
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  Fixing grammar issues has never been easier! With our
                  one-click correction feature, you can instantly apply
                  suggested changes to your text with a single click. No more
                  scrolling through lengthy documents or struggling to identify
                  and rectify errors manually. Our grammar checker streamlines
                  the editing process for seamless and efficient writing.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <InfinityIcon className="text-white" />
                  </div>
                  Free and Unlimited Usage
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  Best of all, our grammar checker is completely free to use,
                  with no limitations on the number of words or documents you
                  can check. Enjoy unlimited access to our comprehensive grammar
                  analysis and correction features without any subscription fees
                  or hidden charges.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <ThumbsUp className="text-white" />
                  </div>
                  User-Friendly Interface
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  Our grammar checker is designed with user convenience in mind.
                  The intuitive interface makes it easy to upload, edit, and
                  review your text, whether you're writing a simple email, an
                  academic paper, a business report, or creative content. It's a
                  tool that adapts to your writing needs effortlessly.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="bg-primary absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full">
                    <Search className="text-white" />
                  </div>
                  Advanced Grammar Analysis
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  Beyond basic grammar checks, our tool offers advanced analysis
                  to ensure clarity, coherence, and precision in your writing.
                  It detects complex grammatical structures, checks sentence
                  variety, suggests vocabulary enhancements, and provides
                  insights to help you refine your writing style.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
            Who needs a grammar checker?
          </h2>

          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            A free grammar checker can be a valuable asset for a wide range of
            people. Here's a closer look at how different user groups can
            benefit:
          </p>
          <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">Students</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Students often write essays, research papers, and reports under
                tight deadlines. Typos, subject-verb agreement issues, and comma
                misplacement can creep in. A grammar checker can identify these
                errors before they get flagged by a teacher, potentially
                boosting grades.
              </p>
            </div>
            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">Professionals</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Clear and error-free communication is crucial in the
                professional world. A grammar checker can help catch typos and
                grammatical mistakes in emails, reports, presentations, and even
                social media posts, ensuring a polished and professional image.
              </p>
            </div>
            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">Copywriters</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Crafting persuasive marketing copy is all about delivering a
                flawless message. A grammar checker acts as your secret weapon,
                eliminating typos and grammatical errors from your copywriting.
                This ensures your message resonates with your target audience
                and drives the desired results for your campaigns.
              </p>
            </div>
            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">
                Non-native English Speakers:
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                English grammar has its fair share of complexities. A grammar
                checker can be a helpful tool for non-native speakers to
                identify areas for improvement, such as verb tenses, article
                usage, and sentence structure. This can significantly enhance
                their writing and communication skills.
              </p>
            </div>

            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">Freelancers</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Freelancers rely solely on their online presence to attract
                clients. Strong written communication skills are paramount to
                showcasing your expertise and landing projects. A grammar
                checker helps you refine your pitches and proposals, eliminating
                grammatical errors that might deter potential clients. By
                presenting yourself professionally, you'll increase your chances
                of securing more high-quality work.
              </p>
            </div>
            <div className="md:col-span-1">
              <h3 className="mb-4 text-xl font-bold">
                Anyone Who Writes Online:
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In today's digital world, our online writing often forms first
                impressions. A grammar checker can help ensure clear and
                professional communication in emails, social media posts, blog
                entries, or online comments. This can be especially important
                for personal branding and building a positive online reputation.
              </p>
            </div>
          </div>
        </div>
        <FAQ faqs={grammarCheckerFaq} />
      </Container>
    </>
  );
};

export default GrammarChecker;
