import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Manav Gawas | Systems Architect & Founder",
  description: "Founder of Syncora Systems. Engineering high-concurrency Go backends, autonomous enterprise AI, and unbreakable cloud infrastructure.",
  openGraph: {
    title: "Manav Gawas | Systems Architect",
    description: "Engineering Absolute Leverage. 0-to-1 execution, primitives over frameworks.",
    url: "https://your-domain.com", 
    siteName: "Manav Gawas",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Manav Gawas - Systems Architect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030303] text-white antialiased selection:bg-cyan-500/30 spatial-perspective spatial-stack`}>
        
        <ConsoleEasterEgg />
        
        {/* <div className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-default">
          <span className="text-xs font-mono tracking-widest">SYSTEM_ACCESS</span>
          <kbd className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-sans">
            ⌘K
          </kbd>
        </div> */}

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}