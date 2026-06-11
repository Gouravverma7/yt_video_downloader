import yt_dlp
from urllib.parse import urlparse, parse_qs

def format_size(bytes_size):
    if not bytes_size:
        return "Unknown"

    for unit in ["B", "KB", "MB", "GB"]:
        if bytes_size < 1024:
            return f"{bytes_size:.2f} {unit}"
        bytes_size /= 1024


def get_quality_label(height):
    if height >= 4320:
        return "8K UHD"
    elif height >= 2160:
        return "2160 (4K UHD)"
    elif height >= 1440:
        return "1440p (2K QHD)"
    elif height >= 1080:
        return "1080p (Full HD)"
    elif height >= 720:
        return "720p (HD)"
    else:
        return f"{height}p"


# Extract video ID from different YouTube URLs
def get_video_id(url):
    parsed = urlparse(url)
    if "youtube.com" in parsed.netloc:
        if parsed.path == "/watch":
            return parse_qs(parsed.query)["v"][0]
        if parsed.path.startswith("/shorts/"):
            return parsed.path.split("/")[2]
        if parsed.path.startswith("/embed/"):
            return parsed.path.split("/")[2]
    if "youtu.be" in parsed.netloc:
        return parsed.path[1:]

    return None


def get_video_info(url):
    video_id = get_video_id(url)
    ydl_opts = {
        "quiet": True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        try:
            info = ydl.extract_info(url, download=False)
        except Exception as e:
            return {
                "error": str(e)
            }

    formats = []
    for f in info["formats"]:
        height = f.get("height")
        ext = f.get("ext")
        if height and ext == "mp4":
            size = f.get("filesize") or f.get("filesize_approx")
            formats.append({
                "format_id": f["format_id"],
                "quality": get_quality_label(height),
                "height": height,
                "ext": ext,
                "size": format_size(size)
            })

    seen = set()
    clean_formats = []

    for f in formats:
        if f["height"] not in seen:
            seen.add(f["height"])
            clean_formats.append(f)

    clean_formats = sorted(
        clean_formats,
        key=lambda x: x["height"],
        reverse=True
    )

    other_formats = []
    for f in info["formats"]:
        height = f.get("height")
        ext = f.get("ext")

        if height and ext in ["webm", "mkv", "mov"]:
            size = f.get("filesize") or f.get("filesize_approx")
            other_formats.append({
                "format_id": f["format_id"],
                "quality": get_quality_label(height),
                "ext": ext,
                "size": format_size(size)
            })

    audio_formats = [
        {
            "quality": "MP3 - 320kbps",
            "size": "Best",
            "format_id": "bestaudio",
            "ext": "mp3"
        },
        {
            "quality": "MP3 - 128kbps",
            "size": "Good",
            "format_id": "bestaudio",
            "ext": "mp3"
        }
    ]

    return {
        "title": info["title"],
        "thumbnail": info["thumbnail"],
        "video_id": video_id,
        "duration": info.get("duration"),
        "formats": clean_formats,
        "audio_formats": audio_formats,
        "other_formats": other_formats
    }