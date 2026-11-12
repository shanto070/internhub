
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "InternHub - Learning Dashboard",
  description: "A learning and project management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />

          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

