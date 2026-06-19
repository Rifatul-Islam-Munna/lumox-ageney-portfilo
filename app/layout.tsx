import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PageMotion } from "@/components/page-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

const playfairDisplay = Playfair_Display({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lumos Visuals",
  description: "Corporate and commercial visual production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        playfairDisplay.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <PageMotion>{children}</PageMotion>
        </TooltipProvider>
      </body>
    </html>
  );
}
