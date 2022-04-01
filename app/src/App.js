import { useState } from "react";
import "./App.css";
import DocsList from "./doc-viewer/components/docs-list";
import DocsView from "./doc-viewer/components/docs-view";

function App() {
  const useSelectedDoc = useState({ id: -1 });

  return (
    <div className="App">
      <h1>HELLO</h1>
      <div
        style={{
          maxWidth: "1024px",
          height: "600px",
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          border: "2px solid #dddddd",
          borderRadius: "12px",
        }}
      >
        <DocsList useSelectedDoc={useSelectedDoc} />
        <DocsView useSelectedDoc={useSelectedDoc} />
      </div>
    </div>
  );
}

export default App;
