import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {cn} from "@/lib/utils"
const inter = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task-Do",
  description: "Smart task management app for teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en ">
      <body className={cn(inter.className)} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
