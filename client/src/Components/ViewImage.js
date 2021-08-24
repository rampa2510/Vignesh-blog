import { Container, Image, Text } from "@chakra-ui/react";

export default function ViewImage({ alt, src }) {
  return (
    <Container mt={"20px"} centerContent>
      <Image mb="20px" boxSize="250px" alt={alt} objectFit="cover" src={src} />
      <Text>The url for image - {src}</Text>
    </Container>
  );
}
