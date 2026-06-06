import { personas } from "@/lib/personas";
import { scenarios } from "@/lib/scenarios";
import Link from "next/link";

export default function SimulatePage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white p-6">
            <h1 className="text-3xl font-semibold mb-6">Choose a scenario</h1>
            <div className="grid md:grid-cols-2 gap-4">
                {scenarios.map(s => (
                    <div key={s.id} className="rounded-2xl border border-white/10 p-5 bg-white/5">
                        <h2 className="text-xl font-medium">{s.title}</h2>
                        <p className="text-white/65 mt-2">{s.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {personas.map(p => (
                                <Link
                                    key={p.id}
                                    href={`/chat/demo-${s.id}-${p.id}`}
                                    className="px-3 py-2 rounded-lg bg-white/10 text-sm"
                                >
                                    {p.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
