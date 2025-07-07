'use client';

import { createContext, useContext } from "react";

export const SessionContext = createContext<any>(undefined);

export function useSession() {
    const session = useContext(SessionContext);

    if (session === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }

    return session;
}
