import {
  VStack,
  Image,
  Box,
  Text,
  Container,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import HeaderWUnderline from "../Components/HeaderWUnderline";

const thingsArray = ["Finance", "Taxation", "Investment", "Insurance"];
export default function AboutContainer() {
  const [isImgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta
          name="description"
          content="A little bit about me and the things I do. Also the things I can help you with"
        />
        <meta
          name="keywords"
          content="Vignesh,Nayak,FinMind,Indian,Finance,Investing"
        />
      </Helmet>
      <VStack minH={"85vh"} p={"20px"}>
        <Box width={{ base: "90%", sm: "30%" }}>
          <Skeleton isLoaded={isImgLoaded}>
            <Image
              borderRadius="full"
              src={
                "https://github.com/rampa2510/Vignesh-blog/blob/master/client/src/Assets/172304070_1363943550671171_5457290388790020108_n.jpg?raw=true"
              }
              onLoad={() => setImgLoaded(true)}
            />
          </Skeleton>
        </Box>
        <HeaderWUnderline header="About Me" />
        <Container>
          <Text fontSize={{ base: "1xl", md: "2xl", lg: "2xl" }}>
            Hi this is Vignesh Nayak this is a place ,Where We can discuss
            anything and everything happening in the finance world.I will write
            blogs on topics which are related to financial literacy, Capital
            Markets, Economy, Taxation etc. So plz share and also feel free for
            your suggestions I am open for Constructive Criticism🙏
          </Text>
        </Container>
        <Container centerContent>
          <HeaderWUnderline header="I can help in" />
          <SimpleGrid columns={{ sm: 2, md: 2 }} spacing="40px">
            {thingsArray.map((t) => (
              <Text fontSize={{ base: "1xl", md: "2xl", lg: "2xl" }} key={t}>
                {t}
              </Text>
            ))}
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
}
