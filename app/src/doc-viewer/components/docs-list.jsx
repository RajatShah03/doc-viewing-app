import React from "react";

const DocsList = ({ useSelectedDoc }) => {
  const docs = [
    {
      id: 0,
      fn: "test.jpg",
      ext: "jpg",
      type: "image",
    },
    {
      id: 1,
      fn: "test.png",
      ext: "png",
      type: "image",
    },
    {
      id: 2,
      fn: "test.txt",
      ext: "txt",
      type: "text",
    },
    {
      id: 3,
      fn: "test.pdf",
      ext: "pdf",
      type: "pdf",
    },
    {
      id: 4,
      fn: "test.doc",
      ext: "doc",
      type: "document",
    },
    {
      id: 5,
      fn: "test.docx",
      ext: "docx",
      type: "document",
    },
  ];

  const [selectedDoc, setSelectedDoc] = useSelectedDoc;

  return (
    <div
      style={{
        width: "30%",
        padding: "20px",
        borderRight: "3px dotted #ccc",
      }}
    >
      <h3>Docs List</h3>
      <aside>
        {docs.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: "flex",
              border:
                selectedDoc.id === doc.id
                  ? "1.5px solid #bbb"
                  : "1.5px solid #ddd",
              margin: "8px 0",
              height: "70px",
              borderRadius: "6px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDoc(doc)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                padding: "12px",
                backgroundColor: "#eee",
                width: "20%",
              }}
            >
              {doc.type.toUpperCase()}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 4,
                padding: "12px",
              }}
            >
              {doc.fn}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default DocsList;
