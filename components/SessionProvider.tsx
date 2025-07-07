// app/components/SessionProvider.tsx
'use client';

import { SessionContext } from "@/app/context/SessionContext";

export default function SessionProvider({
    session,
    children,
}: {
    session: any;
    children: React.ReactNode;
}) {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
