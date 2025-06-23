import type { Metadata } from "next";
import { Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils"

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight:["300","400" , "500" , "600" , "700"]
});

export const metadata: Metadata = {
  title: "PatientPro",
  description: "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning >
      <body
        className={cn('min-h-screen bg-[#131619] font-sans antialiased' , fontSans.variable)}
      >
         <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
