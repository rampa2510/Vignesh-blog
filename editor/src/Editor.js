import { useCallback, useMemo, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function EditorContainer() {
  const [value, setValue] = useState(localStorage.getItem("data") || "");
  const [file, setFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [headerUrl, setHeaderUrl] = useState("null");
  const [url, setUrl] = useState("");

  const onChange = useCallback((value) => {
    setValue(value);

    localStorage.setItem("data", JSON.stringify(value));
  }, []);

  const onSubmit = useCallback(async () => {
    localStorage.removeItem("data");
    const body = JSON.stringify({
      blogPhotoUrl: headerUrl,
      blog: value,
    });
    await fetch("http://localhost:3050/api/blog", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setValue("");
  }, [headerUrl, value]);

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

  const onFileUpload = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  const onHeaderUpload = useCallback((e) => {
    setHeaderFile(e.target.files[0]);
  }, []);

  const onFileSubmit = useCallback(
    async (type = "") => {
      const formData = new FormData();
      let fileToBeUpload;
      if (type.length) {
        fileToBeUpload = headerFile;
      } else {
        fileToBeUpload = file;
      }
      formData.append("upl", fileToBeUpload);
      const resp = await fetch("http://localhost:3050/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      if (type.length) {
        setHeaderUrl(resp.url);
      } else {
        setUrl(resp.url);
      }
    },
    [file, headerFile]
  );

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
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={onHeaderUpload}
      />
      <input
        type="submit"
        value="Upload File"
        onClick={() => onFileSubmit("h")}
      />
      <div>{headerUrl.length ? "File uploaded" : null}</div>
      <br />
      <input type="submit" onClick={onSubmit} />
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={onFileUpload}
      />
      <input type="submit" value="Upload File" onClick={() => onFileSubmit()} />
      <br />
      <div> The url = {url}</div>
    </>
  );
}
