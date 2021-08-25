import { Button, Container } from "@chakra-ui/react";
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
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [headerUrl, setHeaderUrl] = useState("");

  const fileUpload = useCallback(async (file) => {
    const formData = new FormData();

    formData.append("upl", file);

    const resp = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    return resp.url;
  }, []);

  const onEditComplete = useCallback(async () => {
    setLoading(true);
    if (!title || !description || !headerUrl || !value) {
      return setError(true);
    }

    const body = JSON.stringify({
      blogPhotoUrl: headerUrl,
      blog: value,
      title,
      description,
    });

    await fetch("/api/blog", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
    setValue("");
    setDescription("");
    setLoading(false);
    localStorage.removeItem("data");
  }, [title, headerUrl, description, value]);

  return (
    <Container centerContent>
      <BlogDetails
        isError={isError}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <EditorView isBlog={false} html={value} onChange={onBlogChange} />
      <BlogImageDetails setHeader={setHeaderUrl} fileUpload={fileUpload} />
      <Button
        mt={"20px"}
        bg={"pink.400"}
        color={"white"}
        _hover={{
          bg: "pink.500",
        }}
        width={"100%"}
        onClick={onEditComplete}
        isLoading={isLoading}
      >
        Create Blog
      </Button>
    </Container>
  );
}
