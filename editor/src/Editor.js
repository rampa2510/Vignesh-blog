import { useCallback, useMemo, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function EditorContainer() {
  const [value, setValue] = useState(localStorage.getItem("data") || "");

  const onChange = useCallback((value) => {
    setValue(value);

    localStorage.setItem("data", JSON.stringify(value));
  }, []);

  const onSubmit = useCallback(() => {
    localStorage.removeItem("data");
    setValue("");
    console.log(value);
  }, [value]);

  const buttonList = useMemo(() => {
    return [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["removeFormat"],
      "/",
      ["align", "horizontalRule", "list", "table"],
      ["link", "image"],
      ["fullScreen"],
      ["preview", "print"],
      ["save", "template"],
    ];
  }, []);

  return (
    <>
      <SunEditor
        setContents={value}
        onChange={onChange}
        setOptions={{
          height: 200,
          buttonList: buttonList,
        }}
      />
      <input type="submit" onClick={onSubmit} />
    </>
  );
}
