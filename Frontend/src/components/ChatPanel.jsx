import { useEffect, useRef, useState } from "react";

function ChatPanel({ socket, meetingId, username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket || !meetingId) return;

    const handleHistory = (history) => {
      setMessages(history);
    };

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("chat-history", handleHistory);
    socket.on("chat-message", handleNewMessage);

    socket.emit("get-chat-history", meetingId);

    return () => {
      socket.off("chat-history", handleHistory);
      socket.off("chat-message", handleNewMessage);
    };
  }, [socket, meetingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || !socket) return;

    socket.emit(
      "chat-message",
      {
        path: meetingId,
        message: trimmedMessage,
      },
      username
    );

    setMessage("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-400">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => {
            const isMine = msg.sender === username;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <span className="mb-1 text-xs text-gray-400">
                  {isMine ? "You" : msg.sender}
                </span>

                <div
                  className={`max-w-[90%] rounded-xl px-3 py-2 text-sm wrap-break-words ${
                    isMine
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.data}
                </div>

                <span className="mt-1 text-[10px] text-gray-500">
                  {msg.time
                    ? new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="mt-3 flex shrink-0 gap-2 border-t border-white/10 pt-3"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#1f2937] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;
