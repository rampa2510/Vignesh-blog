import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import ViewImage from "../Components/ViewImage";

export default function BlogImageDetails({ fileUpload, setHeader }) {
  const headerInputRef = useRef(null);
  const inputRef = useRef(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [headerUrl, setHeaderUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isHeaderUploading, setHeaderUpload] = useState(false);
  const [isImageUploading, setImageUpload] = useState(false);

  const onFileSubmit = useCallback(
    async (type = "") => {
      let fileToBeUpload;
      if (type.length) {
        fileToBeUpload = headerFile;
      } else {
        fileToBeUpload = imageFile;
      }

      const url = await fileUpload(fileToBeUpload);

      if (type.length) {
        setHeaderUrl(url);
        setHeader(url);
      } else {
        setImageUrls([...imageUrls, url]);
        setImageFile(null);
      }
    },
    [headerFile, imageUrls, imageFile, fileUpload]
  );

  const handleHeaderFileUplBtnClick = useCallback(async () => {
    setHeaderUpload(true);
    if (headerFile) {
      await onFileSubmit("Header");
    } else {
      headerInputRef.current.click();
    }
    setHeaderUpload(false);
  }, [headerFile, onFileSubmit]);

  const handleImageUplClick = useCallback(async () => {
    setImageUpload(true);
    if (imageFile) {
      await onFileSubmit();
    } else {
      inputRef.current.click();
    }
    setImageUpload(false);
  }, [imageFile, onFileSubmit]);

  return (
    <>
      <Box
        mt={"40px"}
        maxW={"420px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={"20px"}
        textAlign="center"
        mb={"40px"}
      >
        <Button
          bg={"pink.400"}
          color={"white"}
          _hover={{
            bg: "pink.500",
          }}
          width={"100%"}
          onClick={handleHeaderFileUplBtnClick}
          isLoading={isHeaderUploading}
        >
          {headerFile ? "Upload Header Image" : "Select Header Image"}
          <input
            type="file"
            multiple={false}
            hidden={true}
            ref={headerInputRef}
            onChange={(e) => setHeaderFile(e.target.files[0])}
            accept="image/png, image/gif, image/jpeg"
          />
        </Button>
        {headerUrl ? <ViewImage src={headerUrl} alt="The header file" /> : null}
      </Box>
      <Box
        mt={"40px"}
        maxW={"420px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={"20px"}
        textAlign="center"
        mb={"40px"}
      >
        {imageUrls.map((d, i) => (
          <ViewImage src={d} alt={`Image-${i}`} key={`Image-${i}`} />
        ))}
        <Button
          mt={"20px"}
          bg={"pink.400"}
          color={"white"}
          _hover={{
            bg: "pink.500",
          }}
          width={"100%"}
          onClick={handleImageUplClick}
          isLoading={isImageUploading}
        >
          {imageFile ? "Upload Image" : "Select Image"}
          <input
            type="file"
            multiple={false}
            hidden={true}
            ref={inputRef}
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/png, image/gif, image/jpeg"
          />
        </Button>
      </Box>
    </>
  );
}
