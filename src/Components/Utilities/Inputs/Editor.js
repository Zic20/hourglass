import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = (props) => {
  const [value, setValue] = useState("");
  const toolbarOptions = ['bold', 'italic', 'underline'];
  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};

export default Editor;
