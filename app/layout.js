import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "RYL",
  description: "RITIK YADAV LIVE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
         <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
