import { useState } from "react";
function Login({ onSwitchToSignup, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
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
          Welcome Back
        </h2>

        <p className="mt-2 text-center text-sm text-slate-400">
          Login to continue to your account
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full rounded-xl bg-indigo-500 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            Login
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </button>
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer mt-5 block w-full text-center text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
