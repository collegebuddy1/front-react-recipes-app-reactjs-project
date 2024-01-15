import { useEffect, useRef, useState } from "react";
import "../uploadWidget/UploadWidget.css";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dkbwmuo7n", //usar env file
        uploadPreset: "dlycori1",
      },

      function (error, result) {
        if (result.event === "success") {
          props.getUrlFunction(result.info.secure_url);
          props.onAdd();
        }
      }
    );
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-custom rounded-4 text-white"
        onClick={() => widgetRef.current.open()}
      >
        { props.text ? props.text : 'Sube una foto de tu receta'}
      </button>
      {props.added && <span className="d-inline mx-2">☑</span>}
    </>
  );
};
export default UploadWidget;
