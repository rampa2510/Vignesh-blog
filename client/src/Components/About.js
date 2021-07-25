import { VStack, Image, Box, Text, Container } from "@chakra-ui/react";
import HeaderWUnderline from "./HeaderWUnderline";

export default function AboutContainer() {
  return (
    <VStack minH={"85vh"} p={"20px"}>
      <Box width={{ base: "90%", sm: "30%" }}>
        <Image
          borderRadius="lg"
          src={
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
          }
        />
      </Box>
      <HeaderWUnderline header="About Me" />
      <Container>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
        </Text>
      </Container>
    </VStack>
  );
}
