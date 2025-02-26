import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Border White",
  description: "Generate Border",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`
          ${figtree.className} antialiased
          fixed left-0 top-0 w-screen h-screen 
        bg-neutral-200 text-black 
          `}
      >
        {children}
      </body>
    </html>
  );
}
