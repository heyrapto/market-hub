import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LoadingWrapper from "@/app/components/ui/LoadingWrapper";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Market Hub | Premium Marketplace",
  description: "Discover curated products in our premium marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "font-mono", jetbrainsMono.variable)}>
      <body
        className={`${instrumentSerif.variable} ${dmMono.variable} antialiased h-full`}
      >
        <div className="relative z-20 min-h-full">
          <LoadingWrapper>
            {children}
          </LoadingWrapper>
        </div>
      </body>
    </html>
  );
}
