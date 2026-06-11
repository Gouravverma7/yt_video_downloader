import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          VidRocket<span>.com</span>
        </div>

        <div className="nav-links">
          <Link to="/">YouTube Downloader</Link>
          <Link to="/mp4">YouTube to MP4</Link>
          <Link to="/mp3">YouTube to MP3</Link>
        </div>
      </div>
    </nav>
  );
}

