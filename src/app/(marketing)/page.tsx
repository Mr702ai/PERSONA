import Link from 'next/link';

export default function MarketingLanding() {
    return (
        <main className="page-shell">
            <h1>SocialOS for Teams</h1>
            <p>AI-guided social simulations for learning and coaching.</p>
            <Link href="/about">Learn more</Link>
        </main>
    );
}
