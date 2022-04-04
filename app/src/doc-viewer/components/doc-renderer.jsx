import React, { useEffect, useState } from "react";

const remoteDoc = "https://calibre-ebook.com/downloads/demos/demo.docx";

const DocRenderer = ({ data, blob }) => {
  const [url, setUrl] = useState("");
  const [useRemote, setUseRemote] = useState(false);

  useEffect(() => {
    const file = new File([blob], "abc.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const formData = new FormData();
    formData.append("name", "abc.docx");
    formData.append("file", file);
    fetch("https://doc-viewer-server.herokuapp.com/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUrl(res.url));
  }, [blob]);

  return (
    <div style={{ width: "100%", height: "78%" }}>
      <div>
        <input
          type="checkbox"
          value={useRemote}
          onChange={() => setUseRemote(!useRemote)}
        />
        <span>Use Remote document</span>
      </div>
      {/* {url && (
        <iframe
          id="doc-frame"
          title="Doc-Previewer"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            useRemote ? remoteDoc : url
          )}`}
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
      )} */}
      {url && (
        <iframe
          title="Doc-Previewer"
          className="doc"
          width={500}
          height={400}
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            useRemote ? remoteDoc : url
          )}&embedded=true`}
        ></iframe>
      )}
    </div>
  );
};

export default DocRenderer;
