import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "NeighborhoodPins",
    description: "For a safer neighborhood.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
