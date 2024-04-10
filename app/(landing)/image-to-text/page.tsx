import Container from "@/components/common/Container";
import Title from "@/components/common/title";
import { features } from "@/data/app_data";
import ConverImage from "./components/ConverImage";
import FAQ from "@/components/common/faq";
import { imageToTextFaq } from "@/data/faq";

const ImageToText = () => {
  const titleContent = features[3];
  return (
    <Container>
      <Title title={titleContent.title} subtitle={titleContent.description} />
      <ConverImage />
      <FAQ faqs={imageToTextFaq} />
    </Container>
  );
};

export default ImageToText;
