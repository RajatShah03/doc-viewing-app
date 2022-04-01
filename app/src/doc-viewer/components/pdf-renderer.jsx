import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PDFRenderer = ({ data }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
      <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PDFRenderer;
