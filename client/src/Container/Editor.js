import { Button, Container, Skeleton } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import BlogDetails from "../Components/BlogDetails";
import BlogImageDetails from "../Views/BlogImageDetails";
import EditorView from "../Views/Editor";

export default function EditorContainer({
  id,
  ehtml,
  etitle,
  edescription,
  eheaderUrl,
}) {
  const [value, setValue] = useState(
    ehtml || JSON.parse(localStorage.getItem("data")) || ""
  );
  // useEffect(() => setValue(ehtml), [ehtml]);

  const onBlogChange = useCallback((value) => {
    setValue(value);
    localStorage.setItem("data", JSON.stringify(value));
  }, []);

  const [title, setTitle] = useState(etitle);
  // useEffect(() => setTitle(etitle), [etitle]);
  const [description, setDescription] = useState(edescription);
  // useEffect(() => setDescription(edescription), [edescription]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [headerUrl, setHeaderUrl] = useState(eheaderUrl);
  // useEffect(() => setHeaderUrl(eheaderUrl), [eheaderUrl]);
  const [isEditiorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    if (edescription && eheaderUrl && ehtml && etitle) {
      setValue(ehtml);
      setTitle(etitle);
      setDescription(edescription);
      setHeaderUrl(eheaderUrl);
    }
  }, [ehtml, eheaderUrl, etitle, edescription]);

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

    console.log(title, description, headerUrl, value);
    if (!title || !description || !headerUrl || !value) {
      return setError(true);
    }

    const body = JSON.stringify({
      blogPhotoUrl: headerUrl,
      blog: value,
      title,
      description,
    });

    let url = `/api/blog/${id ? id : ""}`;
    let options = {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (id) {
      options.method = "PUT";
    }

    console.log(options, url);

    await fetch(url, options);
    setTitle("");
    setValue("");
    setDescription("");
    setLoading(false);
    localStorage.removeItem("data");
  }, [title, headerUrl, description, value, id]);

  return (
    <Container centerContent>
      <BlogDetails
        isError={isError}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <Skeleton isLoaded={isEditiorLoaded}>
        <EditorView
          handleLoad={() => setIsEditorLoaded(true)}
          isBlog={false}
          html={value}
          onChange={onBlogChange}
        />
      </Skeleton>
      <BlogImageDetails
        eheaderUrl={headerUrl}
        setHeader={setHeaderUrl}
        fileUpload={fileUpload}
      />
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
        {id ? "Update Blog" : "Create Blog"}
      </Button>
    </Container>
  );
}
