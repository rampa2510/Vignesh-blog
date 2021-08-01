import { VStack, Image, Box, Text, Container } from "@chakra-ui/react";
import HeaderWUnderline from "../Components/HeaderWUnderline";

export default function AboutContainer() {
  return (
    <VStack minH={"85vh"} p={"20px"}>
      <Box width={{ base: "90%", sm: "30%" }}>
        <Image
          borderRadius="lg"
          src={"../Assets/172304070_1363943550671171_5457290388790020108_n.jpg"}
        />
      </Box>
      <HeaderWUnderline header="About Me" />
      <Container>
        <Text>
          Hi this is Vignesh Nayak this is a place ,Where We can discuss
          anything and everything happening in the finance world.I will write
          blogs on topics which are related to financial literacy, Capital
          Markets, Economy, Taxation etc. So plz share and also feel free for
          your suggestions I am open for Constructive Criticism🙏
        </Text>
      </Container>
    </VStack>
  );
}
