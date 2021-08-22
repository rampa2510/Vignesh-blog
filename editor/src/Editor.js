import { useCallback, useEffect, useMemo, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function EditorContainer() {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("data")) || ""
  );
  const [file, setFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [headerUrl, setHeaderUrl] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const onChange = useCallback((value) => {
    setValue(value);

    localStorage.setItem("data", JSON.stringify(value));
  }, []);

  const onSubmit = useCallback(async () => {
    localStorage.removeItem("data");

    if (!headerUrl || !value || !title || !desc) {
      return setError("All fields need to be filled");
    }

    const body = JSON.stringify({
      blogPhotoUrl: headerUrl,
      blog: value,
      title,
      description: desc,
    });

    await fetch("http://13.233.142.11:3050/api/blog", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setValue("");
    setHeaderUrl("");
    setUrl("");
    setTitle("");
    setDesc("");
    setHeaderFile("");
    setFile("");
    setError("");
  }, [headerUrl, value, title, desc]);

  const buttonList = useMemo(() => {
    return [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["removeFormat"],
      "/",
      ["align", "horizontalRule", "list", "table"],
      ["link", "image"],
      ["fullScreen", "showBlocks"],
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
      const resp = await fetch("http://13.233.142.11:3050/api/upload", {
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

  useEffect(() => {
    console.log(value);
    console.log();
  }, [value]);

  return (
    <>
      <div>{error}</div>
      <input
        type="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows="10"
        cols="50"
      ></textarea>

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
