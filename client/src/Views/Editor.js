import { useColorMode } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "../App.css";

export default function EditorView({ isBlog, html, onChange,handleLoad }) {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colorMode);

  useEffect(() => {
    setColor(colorMode);
  }, [colorMode]);

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

  return (
    <SunEditor
    onLoad={handleLoad}
      setOptions={
        isBlog
          ? { height: "100%" }
          : {
              height: 200,
              buttonList: buttonList,
            }
      }
      hideToolbar={isBlog}
      setContents={html}
      onChange={onChange}
      disable={isBlog}
      setDefaultStyle={`background-color:${
        color === "dark" ? "rgb(26,32,44)" : "rgb(255,255,255)"
      };color:${color === "dark" ? "#fff" : "rgb(27,32,45)"}`}
    />
  );
}
