import { Container, HStack, Image, Skeleton, VStack } from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useRef, useState } from "react";
import EditorView from "./Editor";

export default function BlogView({ data }) {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const url = useRef(window.location.href);
  return (
    <VStack p={"20px"}>
      <Container centerContent>
        <Image
          src={`${data.blogPhotoUrl}`}
          alt="some good alt text"
          objectFit="contain"
        />
      </Container>
      <Skeleton isLoaded={isEditorLoaded}>
        <EditorView
          html={data.html}
          isBlog={true}
          handleLoad={() => setIsEditorLoaded(true)}
        />
      </Skeleton>
      {/* <Button
        bg={"pink.400"}
        color={"white"}
        _hover={{
          bg: "pink.500",
        }}
        width={"10%"}
        mb={"20px"}
      >
        Like
      </Button> */}
      <HStack>
        <TelegramShareButton url={url.current} title={data.title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton url={url.current} title={data.title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={url.current} quote={data.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton
          url={url.current}
          title={data.title}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={url.current} title={data.title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </HStack>
    </VStack>
  );
}
