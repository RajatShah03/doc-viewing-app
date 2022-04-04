export function shareFiles(data) {
  let files;
  if (Array.isArray(data)) {
    files = data;
  } else {
    files = [data];
  }

  if (navigator.canShare && navigator.canShare({ files })) {
    navigator
      .share({
        title: "Test file",
        file: files,
      })
      .then((res) => console.log({ res }))
      .catch((e) => console.log("Sharing not supported"));
  }
}
