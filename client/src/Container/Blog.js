import { Container, VStack, StackDivider } from "@chakra-ui/react";

import BlogList from "../Components/Blog";
import BlogHero from "../Components/Hero";

const blogArr = ["1", "2", "3"];
const text = `Do you want to educate yourself on financial topics? Do you want to take well informed financial decisions? You have come to the right place.
`;
export default function BlogContainer() {
  return (
    <Container maxW="5xl" p="12">
      <BlogHero title="Blogs" text={text} />
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
