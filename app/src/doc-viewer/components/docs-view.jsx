import axios from "axios";
import { useEffect, useState } from "react";
import printJs from "print-js";
import DocumentRenderer from "./document-renderer";
import { shareFiles } from "../utils/share";

/**
 * Docs view
 */
function DocsView({ useSelectedDoc }) {
  const [selectedDoc] = useSelectedDoc;
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    if (selectedDoc.ext) {
      setLoading(true);
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
          setDoc(url);
          setBlob(new Blob([new Uint8Array(res.data.body.data).buffer]));
          setLoading(false);
        });
    }
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
    <div style={{ width: "70%", padding: "20px 40px", position: "relative" }}>
      <h3>Select a document</h3>
      {loading && <div>Loading...</div>}
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
            <button
              onClick={() =>
                shareFiles(
                  new File([blob], "test.jpg", {
                    type: "image/jpeg",
                  })
                )
              }
            >
              Share
            </button>
            <button>
              <a
                href={doc}
                download={selectedDoc.fn}
                style={{ textDecoration: "none" }}
              >
                Download
              </a>
            </button>
            <button onClick={handlePrint}>Print</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default DocsView;
