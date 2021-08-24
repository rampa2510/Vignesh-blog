import {
  Box,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export default function BlogDetails({
  title,
  setTitle,
  description,
  setDescription,
}) {
  return (
    <Box
      mt={"40px"}
      maxW={"420px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={"20px"}
      textAlign="center"
      mb={"40px"}
    >
      <VStack m={"20px"}>
        <Heading>Details</Heading>
        <Input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </VStack>
    </Box>
  );
}
