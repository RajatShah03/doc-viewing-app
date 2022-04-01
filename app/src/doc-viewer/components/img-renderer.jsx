import React from "react";

const ImgRenderer = ({ data }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        src={data}
        alt="preview"
      />
    </div>
  );
};

export default ImgRenderer;
