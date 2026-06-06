import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-semibold tracking-tight">SocialOS</h1>
        <p className="text-white/70 text-lg">
          AI-powered social intelligence training for modern communication.
        </p>
        <div className="flex justify-center gap-3">
          <Link className="px-5 py-3 rounded-xl bg-white text-black" href="/simulate">
            Start Simulation
          </Link>
          <Link className="px-5 py-3 rounded-xl border border-white/20" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}