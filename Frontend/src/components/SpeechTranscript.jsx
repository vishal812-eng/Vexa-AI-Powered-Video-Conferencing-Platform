import { useRef, useState } from "react";

function SpeechTranscript({ onTranscriptChange }) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let newText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          newText += event.results[i][0].transcript + " ";
        }
      }

      if (newText.trim()) {
        setTranscript((previous) => {
          const updated = previous + newText;
          onTranscriptChange?.(updated);
          return updated;
        });
      }
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const clearTranscript = () => {
    setTranscript("");
    onTranscriptChange?.("");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#111827] p-5 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Meeting Transcript</h3>

        <span className="text-xs text-gray-400">
          {isListening ? "Listening..." : "Not recording"}
        </span>
      </div>

      <div className="mb-4 min-h-32 rounded-lg bg-[#0B1120] p-4 text-sm text-gray-300">
        {transcript || "Your meeting transcript will appear here..."}
      </div>

      {error && (
        <p className="mb-3 text-sm text-red-400">{error}</p>
      )}

      <div className="flex gap-3">
        {!isListening ? (
          <button
            onClick={startListening}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500"
          >
            Start Transcription
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-500"
          >
            Stop Transcription
          </button>
        )}

        <button
          onClick={clearTranscript}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SpeechTranscript;
