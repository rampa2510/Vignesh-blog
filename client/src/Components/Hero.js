import { Box, Button, Text } from "@chakra-ui/react";
import HeaderWUnderline from "./HeaderWUnderline";

export default function Hero({ title, text }) {
  return (
    <Box as="section">
      <Box
        maxW="2xl"
        mx="auto"
        px={{ base: "6", lg: "8" }}
        py={{ base: "16", sm: "20" }}
        textAlign="center"
      >
        <HeaderWUnderline header={title} />
        <Text mt="4" fontSize="lg">
          {text}
        </Text>
      </Box>
    </Box>
  );
}
