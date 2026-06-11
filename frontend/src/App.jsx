import { useState } from "react";
import API from "./api/api";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import VideoInfo from "./components/VideoInfo";

export default function App() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    if (!url || loading) return;
    setLoading(true);
    setInfo(null);
    try {
      const res = await API.post("info/", { url });
      if (res.data) {
        setInfo(res.data);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const startDownload = async (format_id) => {

  const response = await fetch(
    "http://127.0.0.1:8000/api/download/",
    {
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

  if (!response.ok) {
    alert("Download failed");
    return;
  }

  const blob = await response.blob();

  const downloadUrl =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = downloadUrl;

  a.download = "video.mp4";

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.URL.revokeObjectURL(
    downloadUrl
  );
};

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Download Video and Audio from YouTube
      </h2>

      <SearchBox
        url={url}
        setUrl={setUrl}
        fetchInfo={fetchInfo}
        loading={loading}
      />

      {loading && (
        <p style={{ textAlign: "center" }}>⏳ Fetching video info...</p>
      )}

      <VideoInfo info={info} startDownload={startDownload} />
    </>
  );
}


// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
// // import Navbar from "./components/Navbar";
// // import Home from "./pages/Home";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Home />
//     </>
//   );
// }