import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toast } from "@/components/Toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    verification: {
        google: "gW91aW8q1IvASzDJS1onHL1d_N_mDQ16GP7LSd9bnhc",
    },
    title: "Wistoan | A Legacy on Your Wrist",
    description: "Luxury timepieces crafted with precision and heritage",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
                <LenisProvider>
                    <FavoritesProvider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                        <Toast />
                    </FavoritesProvider>
                </LenisProvider>
            </body>
        </html>
    );
}

