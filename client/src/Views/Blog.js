import { Container, Image, VStack } from "@chakra-ui/react";
import EditorView from "./Editor";

export default function BlogView({ data }) {
  return (
    <VStack p={"20px"}>
      <Container centerContent>
        <Image
          src={`${data.blogPhotoUrl}`}
          alt="some good alt text"
          objectFit="contain"
        />
      </Container>
      <EditorView html={data.html} isBlog={true} />
    </VStack>
  );
}
