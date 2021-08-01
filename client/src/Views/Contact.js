import {
  Box,
  Button,
  FormControl,
  Text,
  Stack,
  FormLabel,
  useColorModeValue,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";

export default function ContactForm() {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4}>
        <Stack spacing={10} direction={["Column", "row"]}>
          <FormControl id="fName">
            <FormLabel>First Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="lName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" />
          </FormControl>
        </Stack>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <Text mb="8px"> Query </Text>
        <Textarea placeholder="Enter Your query here" />
      </Stack>
      <Center mt={4}>
        <Button
          bg={"pink.400"}
          color={"white"}
          _hover={{
            bg: "pink.500",
          }}
          width={"100%"}
        >
          Sign in
        </Button>
      </Center>
    </Box>
  );
}
