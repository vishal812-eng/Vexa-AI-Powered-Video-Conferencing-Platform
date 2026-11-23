import { forwardRef } from "react";

const VideoPlayer = forwardRef(function VideoPlayer(
  {
    muted = false,
    label,
    isCameraOn = true,
    isHost = false,
    isMicOn = true,
  },
  ref
) {
  return (
    <div className="relative aspect-video min-w-0 overflow-hidden rounded-2xl border border-slate-700/60 bg-[#111827] shadow-xl">
      <video
        ref={ref}
        autoPlay
        playsInline
        muted={muted}
        className={`h-full w-full object-cover ${
          isCameraOn ? "block" : "hidden"
        }`}
      />

      {!isCameraOn && (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#172554] to-[#111827]">
          <img
            src="/avatar.png"
            alt="Participant avatar"
            className="h-28 w-28 rounded-full object-cover"
          />
        </div>
      )}

      {isHost && (
        <div className="absolute right-3 top-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
          👑 Host
        </div>
      )}

      {label && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
          <span>{isMicOn ? "🎙️" : "🔇"}</span>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
});

export default VideoPlayer;
