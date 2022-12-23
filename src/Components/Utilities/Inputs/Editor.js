import React from "react";
import ReactQuill from "react-quill";
import formStyles from "../../Forms/Form.module.css";
import "react-quill/dist/quill.snow.css";

const Editor = React.forwardRef((props, ref) => {
  const toolbarOptions = ["bold", "italic", "underline"];

  const onChangeHandler = (value) => {
    props.onChange(value);
  };

  return (
    <ReactQuill
      ref={ref}
      className={formStyles.editor}
      modules={{
        toolbar: toolbarOptions,
      }}
      theme="snow"
      onChange={onChangeHandler}
      value={props.value}
    />
  );
});

export default Editor;
