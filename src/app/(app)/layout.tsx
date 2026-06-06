import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="app-shell">
            <aside>App navigation</aside>
            <section>{children}</section>
        </div>
    );
}
