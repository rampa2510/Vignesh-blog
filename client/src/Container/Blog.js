import BlogView from "../Views/Blog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BlogContainer() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/blog/${id}`, { method: "GET" }).then(
        (res) => res.json()
      );
      setData(resp.data);
    })();
  }, [id]);
  return <BlogView data={data} />;
}
