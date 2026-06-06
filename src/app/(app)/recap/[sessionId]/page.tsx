interface RecapPageProps {
    params: { sessionId: string };
}

export default function RecapPage({ params }: RecapPageProps) {
    return (
        <main className="page-shell">
            <h1>Session Recap</h1>
            <p>Recap for session {params.sessionId}</p>
        </main>
    );
}
