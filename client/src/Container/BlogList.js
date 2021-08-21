import { Container, VStack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BlogList from "../Components/Blog";
import BlogHero from "../Components/Hero";

const text = `Do you want to educate yourself on financial topics? Do you want to take well informed financial decisions? You have come to the right place.
`;
export default function BlogContainer() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/blog", { method: "GET" }).then((res) =>
        res.json()
      );

      setBlogData(resp.data);
    })();
  }, []);

  return (
    <Container maxW="5xl" p="12">
      <BlogHero title="Blogs" text={text} />
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="center"
      >
        {blogData
          ? blogData.map((d) => <BlogList data={d} key={d._id} />)
          : null}
      </VStack>
    </Container>
  );
}
