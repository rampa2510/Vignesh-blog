import { Box, Text, Image, Link, Heading } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export default function BlogList() {
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
            textDecoration="none" _hover={{ textDecoration: "none" }}
            as={ReachLink}
            to="/blog/1"
          >
            <Image
              borderRadius="lg"
              src={
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
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
            to="/blog/1"
            textDecoration="none" 
            _hover={{ textDecoration: "none" }}
          >
            Blog article title
          </Link>
        </Heading>
        <Text as="p" marginTop="2" fontSize="lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </Box>
    </Box>
  );
}
