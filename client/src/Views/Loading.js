import { Container, Heading, Spinner, VStack } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Container
      height="85vh"
      alignItems={"center"}
      justifyContent={"center"}
      maxW="5xl"
      centerContent
    >
      <VStack>
        <Spinner
          thickness="11px"
          speed="0.65s"
          emptyColor="gray.200"
          color="pink.400"
          size="xl"
        />
        <Heading>Loading</Heading>
      </VStack>
    </Container>
  );
}
