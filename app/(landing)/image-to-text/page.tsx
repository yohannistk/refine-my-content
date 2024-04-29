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
    <Container>
      <ConverImage />
      <Title
        title={titleContent.title}
        subtitle={
          "Stuck with text in an image? Our suite of free tools includes an image-to-text converter powered by advanced OCR (Optical Character Recognition).  Just upload your image and instantly extract editable text, making documents and scanned files digitally searchable and easier to manage."
        }
      />
      <FAQ faqs={imageToTextFaq} />
    </Container>
  );
};

export default ImageToText;
