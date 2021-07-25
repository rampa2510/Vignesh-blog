import { Container, VStack, StackDivider } from "@chakra-ui/react";

import BlogList from "../Components/Blog";

const blogArr = ["1", "2", "3"];
export default function BlogContainer() {
  return (
    <Container maxW="7xl" p="12">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="center"
      >
        {blogArr.map((d) => (
          <BlogList key={d} />
        ))}
      </VStack>
    </Container>
  );
}
