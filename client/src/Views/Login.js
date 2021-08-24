import {
  Heading,
  Box,
  Button,
  useColorModeValue,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LoginView({
  show,
  handleClick,
  error,
  isLoading,
  onSubmit,
}) {
  const [password, setPassword] = useState("");

  useEffect(() => console.log(password), [password]);

  return (
    <Container centerContent height={"85vh"}>
      <Box
        mt={"40px"}
        maxW={"420px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={"20px"}
        textAlign={"center"}
      >
        <VStack m={"20px"}>
          <Heading mb={"10px"} fontSize={"2xl"} fontFamily={"body"}>
            Login
          </Heading>
          <InputGroup size="md">
            <Input
              isInvalid={error}
              errorBorderColor="crimson"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            bg={"pink.400"}
            color={"white"}
            _hover={{
              bg: "pink.500",
            }}
            width={"100%"}
            isLoading={isLoading}
            onClick={() => onSubmit(password)}
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
