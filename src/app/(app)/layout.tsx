import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {" "}
          <div className="flex bg-[#F9FAFB] min-h-screen w-full">
            <Sidebar />
            <div className="w-full">
              <Navbar isLoggedIn={true} />
              {children}
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
