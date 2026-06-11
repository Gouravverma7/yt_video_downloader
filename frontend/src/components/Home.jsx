import { useState } from "react";
import API from "../api/api";
import SearchBox from "../components/SearchBox";
import VideoInfo from "../components/VideoInfo";

export default function Home() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const fetchInfo = async () => {
    const res = await API.post("info/", { url });
    setInfo(res.data);
  };

  const startDownload = async (format_id) => {
  const response = await fetch("http://127.0.0.1:8000/api/download/",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url,
        format_id
      })
    }
  );

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "video.mp4";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Download Video and Audio from YouTube
      </h2>
      <SearchBox url={url} setUrl={setUrl} fetchInfo={fetchInfo} />
      <VideoInfo info={info} startDownload={startDownload} />
    </>
  );
}
