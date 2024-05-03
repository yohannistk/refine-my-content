import Image from "next/image";
import React from "react";
import paraphraseIcon from "../../public/icons/exchange_302409.png";
import summarizerIcon from "../../public/icons/letter_1027530.png";
import grammarCheckIcon from "../../public/icons/application_14061644.png";
const Features = () => {
  return (
    <section className="tails-selected-element py-20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold tracking-tight">
          Grammar Checker
        </h2>
        <p className="text-muted-foreground mt-2 text-center text-lg">
          Grammar Checker identifies and corrects errors in your writing,
          ensuring clarity and professionalism.
        </p>
        <div className="mt-10 grid grid-cols-4 gap-8 sm:grid-cols-8 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div
            className="bg-muted relative col-span-4 flex flex-col items-center justify-between space-y-4 overflow-hidden px-8 py-12 sm:rounded-xl"
            data-rounded="rounded-xl"
            data-rounded-max="rounded-full"
          >
            <div
              className="rounded-full"
              data-primary="blue-500"
              data-rounded="rounded-full"
            >
              {/* <a href="https://www.freepik.com/search">Icon by Roundicons Premium</a> */}
              <Image
                alt="Grammar Icon"
                width={50}
                height={50}
                src={grammarCheckIcon}
              />
            </div>
            <h4 className="text-xl font-medium">Grammar Checker</h4>
            <p className="text-muted-foreground text-center text-base">
              Grammar Checker identifies and corrects errors in your writing,
              ensuring clarity and professionalism.
            </p>
          </div>
          <div
            className="bg-muted relative col-span-4 flex flex-col items-center justify-between space-y-4 overflow-hidden px-8 py-12 sm:rounded-xl"
            data-rounded="rounded-xl"
            data-rounded-max="rounded-full"
          >
            <div
              className="rounded-full"
              data-primary="blue-500"
              data-rounded="rounded-full"
            >
              {/*<a href="https://www.freepik.com/search">Icon by Smashicons</a> */}
              <Image
                alt="Paraphraser Icon"
                width={50}
                height={50}
                src={paraphraseIcon}
              />
            </div>
            <h4 className="text-xl font-medium">Paraphraser</h4>
            <p className="text-muted-foreground text-center text-base">
              Paraphraser rewrites your sentences in fresh ways, helping you
              find new clarity and avoid plagiarism.
            </p>
          </div>
          <div
            className="bg-muted relative col-span-4 flex flex-col items-center justify-between space-y-4 overflow-hidden px-8 py-12 sm:rounded-xl"
            data-rounded="rounded-xl"
            data-rounded-max="rounded-full"
          >
            <div
              className="rounded-full"
              data-primary="blue-500"
              data-rounded="rounded-full"
            >
              {/*<a href="https://www.freepik.com/search">Icon by Freepik</a> */}
              <Image
                alt="Summarizer Icon"
                width={50}
                height={50}
                src={summarizerIcon}
              />
            </div>
            <h4 className="text-xl font-medium">Summarizer</h4>
            <p className="text-muted-foreground text-center text-base">
              Summarizer condenses lengthy text into key ideas, saving you time
              and helping you grasp the essentials quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
