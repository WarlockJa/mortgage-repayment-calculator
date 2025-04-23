import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJacartaSans = Plus_Jakarta_Sans({
  variable: "--plus-jacarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator",
  description: "Front-end Mentor challenge: Mortgage Repayment Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJacartaSans.variable} ${plusJacartaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
