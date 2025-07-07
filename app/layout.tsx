// layout.tsx
import { auth0 } from "@/lib/auth0";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider"; // <-- must be used

export const metadata: Metadata = {
    title: "NeighborhoodPins",
    description: "For a safer neighborhood.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth0.getSession(); // this is fine

    return (
        <html lang="en">
            <body className="antialiased">
                <SessionProvider session={session}>
                    <Navbar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
