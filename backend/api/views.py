from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
from .utils import get_video_info
import yt_dlp
import tempfile
import os


@api_view(["POST"])
def video_info(request):
    url = request.data.get("url")
    if not url:
        return Response({
            "error": "URL required"
        })
    return Response(
        get_video_info(url)
    )


@api_view(["POST"])
def start_download(request):
    url = request.data.get("url")
    format_id = request.data.get("format_id")
    if not url or not format_id:
        return Response({
            "error": "url and format_id required"
        })
        
    temp_dir = tempfile.mkdtemp()

    ydl_opts = {
        "format": f"{format_id}+bestaudio/best",
        "merge_output_format": "mp4",
        "outtmpl": os.path.join(
            temp_dir,
            "%(title)s.%(ext)s"
        )
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(
            url,
            download=True
        )
        file_path = ydl.prepare_filename(
            info
        )
        if not os.path.exists(file_path):
            mp4_path = (
                os.path.splitext(
                    file_path
                )[0] + ".mp4"
            )
            if os.path.exists(mp4_path):
                file_path = mp4_path

    return FileResponse(
        open(file_path, "rb"),
        as_attachment=True,
        filename=os.path.basename(
            file_path
        )
    )