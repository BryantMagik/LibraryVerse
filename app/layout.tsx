import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LibraryVerse",
  description: "Generated by create next app",
  icons : {
    icon: "./favicon.ico"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Head>
          <link rel="icon" href="./favicon.ico" sizes="any" />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
