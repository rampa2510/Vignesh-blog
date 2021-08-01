import { Container } from "@chakra-ui/react";
import ContactView from "../Views/Contact";
import ContactHero from "../Components/Hero";

const text =
  "Want to contact me? If you want to give any constructive critiscim to me, then please contact me";

export default function ContactContainer() {
  return (
    <Container maxW="5xl" p="12">
      <ContactHero title="Contact Me" text={text} />
      <ContactView />
    </Container>
  );
}
