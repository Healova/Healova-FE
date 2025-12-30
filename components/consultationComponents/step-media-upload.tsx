"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Mic, Video, Camera, X, Play } from "lucide-react";
import { MediaFile } from "@/lib/types";

interface StepMediaUploadProps {
  uploadedFiles: MediaFile[];
  onFilesChange: (files: MediaFile[]) => void;
}

export function StepMediaUpload({
  uploadedFiles,
  onFilesChange,
}: StepMediaUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isCapturingImage, setIsCapturingImage] = useState(false);
  const [isVideoCameraOpen, setIsVideoCameraOpen] = useState(false);

  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoRecorder, setVideoRecorder] = useState<MediaRecorder | null>(
    null
  );

  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoChunksRef = useRef<Blob[]>([]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const fileType =
      e.currentTarget === imageInputRef.current
        ? "image"
        : e.currentTarget === audioInputRef.current
        ? "audio"
        : "video";

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const mediaFile: MediaFile = {
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        file,
        type: fileType,
        url,
      };
      onFilesChange([...uploadedFiles, mediaFile]);
    });

    if (e.currentTarget.value) {
      e.currentTarget.value = "";
    }
  };

  // Audio recording functions
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], `recording-${Date.now()}.webm`, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(blob);

        const mediaFile: MediaFile = {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          file,
          type: "audio",
          url,
        };
        onFilesChange([...uploadedFiles, mediaFile]);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setAudioRecorder(recorder);
      setIsRecordingAudio(true);
    } catch (error) {
      console.error("Error starting audio recording:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopAudioRecording = () => {
    if (audioRecorder && audioRecorder.state !== "inactive") {
      audioRecorder.stop();
      setIsRecordingAudio(false);
    }
  };

  // Video recording functions
  const startVideoCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });

      videoStreamRef.current = stream;
      setIsVideoCameraOpen(true);

      // 👇 SHOW PREVIEW IMMEDIATELY
      setTimeout(() => {
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.muted = true;
          videoPreviewRef.current.playsInline = true;

          videoPreviewRef.current
            .play()
            .catch((err) => console.error("Preview play error:", err));
        }
      }, 0);
    } catch (error) {
      console.error("Error opening video camera:", error);
      alert("Unable to access camera/microphone.");
    }
  };

  const startVideoRecording = () => {
    if (!videoStreamRef.current) return;

    const recorder = new MediaRecorder(videoStreamRef.current);
    videoChunksRef.current = [];

    recorder.ondataavailable = (e) => videoChunksRef.current.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(videoChunksRef.current, { type: "video/webm" });
      const file = new File([blob], `video-${Date.now()}.webm`, {
        type: "video/webm",
      });

      onFilesChange([
        ...uploadedFiles,
        {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          file,
          type: "video",
          url: URL.createObjectURL(blob),
        },
      ]);
    };

    recorder.start();
    setVideoRecorder(recorder);
    setIsRecordingVideo(true);
  };

  const stopVideoRecording = () => {
    if (videoRecorder && videoRecorder.state !== "inactive") {
      videoRecorder.stop();
      setIsRecordingVideo(false);

      // Clear video element first
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }

      // Then stop the stream tracks
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        videoStreamRef.current = null;
      }

      setIsVideoCameraOpen(false);
    }
  };

  const closeVideoCamera = () => {
    // Clear video element first
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }

    // Then stop the stream tracks
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      videoStreamRef.current = null;
    }

    setIsVideoCameraOpen(false);
  };

  useEffect(() => {
    if (
      (isVideoCameraOpen || isRecordingVideo) &&
      videoPreviewRef.current &&
      videoStreamRef.current
    ) {
      const video = videoPreviewRef.current;

      video.srcObject = videoStreamRef.current;
      video.muted = true;
      video.playsInline = true;

      video.play().catch(() => {});
    }
  }, [isVideoCameraOpen, isRecordingVideo]);

  // Image capture functions
  const startImageCapture = async () => {
    try {
      setIsCapturingImage(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
        cameraStreamRef.current = stream;

        cameraVideoRef.current.onloadedmetadata = () => {
          cameraVideoRef.current?.play().catch((err) => {
            console.error("Error playing video:", err);
          });
        };
      }
    } catch (error) {
      console.error("Error starting image capture:", error);
      setIsCapturingImage(false);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (cameraVideoRef.current && cameraVideoRef.current.videoWidth > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = cameraVideoRef.current.videoWidth;
      canvas.height = cameraVideoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(cameraVideoRef.current, 0, 0);
        ctx.restore();

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            const url = URL.createObjectURL(blob);

            const mediaFile: MediaFile = {
              id: `${Date.now()}-${Math.random()}`,
              name: file.name,
              file,
              type: "image",
              url,
            };
            onFilesChange([...uploadedFiles, mediaFile]);
            stopImageCapture();
          }
        }, "image/jpeg");
      }
    } else {
      alert("Camera is not ready. Please wait a moment and try again.");
    }
  };

  const stopImageCapture = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }

    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }

    setIsCapturingImage(false);
  };

  // Remove file
  const removeFile = (fileId: string) => {
    const file = uploadedFiles.find((f) => f.id === fileId);
    if (file) {
      URL.revokeObjectURL(file.url);
    }
    onFilesChange(uploadedFiles.filter((f) => f.id !== fileId));
  };

  return (
    <div className="space-y-8">
      {/* Upload Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Image Upload */}
        <div className="space-y-3">
          <Label className="block text-base font-semibold">
            Images (Reports, Scans)
          </Label>
          {isCapturingImage ? (
            <div className="border-2 border-blue-300 bg-blue-50 rounded-lg p-4 text-center space-y-3">
              <div className="w-full h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  ref={cameraVideoRef}
                  autoPlay
                  muted
                  playsInline
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={capturePhoto}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
                <Button size="sm" variant="outline" onClick={stopImageCapture}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition-colors"
                onClick={() => imageInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={startImageCapture}
                className="w-full"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
            </div>
          )}
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Audio Upload/Record */}
        <div className="space-y-3">
          <Label className="block text-base font-semibold">
            Audio (Voice Explanation)
          </Label>
          {isRecordingAudio ? (
            <div className="border-2 border-red-300 bg-red-50 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600">
                  Recording...
                </span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={stopAudioRecording}
                className="w-full"
              >
                Stop Recording
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition-colors"
                onClick={() => audioInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  MP3, WAV up to 25MB
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={startAudioRecording}
                className="w-full"
              >
                <Mic className="w-4 h-4 mr-2" />
                Record Audio
              </Button>
            </div>
          )}
          <input
            ref={audioInputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Video Upload/Record */}
        <div className="space-y-3">
          <Label className="block text-base font-semibold">
            Video (Optional)
          </Label>
          {isRecordingVideo ? (
            <div className="border-2 border-red-300 bg-red-50 rounded-lg p-4 text-center space-y-3">
              <div className="w-full h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  ref={videoPreviewRef}
                  autoPlay
                  muted
                  playsInline
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)",
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600">
                  Recording...
                </span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={stopVideoRecording}
                className="w-full"
              >
                Stop Recording
              </Button>
            </div>
          ) : isVideoCameraOpen ? (
            <div className="border-2 border-blue-300 bg-blue-50 rounded-lg p-4 text-center space-y-3">
              <div className="w-full h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center relative">
                <video
                  ref={videoPreviewRef}
                  autoPlay
                  muted
                  playsInline
                  width={480}
                  height={360}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)",
                    display: "block",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={startVideoRecording}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
                <Button size="sm" variant="outline" onClick={closeVideoCamera}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition-colors"
                onClick={() => videoInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  MP4, MOV up to 100MB
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={startVideoCamera}
                className="w-full"
              >
                <Video className="w-4 h-4 mr-2" />
                Record Video
              </Button>
            </div>
          )}
          <input
            ref={videoInputRef}
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {file.type === "image" && (
                      <>
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      </>
                    )}
                    {file.type === "audio" && (
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    {file.type === "video" && (
                      <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                        <Video className="w-5 h-5 text-purple-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {(file.type === "audio" || file.type === "video") && (
                      <a
                        href={file.url}
                        download={file.name}
                        title="Preview"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Play className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-800 flex-shrink-0"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> You can submit your consultation in any
          language. Our system will automatically translate it for the doctor.
          Use audio/video for voice explanations!
        </p>
      </div>
    </div>
  );
}
