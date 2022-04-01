import axios from "axios";
import { useEffect, useState } from "react";
import printJs from "print-js";
import DocumentRenderer from "./document-renderer";

function DocsView({ useSelectedDoc }) {
  const [selectedDoc] = useSelectedDoc;
  const [doc, setDoc] = useState(null);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://doc-viewer-server.herokuapp.com/api?type=${selectedDoc.ext}`
      )
      .then((res) => {
        console.log({
          res: res.data,
          buf: res.data.body,
        });
        const url = URL.createObjectURL(
          new Blob([new Uint8Array(res.data.body.data).buffer])
        );
        console.log({ url });
        setDoc(url);
        setBlob(new Blob([new Uint8Array(res.data.body.data).buffer]));
      });
  }, [selectedDoc.ext]);

  const handlePrint = (event) => {
    if (!["document", "text"].includes(selectedDoc.type)) {
      printJs(doc, selectedDoc.type);
    } else if (selectedDoc.type === "document") {
      const frame = document.getElementById("doc-frame").contentWindow;
      frame.focus();
      frame.print();
    } else if (selectedDoc.type === "text") {
      const textData = document
        .getElementById("text-frame")
        .contentDocument.getElementsByTagName("pre")[0].innerHTML;
      const printWindow = window.open("", "PRINT", "height=400,width=600");
      printWindow.document.write("</head><body><pre>");
      printWindow.document.write(textData);
      printWindow.document.write("</pre></body></html>");
      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div style={{ width: "70%", padding: "80px 40px", position: "relative" }}>
      {selectedDoc && doc ? (
        <>
          <DocumentRenderer type={selectedDoc.ext} data={doc} blob={blob} />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              border: "1px solid grey",
            }}
          >
            <button>S</button>
            <button>D</button>
            <button onClick={handlePrint}>P</button>
          </div>
        </>
      ) : (
        <div>Select a document</div>
      )}
    </div>
  );
}

export default DocsView;
