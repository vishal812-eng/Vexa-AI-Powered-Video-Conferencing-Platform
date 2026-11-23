import { useEffect, useState } from "react";
import MeetingControls from "./MeetingControls";
import VideoPlayer from "./VideoPlayer";
import ChatPanel from "./ChatPanel";
import SpeechTranscript from "./SpeechTranscript";

function MeetingRoom({
  meetingId,
  username,
  socket,
  isCallEnded,
  isMicOn,
  isCameraOn,
  isSharing,
  isHost,
  toggleMute,
  toggleCamera,
  toggleScreenShare,
  leaveCall,
  endCall,
  localVideoRef,
  remoteVideoRef,
  isRemoteCameraOn,
}) {
  const [activePanel, setActivePanel] = useState("participants");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleParticipants = (list) => {
      setParticipants(list);
    };

    socket.on("participant-list", handleParticipants);

    return () => {
      socket.off("participant-list", handleParticipants);
    };
  }, [socket]);
  const [meetingTranscript, setMeetingTranscript] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const generateSummary = async () => {
    if (!meetingTranscript.trim()) {
      setAiError("No meeting transcript available.");
      return;
    }

    try {
      setIsGenerating(true);
      setAiError("");
      setAiSummary("");

      const response = await fetch("http://localhost:8000/api/ai/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: meetingTranscript,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate summary");
      }

      setAiSummary(data.result);
    } catch (error) {
      setAiError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const summarySections = aiSummary
    ? [
        ...aiSummary.matchAll(
          /\*\*\d+\.\s*([^*]+)\*\*([\s\S]*?)(?=\*\*\d+\.|$)/g,
        ),
      ].map((match) => ({
        title: match[1].trim(),
        content: match[2]
          .trim()
          .split("\n")
          .map((line) =>
            line
              .replace(/^\s*\*\s*/, "")
              .replace(/\*\*/g, "")
              .trim(),
          )
          .filter(Boolean),
      }))
    : [];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#080D1B] text-white">
      {/* Header */}
      <header className="flex h-68px shrink-0 items-center justify-between border-b border-white/10 bg-[#0B1020] px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 text-2xl font-bold">
            V
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Vexa<span className="text-purple-400">.</span>
          </span>

          <div className="ml-4 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:flex">
            <span className="text-sm">📹</span>
            <span className="text-sm text-slate-300">{meetingId}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-white/5 px-4 py-2 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-sm text-slate-300">
              {isCallEnded ? "Meeting ended" : "Meeting in progress"}
            </span>
          </div>

          {!isCallEnded && (
            <button
              onClick={leaveCall}
              className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-red-700"
            >
              ☎ Leave Call
            </button>
          )}
        </div>
      </header>

      {isCallEnded ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <h2 className="text-3xl font-bold">Call Ended</h2>
          <p className="mt-2 text-slate-400">Your meeting has ended.</p>
        </div>
      ) : (
        <>
          {/* Main Meeting Area */}
          <div className="flex min-h-0 flex-1 gap-3 p-4">
            {/* Video Area */}
            <main className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                <VideoPlayer
                  ref={localVideoRef}
                  muted={true}
                  label="You"
                  isCameraOn={isCameraOn}
                  isHost={isHost}
                  isMicOn={isMicOn}
                />

                <VideoPlayer
                  ref={remoteVideoRef}
                  label="Guest"
                  isCameraOn={isRemoteCameraOn}
                />
              </div>

              {/* Bottom Controls */}
              <div className="mt-6 flex justify-center">
                <MeetingControls
                  isMicOn={isMicOn}
                  isCameraOn={isCameraOn}
                  isSharing={isSharing}
                  isHost={isHost}
                  onToggleMute={toggleMute}
                  onToggleCamera={toggleCamera}
                  onToggleScreenShare={toggleScreenShare}
                  onLeaveCall={leaveCall}
                  onEndCall={endCall}
                />
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="hidden h-full w-[320px] min-w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] lg:flex">
              {/* Sidebar Tabs */}
              <div className="flex shrink-0 border-b border-white/10">
                <button
                  onClick={() => setActivePanel("participants")}
                  className={`flex-1 cursor-pointer py-4 text-sm font-semibold transition ${
                    activePanel === "participants"
                      ? "border-b-2 border-purple-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Participants (2)
                </button>

                <button
                  onClick={() => setActivePanel("chat")}
                  className={`flex-1 cursor-pointer py-4 text-sm font-semibold transition ${
                    activePanel === "chat"
                      ? "border-b-2 border-purple-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActivePanel("transcript")}
                  className={`flex-1 cursor-pointer py-4 text-xs font-semibold transition ${
                    activePanel === "transcript"
                      ? "border-b-2 border-purple-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  AI Transcript
                </button>
              </div>

              {/* Participants */}
              
{activePanel === "participants" && (
  <div className="space-y-4 p-4">
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white">
        In this meeting
      </h3>

      <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs text-indigo-300">
        {participants.length}
      </span>
    </div>

    {participants.map((participant, index) => {
      const isMe = participant === username;

      return (
        <div
          key={`${participant}-${index}`}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-bold text-white">
            {participant.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {isMe ? "You" : participant}
            </p>

            <p className="text-xs text-slate-400">
              {isMe
                ? isMicOn
                  ? "Microphone on"
                  : "Microphone off"
                : "Participant"}
            </p>
          </div>

          {isMe && (
            <span className="rounded-md bg-green-600/20 px-2 py-1 text-xs text-green-400">
              You
            </span>
          )}

          {isMe && isHost && (
            <span className="rounded-md bg-blue-600/20 px-2 py-1 text-xs text-blue-400">
              Host
            </span>
          )}
        </div>
      );
    })}
  </div>
)}


              <div
                className={`min-h-0 flex-1 overflow-y-auto p-3 ${activePanel === "chat" ? "block" : "hidden"}`}
              >
                <ChatPanel
                  socket={socket}
                  meetingId={meetingId}
                  username={username}
                />
              </div>

              <div
                className={`min-h-0 flex-1 overflow-y-auto p-3 ${activePanel === "transcript" ? "block" : "hidden"}`}
              >
                <div className="space-y-4">
                  <SpeechTranscript onTranscriptChange={setMeetingTranscript} />

                  <button
                    onClick={generateSummary}
                    disabled={isGenerating || !meetingTranscript.trim()}
                    className="w-full cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isGenerating
                      ? "Generating Summary..."
                      : "✨ Generate AI Summary"}
                  </button>

                  {aiError && (
                    <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                      {aiError}
                    </p>
                  )}

                  {aiSummary && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-300">
                        ✨ Vexa AI Insights
                      </h3>

                      {summarySections.map((section, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/10 bg-[#0B1120] p-4"
                        >
                          <h4 className="mb-3 font-semibold text-white">
                            {index === 0 ? "📋 " : index === 1 ? "💡 " : "✅ "}
                            {section.title}
                          </h4>

                          {index === 0 ? (
                            <p className="text-sm leading-6 text-gray-300">
                              {section.content.join(" ")}
                            </p>
                          ) : (
                            <ul className="space-y-3">
                              {section.content.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-2 text-sm leading-6 text-gray-300"
                                >
                                  <span className="text-purple-400">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Meeting Link */}
          <footer className="flex h-14 shrink-0 items-center justify-between border-t border-white/10 px-5">
            <span className="text-xs text-slate-500">
              Vexa · Video meetings made simple
            </span>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Meeting link copied!");
              }}
              className="cursor-pointer rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10"
            >
              🔗 Copy Meeting Link
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default MeetingRoom;
