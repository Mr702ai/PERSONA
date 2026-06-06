"use client";

import { useState } from "react";

export default function ChatPage({ params }: { params: { sessionId: string } }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  async function sendMessage(): Promise<void> {await, const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personaId: "sophia",
        scenarioId: "coffee-date",
        difficulty: "hard",
        messages: next
      })
    });

    const data = await res.json();
    setMessages([...next, { role: "assistant", content: data.reply }]);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Session {params.sessionId}</h1>
        <div className="rounded-2xl border border-white/10 p-4 min-h-[400px] space-y-3 bg-white/5">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span className="inline-block rounded-xl px-4 py-2 bg-white/10">{m.content}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-xl bg-white/10 px-4 py-3 outline-none"
            placeholder="Type your response..."
          />
          <button onClick={sendMessage} className="px-5 py-3 rounded-xl bg-white text-black">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}