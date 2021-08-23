import { useCallback, useState } from "react";
import LoginContainer from "./Login";

export default function EditorContainer() {
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
      console.log(data.success);

      return setIsLoggedIn(true);
    }
    setError(true);
  }, []);

  return isLoggedIn ? null : (
    <LoginContainer isLoading={isLoading} error={error} onSubmit={onSubmit} />
  );
}
