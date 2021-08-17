import { useCallback, useState } from "react";
import Login from "./Login";

function App() {
  const [error, setError] = useState(false);
  const [isEditorVisible, setVisible] = useState(false);

  const onSubmit = useCallback(async (password) => {
    const data = await fetch("http://localhost:3050/api/login", {
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

  return isEditorVisible ? null : <Login error={error} onSubmit={onSubmit} />;
}

export default App;
