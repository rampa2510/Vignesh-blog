import { Skeleton } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorContainer from "./Editor";

const EditBlogaContainer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/blog/${id}`, { method: "GET" }).then(
        (res) => res.json()
      );
      setData(resp.data);
    })();
  }, [id]);
  useEffect(() => {
    if (data.html) {
      console.log(data);
      setLoading(false);
    }
  }, [data]);
  return isLoading ? (
    <Skeleton />
  ) : (
    <EditorContainer
      id={id}
      ehtml={data.html}
      etitle={data.title}
      edescription={data.description}
      eheaderUrl={data.blogPhotoUrl}
    />
  );
};

export default memo(EditBlogaContainer);
