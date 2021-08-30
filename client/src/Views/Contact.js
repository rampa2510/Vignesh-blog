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
import { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
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
            <Input
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl id="lName">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </FormControl>
        </Stack>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Text mb="8px"> Query </Text>
        <Textarea
          placeholder="Enter Your query here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Stack>
      <Center mt={4}>
        <Button
          bg={"pink.400"}
          color={"white"}
          _hover={{
            bg: "pink.500",
          }}
          width={"100%"}
          onClick={() => onSubmit(fName, lName, email, query)}
        >
          Sign in
        </Button>
      </Center>
    </Box>
  );
}
