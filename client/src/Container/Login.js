import { useState } from "react";
import LoginView from "../Views/Login";

export default function LoginContainer({ error, onSubmit, isLoading }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <LoginView
      isLoading={isLoading}
      error={error}
      onSubmit={onSubmit}
      show={show}
      handleClick={handleClick}
    />
  );
}
