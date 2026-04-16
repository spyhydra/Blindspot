import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blindspot — AI-Powered Observability",
  description:
    "Surface the critical insights buried in your data. AI-driven anomaly detection, real-time alerts, and one-click remediation for modern engineering teams.",
  openGraph: {
    title: "Blindspot — AI-Powered Observability",
    description:
      "Surface the critical insights buried in your data. Trusted by 2,400+ teams worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
