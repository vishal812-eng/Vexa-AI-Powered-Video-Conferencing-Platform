import { useState } from "react";

function Dashboard({ username, onStartMeeting, onJoinMeeting, onLogout }) {
  const [meetingId, setMeetingId] = useState("");

  const handleJoin = () => {
    const input = meetingId.trim();

    if (!input) return;

    let id = input;

    try {
      // Agar user ne complete meeting link paste kiya hai
      if (input.startsWith("http://") || input.startsWith("https://")) {
        const url = new URL(input);

        const match = url.pathname.match(/^\/meeting\/([^/]+)\/?$/);

        if (!match) {
          alert("Invalid meeting link");
          return;
        }

        id = decodeURIComponent(match[1]);
      }

      // Agar user ne /meeting/abc123 format paste kiya hai
      else if (input.startsWith("/meeting/")) {
        id = decodeURIComponent(input.split("/meeting/")[1].split("/")[0]);
      }

      onJoinMeeting(id);
    } catch (error) {
      alert("Invalid meeting link or ID", error);
    }
  };  

  return (
    <div className="min-h-screen bg-[#080D1B] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-800 p-6 flex-col">
        <h1 className="text-3xl font-bold text-blue-400 mb-12">
          Vexa<span className="text-white">.</span>
        </h1>

        <nav className="space-y-3">
          <div className="bg-blue-600/15 text-blue-400 p-3 rounded-xl font-medium">
            🏠 &nbsp; Dashboard
          </div>

          <div className="text-slate-400 p-3">📅 &nbsp; Meetings</div>

          <div className="text-slate-400 p-3">⚙️ &nbsp; Settings</div>
        </nav>

        <div className="mt-auto">
          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-white p-3"
          >
            ↪ &nbsp; Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-14">
          <div>
            <p className="text-slate-400 text-sm">Workspace</p>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <button
            onClick={onLogout}
            className="cursor-pointer md:hidden text-slate-300"
          >
            Logout
          </button>

          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            V
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-12">
          <p className="text-blue-400 font-medium mb-3">
            YOUR SPACE TO CONNECT
          </p>
          <p className="text-blue-400 text-lg font-medium mb-2">
            Hi, {username} 👋
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to Vexa.
          </h1>

          <p className="text-slate-400 text-lg">
            Meet, connect and collaborate with your team from anywhere.
          </p>
        </section>

        {/* Meeting Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {/* New Meeting */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl">
            <div className="text-4xl mb-6">🎥</div>

            <h3 className="text-2xl font-bold mb-3">Start a new meeting</h3>

            <p className="text-blue-100 mb-8">
              Create a meeting and invite people to join you.
            </p>

            <button
              onClick={onStartMeeting}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              + New Meeting
            </button>
          </div>

          {/* Join Meeting */}
          <div className="bg-[#111A2E] border border-slate-800 p-8 rounded-2xl">
            <div className="text-4xl mb-6">🔗</div>

            <h3 className="text-2xl font-bold mb-3">Join a meeting</h3>

            <p className="text-slate-400 mb-6">
              Have a meeting ID? Enter it below to join.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleJoin();
                }}
                placeholder="Enter Meeting ID"
                className="min-w-0 flex-1 bg-[#080D1B] border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleJoin}
                disabled={!meetingId.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold transition"
              >
                Join
              </button>
            </div>
          </div>
        </section>

        {/* Recent Meetings */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold">Recent Meetings</h3>
            <span className="text-sm text-slate-500">Your activity</span>
          </div>

          <div className="bg-[#111A2E] border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">📭</div>

            <p className="text-slate-300 font-medium">No recent meetings</p>

            <p className="text-slate-500 text-sm mt-2">
              Your recent meetings will appear here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
