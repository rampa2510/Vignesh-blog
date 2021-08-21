import { Container, Image, VStack } from "@chakra-ui/react";
import "../App.css";
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
      <Container maxW="fit-content" p={"100px"}>
        <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
      </Container>
    </VStack>
  );
}
