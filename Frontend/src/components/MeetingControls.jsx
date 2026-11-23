
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Phone,
  PhoneOff,
} from "lucide-react";

function MeetingControls({
  isMicOn,
  isCameraOn,
  isSharing,
  isHost,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onLeaveCall,
  onEndCall,
}) {
  const baseButton =
    "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95";

  return (
    <div className="flex items-center justify-center gap-3 rounded-full border border-white/5 bg-[#151B2B]/90 px-5 py-3 shadow-2xl backdrop-blur-xl">

      {/* Microphone */}
      <button
        onClick={onToggleMute}
        title={isMicOn ? "Mute microphone" : "Unmute microphone"}
        className={`${baseButton} ${
          isMicOn
            ? "bg-[#252D42] text-white hover:bg-[#35405A]"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {isMicOn ? <Mic size={23} /> : <MicOff size={23} />}
      </button>

      {/* Camera */}
      <button
        onClick={onToggleCamera}
        title={isCameraOn ? "Turn camera off" : "Turn camera on"}
        className={`${baseButton} ${
          isCameraOn
            ? "bg-[#252D42] text-white hover:bg-[#35405A]"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {isCameraOn ? <Video size={23} /> : <VideoOff size={23} />}
      </button>

      {/* Screen Share */}
      <button
        onClick={onToggleScreenShare}
        title={isSharing ? "Stop sharing" : "Share screen"}
        className={`${baseButton} ${
          isSharing
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-[#252D42] text-white hover:bg-[#35405A]"
        }`}
      >
        <MonitorUp size={23} />
      </button>

      <div className="mx-1 h-8 w-px bg-white/15" />

      {/* Leave Call */}
      <button
        onClick={onLeaveCall}
        title="Leave meeting"
        className={`${baseButton} bg-red-600 text-white hover:bg-red-700`}
      >
        <Phone size={23} className="rotate-135deg" />
      </button>

      {/* End Meeting - Host only */}
      {isHost && (
        <button
          onClick={onEndCall}
          title="End meeting for everyone"
          className={`${baseButton} bg-[#991B2B] text-white hover:bg-red-700`}
        >
          <PhoneOff size={23} />
        </button>
      )}
    </div>
  );
}

export default MeetingControls;