import React, { useReducer, useRef, useImperativeHandle } from "react";
import styles from "./Avatar.module.css";
import Button from "./Button";
import PersonIcon from "@mui/icons-material/Person";

const imageReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { src: action.val, hasImage: true };
  }
};

const Avatar = React.forwardRef((props, ref) => {
  const [imageState, dispatchImage] = useReducer(imageReducer, {
    src: "",
    hasImage: false,
  });

  const imgRef = useRef();

  const getImgSrc = () => {
    return imageState.hasImage ? imgRef.current.src : "";
  };

  useImperativeHandle(ref, () => {
    return { getImageSrc: getImgSrc };
  });

  const addImageHandler = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".png,.jpg,.jpeg";

    input.onchange = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        let dataUrl = reader.result;
        dispatchImage({ type: "USER_INPUT", val: dataUrl });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.imageContainer}>
        {imageState.hasImage && (
          <img alt="Insert here" ref={imgRef} src={imageState.src} />
        )}
        {!imageState.hasImage && (
          <div className={styles.placeholder}>
            <PersonIcon sx={{ fontSize: "100px" }} />
          </div>
        )}
      </div>
      <Button onClick={addImageHandler} className="btn__action">
        Add Image
      </Button>
    </div>
  );
});

export default Avatar;
