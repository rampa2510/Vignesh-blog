import BlogView from "../Views/Blog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function BlogContainer() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/blog/${id}`, { method: "GET" }).then(
        (res) => res.json()
      );
      setData(resp.data);
      setLoading(false);
    })();
  }, [id]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta
          name="keywords"
          content="Vignesh,Nayak,FinMind,Indian,Finance,Investing"
        />
      </Helmet>
      <Skeleton isLoaded={!isLoading}>
        <BlogView data={data} />
      </Skeleton>
    </>
  );
}
