import { useState } from "react";
import FormatTable from "./FormateTable";
import "../styles/video.css";

export default function VideoInfo({ info, startDownload }) {
  const [tab, setTab] = useState("video");
  if (!info) return null;
  return (
    <div className="video-container">
      <div className="video-left">
        <iframe
          width="320"
          height="180"
          src={`https://www.youtube.com/embed/${info.video_id}`}
          allowFullScreen
        ></iframe>

        <h3 className="video-title">
          {info.title}
        </h3>
      </div>

      <div className="video-right">
        <div className="tabs">
          <button
            className={tab === "audio" ? "active" : ""}
            onClick={() => setTab("audio")}
          >
            Audio
          </button>

          <button
            className={tab === "video" ? "active" : ""}
            onClick={() => setTab("video")}
          >
            Video
          </button>

          <button
            className={tab === "other" ? "active" : ""}
            onClick={() => setTab("other")}
          >
            Other
          </button>
        </div>

        {tab === "video" && info.formats && (
          <FormatTable formats={info.formats} startDownload={startDownload} />
        )}

        {tab === "audio" && info.audio_formats && (
          <FormatTable
            formats={info.audio_formats}
            startDownload={startDownload}
          />
        )}

        {tab === "other" && info.other_formats && (
          <FormatTable
            formats={info.other_formats}
            startDownload={startDownload}
          />
        )}
      </div>
    </div>
  );
}
