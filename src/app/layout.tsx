import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "react-toastify/ReactToastify.min.css";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Session from "../components/Session";

export const metadata: Metadata = {
  title: "Collabo",
  description: "One-stop collbaoration hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning>
        <Session>
          <ToastProvider>{children}</ToastProvider>
        </Session>
      </body>
    </html>
  );
}
