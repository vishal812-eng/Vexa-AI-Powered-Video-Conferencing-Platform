function LandingPage({ onLogin, onSignup }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080D1B] text-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold shadow-lg shadow-indigo-600/30">
            V
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Vexa<span className="text-indigo-400">.</span>
          </span>
        </a>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            About
          </a>
        </div>

        {/* Authentication buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className=" cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Log in
          </button>

          <button
            onClick={onSignup}
            className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative isolate mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 overflow-hidden px-6 py-10 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-10 -z-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px]" />

        {/* Left content */}
        <section className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-medium text-indigo-300 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
            A better way to meet online
            <span>✦</span>
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Where great
            <span className="block bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              conversations
            </span>
            happen.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Bring people together with seamless video meetings, effortless
            screen sharing, and smarter collaboration. Everything your team
            needs, in one place.
          </p>

          {/* CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onSignup}
              className="group flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-300 hover:-translate-y-1 hover:bg-indigo-500 sm:text-base"
            >
              Get started free
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <a
              href="#features"
              className="rounded-xl border border-slate-700 bg-white/3 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:bg-white/5 sm:text-base"
            >
              Explore features
            </a>
          </div>

          {/* Highlights */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-800 pt-5">
            <div>
              <p className="text-lg font-bold text-white">HD</p>
              <p className="text-xs text-slate-500">Video quality</p>
            </div>

            <div>
              <p className="text-lg font-bold text-white">Real-time</p>
              <p className="text-xs text-slate-500">Communication</p>
            </div>

            <div>
              <p className="text-lg font-bold text-white">AI-ready</p>
              <p className="text-xs text-slate-500">Smart insights</p>
            </div>
          </div>
        </section>

        {/* Right side - Meeting preview */}
        <section className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -inset-4 rounded-[35px] bg-linear-to-br from-indigo-600/20 to-purple-600/20 blur-2xl" />

          {/* Meeting window */}
          <div className="relative rounded-3xl border border-white/10 bg-[#111827]/95 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold">
                  V
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Vexa Meeting
                  </p>
                  <p className="text-xs text-slate-500">Team workspace</p>
                </div>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>

            {/* Participants */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative flex aspect-4/3 flex-col items-center justify-center rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-950 to-slate-800">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-400/20 text-3xl">
                  👨🏻
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  Alex Morgan
                </p>
                <span className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-1 text-[10px] text-slate-300">
                  Host
                </span>
                <span className="absolute bottom-2 right-2 text-xs">🎙️</span>
              </div>

              <div className="relative flex aspect-4/3 flex-col items-center justify-center rounded-2xl border border-blue-400/20 bg-linear-to-br from-blue-950 to-slate-800">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-400/20 text-3xl">
                  👩🏻
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  Sarah Wilson
                </p>
                <span className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-1 text-[10px] text-slate-300">
                  Participant
                </span>
                <span className="absolute bottom-2 right-2 text-xs">🎙️</span>
              </div>
            </div>

            {/* Controls preview */}
            <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-white/6 bg-slate-800/70 p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-700">
                🎙️
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-700">
                📹
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
                🖥️
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-700">
                💬
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600">
                ☎️
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-xs text-slate-500">Connected with Vexa</p>
              <p className="text-xs font-medium text-indigo-300">
                Simple. Together.
              </p>
            </div>
          </div>

          {/* Floating chat card */}
          <div className="absolute -right-2 top-20 hidden w-44 rounded-2xl border border-white/10 bg-slate-800/95 p-3 shadow-2xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 text-xs">
                💬
              </span>
              <span className="text-xs font-semibold text-white">
                Meeting chat
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Share ideas and collaborate!
            </p>
          </div>

          {/* Floating status card */}
          <div className="absolute -bottom-4 -left-2 hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-800/95 p-3 shadow-xl backdrop-blur-xl sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
              ✓
            </span>
            <div>
              <p className="text-xs font-semibold text-white">
                Seamless connection
              </p>
              <p className="text-[10px] text-slate-400">Ready when you are</p>
            </div>
          </div>
        </section>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Powerful features
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to
            <span className="text-indigo-400"> connect.</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Simple tools that make every conversation more productive and every
            collaboration more meaningful.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="🎥"
            title="HD Video Meetings"
            description="Enjoy face-to-face conversations with simple camera and microphone controls."
          />

          <FeatureCard
            icon="🖥️"
            title="Screen Sharing"
            description="Share your screen and present projects, ideas, and presentations."
          />

          <FeatureCard
            icon="💬"
            title="Live Meeting Chat"
            description="Stay connected with participants through real-time messaging."
          />

          <FeatureCard
            icon="✨"
            title="AI Meeting Insights"
            description="Make conversations more useful with AI-powered meeting summaries."
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative overflow-hidden border-y border-slate-800/70 bg-slate-900/30 px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              About Vexa
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Bringing people closer,
              <span className="text-indigo-400"> one meeting at a time.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              Vexa is a video conferencing platform designed to make online
              communication simple and accessible. Whether you're connecting
              with teammates, sharing ideas, or working together remotely, Vexa
              brings your conversations into one place.
            </p>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
              Our goal is to create a smooth meeting experience with real-time
              communication, screen sharing, and tools that help people
              collaborate more effectively.
            </p>
          </div>

          {/* Right content */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-indigo-600/15 to-purple-600/15 blur-2xl" />

            <div className="relative rounded-3xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-2xl sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold shadow-lg shadow-indigo-600/20">
                  V
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Why Vexa?</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Communication without complexity.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    ✦
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Simple Experience
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Easy-to-use meeting tools with a clean interface.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    ◈
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Real-time Collaboration
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Connect, communicate, and share ideas together.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    ◎
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Built for Teams
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      A shared space for meaningful online meetings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get started in
            <span className="text-indigo-400"> three simple steps.</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Connecting with your team has never been easier. Start collaborating
            in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
                👤
              </div>

              <span className="text-4xl font-bold text-slate-800 transition group-hover:text-indigo-500/30">
                01
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">
              Create Your Account
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Sign up for Vexa and get access to your personal meeting
              workspace.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl text-purple-400">
                🎥
              </div>

              <span className="text-4xl font-bold text-slate-800 transition group-hover:text-purple-500/30">
                02
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">
              Start or Join a Meeting
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Create a new meeting or enter an existing meeting ID to connect
              with others.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-400">
                🤝
              </div>

              <span className="text-4xl font-bold text-slate-800 transition group-hover:text-blue-500/30">
                03
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">
              Connect & Collaborate
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Communicate through video, share your screen, and exchange
              messages in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-600/20 via-slate-900 to-purple-600/20 px-6 py-16 text-center sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Get Started Today
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to bring your team closer?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
            Create your free Vexa account and experience seamless video
            meetings, real-time communication, and collaboration.
          </p>

          <button
            onClick={onSignup}
            className="mt-8 rounded-xl bg-indigo-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-1 hover:bg-indigo-400"
          >
            Create Your Free Account →
          </button>

          <p className="mt-5 text-sm text-slate-500">
            Simple. Secure. Built for better conversations.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#080D1B] px-6 pt-14 pb-6 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Vexa<span className="text-indigo-500">.</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Bringing people closer through seamless video meetings and
              real-time collaboration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white">Product</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="#features"
                  className="transition hover:text-indigo-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition hover:text-indigo-400"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#about" className="transition hover:text-indigo-400">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-white">Account</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <button
                  onClick={onLogin}
                  className="transition hover:text-indigo-400"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={onSignup}
                  className="transition hover:text-indigo-400"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vexa. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with ❤️ for better conversations.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export default LandingPage;
