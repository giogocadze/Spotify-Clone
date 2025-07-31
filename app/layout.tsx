import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainContainer from "@/components/MainContainer/MainContainer";
import SupabaseProvider from "@/providers/SuperbaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import Player from "@/components/Player/player";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Created By Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <MainContainer>
              {children}
            </MainContainer>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
