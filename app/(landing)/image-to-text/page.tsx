import Container from "@/components/common/Container";
import Title from "@/components/common/title";
import { features } from "@/data/app_data";
import ConverImage from "./components/ConverImage";
import FAQ from "@/components/common/faq";
import { imageToTextFaq } from "@/data/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text from Images Instantly: Free Online OCR Converter",
  description: ` Extract text from pictures for free! Our powerful OCR tool converts images to text quickly and accurately.  No software needed, upload your image and get editable text instantly.`,
};

const ImageToText = () => {
  const titleContent = features[3];
  return (
    <>
      <Container>
        <ConverImage />
        <div className="max-w-4xl">
          <Title
            title={titleContent.title}
            subtitle={
              "Stuck with text in an image? Our suite of free tools includes an image-to-text converter powered by advanced OCR (Optical Character Recognition).  Just upload your image and instantly extract editable text, making documents and scanned files digitally searchable and easier to manage."
            }
          />

          <div className="my-9 mb-1 pb-4 pt-10 ">
            <div>
              <h2 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
                Who Can Use Our Image to Text Converter?
              </h2>
              <p className="text-muted-foreground text-lg">
                Our image to text converter is a versatile tool designed to
                benefit anyone who needs to extract text from images. Here are
                some examples:
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-accent-foreground mb-4 text-xl font-bold md:text-2xl">
                Students
              </h3>
              <p className="text-muted-foreground text-lg">
                Convert scanned study materials, textbooks, and handwritten
                notes into editable digital text for easier organization and
                studying.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-accent-foreground mb-4 text-xl font-bold md:text-2xl">
                Office Workers
              </h3>
              <p className="text-muted-foreground text-lg">
                Streamline data entry by effortlessly converting invoices,
                receipts, and other documents into editable formats. Maintain
                digital databases by scanning and digitizing paper documents.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-accent-foreground mb-4 text-xl font-bold md:text-2xl">
                Researchers
              </h3>
              <p className="text-muted-foreground text-lg">
                Extract text from research papers, historical documents, and
                other sources for further analysis and organization.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-accent-foreground mb-4 text-xl font-bold md:text-2xl">
                Writers and Journalists
              </h3>
              <p className="text-muted-foreground text-lg">
                Quickly capture text from physical sources like notes,
                interviews, or quotes for easy inclusion in your work.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-accent-foreground mb-4 text-xl font-bold md:text-2xl">
                Anyone with Visual Impairments
              </h3>
              <p className="text-muted-foreground text-lg">
                Access the written content within images, making information
                more readily available.
              </p>
            </div>
          </div>
        </div>
        <FAQ faqs={imageToTextFaq} />
      </Container>
    </>
  );
};

export default ImageToText;
