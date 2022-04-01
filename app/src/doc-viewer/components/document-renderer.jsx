import React from "react";
import DocRenderer from "./doc-renderer";
import ImgRenderer from "./img-renderer";
import PDFRenderer from "./pdf-renderer";
import TxtRenderer from "./txt-renderer";

const IMG_FORMAT = ["png", "jpg"];

const PDF_FORMAT = ["pdf"];

const DOC_FORMAT = ["doc", "docx"];

const TXT_FORMAT = ["txt"];

const DocumentRenderer = ({ type, data, buffer }) => {
  if (IMG_FORMAT.includes(type)) {
    return <ImgRenderer data={data} />;
  } else if (TXT_FORMAT.includes(type)) {
    return <TxtRenderer data={data} />;
  } else if (PDF_FORMAT.includes(type)) {
    return <PDFRenderer data={data} />;
  } else if (DOC_FORMAT.includes(type)) {
    return <DocRenderer data={data} buffer={buffer} />;
  }
  return <div>{type} not supported</div>;
};

export default DocumentRenderer;
