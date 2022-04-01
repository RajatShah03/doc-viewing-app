import axios from "axios";
import React, { useEffect, useState } from "react";

const fakeDoc = "https://calibre-ebook.com/downloads/demos/demo.docx";

const DocRenderer = ({ data, buffer }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const file = new File([buffer], "abc.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    console.log({ file });

    const formData = new FormData();
    formData.append("name", "abc.docx");
    formData.append("file", file);

    fetch("http://localhost:8000/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUrl(res.url));
  }, [buffer]);

  return (
    <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
      {url && (
        <iframe
          id="doc-frame"
          title="Doc-Previewer"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${fakeDoc}`}
          width="100%"
          height="100%"
          frameBorder="0"
        >
          This is an embedded{" "}
          <a target="_blank" rel="noreferrer" href="http://office.com">
            Microsoft Office
          </a>{" "}
          document, powered by{" "}
          <a target="_blank" rel="noreferrer" href="http://office.com/webapps">
            Office Online
          </a>
          .
        </iframe>
      )}
    </div>
  );
};

export default DocRenderer;
