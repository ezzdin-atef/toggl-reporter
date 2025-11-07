import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toggl Track Reporter",
  description: "View and analyze your time entries with detailed insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
