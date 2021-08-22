import { Container, Image, useColorMode, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "../App.css";

export default function BlogView({ data }) {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colorMode);

  useEffect(() => {
    setColor(colorMode);
  }, [colorMode]);

  return (
    <VStack p={"20px"}>
      <Container centerContent>
        <Image
          src={`${data.blogPhotoUrl}`}
          alt="some good alt text"
          objectFit="contain"
        />
      </Container>
      <SunEditor
        setOptions={{ height: "100%" }}
        hideToolbar={true}
        setContents={data.html}
        disable={true}
        setDefaultStyle={`background-color:${
          color === "dark" ? "rgb(26,32,44)" : "rgb(255,255,255"
        };color:${color === "dark" ? "#fff" : "rgb(27,32,45)"}`}
      />
    </VStack>
  );
}
