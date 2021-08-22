import { useCallback, useState } from "react";
import Editor from "./Editor";
import Login from "./Login";

function App() {
  const [error, setError] = useState(false);
  const [isEditorVisible, setVisible] = useState(false);

  const onSubmit = useCallback(async (password) => {
    const data = await fetch("http://13.233.142.11:3050/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (data.success) {
      console.log(data.success);

      return setVisible(true);
    }
    console.log(data.success);
    setError(true);
  }, []);

  return isEditorVisible ? (
    <Editor />
  ) : (
    <Login onSubmit={onSubmit} error={error} />
  );
}

export default App;
