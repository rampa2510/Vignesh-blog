import { useCallback, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function EditorContainer() {
  const [value, setValue] = useState(localStorage.getItem("data") || "");

  const onChange = useCallback((value) => {
    setValue(value);

    localStorage.setItem("data", JSON.stringify(value));
  });

  const onSubmit = useCallback(() => {
    console.log(value);
  });

  return (
    <>
      <SunEditor
        defaultValue="<p>The editor's default value</p>"
        onChange={onChange}
        setOptions={{
          height: 200,
          buttonList: buttonList.complex,
        }}
      />
      <input type="submit" onClick={onSubmit} />
    </>
  );
}
