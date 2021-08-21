import { Box, Text, Image, Link, Heading } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export default function BlogList({ data }) {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box
          width={{ base: "100%", sm: "85%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
        >
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            as={ReachLink}
            to={`/blog/${data._id}`}
          >
            <Image
              borderRadius="lg"
              src={`${data.blogPhotoUrl}`}
              alt="some good alt text"
              objectFit="contain"
            />
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <Heading marginTop="1">
          <Link
            as={ReachLink}
            to={`/blog/${data._id}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          fontSize="lg"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Text>
      </Box>
    </Box>
  );
}
