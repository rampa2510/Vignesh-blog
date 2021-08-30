import { Container } from "@chakra-ui/react";
import ContactView from "../Views/Contact";
import ContactHero from "../Components/Hero";
import { useCallback } from "react";

const text =
  "Want to contact me? If you want to give any constructive critiscim to me, then please contact me";

export default function ContactContainer() {
  const onSubmit = useCallback(async (fName, lName, email, query) => {
    const body = JSON.stringify({
      fName,
      lName,
      email,
      query,
    });
    const resp = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    console.log(resp);
  }, []);
  return (
    <Container maxW="5xl" p="12">
      <ContactHero title="Contact Me" text={text} />
      <ContactView onSubmit={onSubmit} />
    </Container>
  );
}
