import { useCallback, useState } from "react";
import LoginContainer from "./Login";
import EditorContainer from "./Editor";
import { Helmet } from "react-helmet";

export default function AdminContainer() {
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = useCallback(async (password) => {
    setLoading(true);
    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setLoading(false);

    if (data.success) {
      return setIsLoggedIn(true);
    }
    setError(true);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Editor page</title>
        <meta
          name="description"
          content="This is the editors page where the blog is written"
        />
      </Helmet>
      {isLoggedIn ? (
        <EditorContainer />
      ) : (
        <LoginContainer
          isLoading={isLoading}
          error={error}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
