import { useState } from "react";

function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSignup({
      name,
      username,
      password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080D1B] px-4 py-10">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">

        {/* Logo */}
        <h1 className="text-center text-3xl font-bold text-white">
          Vexa<span className="text-indigo-500">.</span>
        </h1>

        <h2 className="mt-8 text-center text-2xl font-semibold text-white">
          Create Your Account
        </h2>

        <p className="mt-2 text-center text-sm text-slate-400">
          Join Vexa and start connecting with others
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-500 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            Create Account
          </button>

        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login
          </button>
        </p>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-5 block w-full text-center text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Signup;
