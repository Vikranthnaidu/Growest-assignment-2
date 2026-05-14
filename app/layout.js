import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ProfileProvider from "./core/providers/ProfileProvider";

import InvestorIDProvider from "./core/providers/InvestorIDProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Growest",
  description: "Investment Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-black">
        <ProfileProvider>
          <InvestorIDProvider>{children}</InvestorIDProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
