import { Heading, Text, useBreakpointValue } from "@chakra-ui/react";

export default function HeaderWUnderline({ header }) {
  return (
    <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
      <Text
        as={"span"}
        position={"relative"}
        _after={{
          content: "''",
          width: "full",
          height: useBreakpointValue({ base: "20%", md: "30%" }),
          position: "absolute",
          bottom: 1,
          left: 0,
          bg: "pink.400",
          zIndex: -1,
        }}
      >
        {header}
      </Text>
    </Heading>
  );
}
