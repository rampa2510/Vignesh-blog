import { Container } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import BlogDetails from "../Components/BlogDetails";
import BlogImageDetails from "../Views/BlogImageDetails";
import EditorView from "../Views/Editor";

export default function EditorContainer() {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("data")) || ""
  );

  const onBlogChange = useCallback((value) => {
    setValue(value);
    localStorage.setItem("data", JSON.stringify(value));
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Container centerContent>
      <BlogDetails
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <EditorView isBlog={false} html={value} onChange={onBlogChange} />
      <BlogImageDetails />
    </Container>
  );
}
