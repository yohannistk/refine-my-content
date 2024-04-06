import Container from "@/components/common/Container";
import Title from "@/components/common/title";
import { features } from "@/data/app_data";
import ConverImage from "./components/ConverImage";

const ImageToText = () => {
  const titleContent = features[3];
  return (
    <Container>
      <Title title={titleContent.title} subtitle={titleContent.description} />
      <ConverImage />
    </Container>
  );
};

export default ImageToText;
