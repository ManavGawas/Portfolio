import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import GlobalBackground from "@/components/GlobalBackground";
import QuantTerminal from "@/components/QuantTerminal";

// display: 'swap' ensures text is visible while the font file downloads, eliminating FOIT (Flash of Invisible Text)
const inter = Inter({ subsets: ["latin"], display: 'swap' });

// Separating Viewport optimizes mobile rendering and prevents zoom-lag
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Locks scale to prevent double-tap zoom lag on mobile
  userScalable: false,
};

export const metadata: Metadata = {
  // Replace this with your actual production domain. 
  // Next.js uses this to automatically build absolute URLs for your OG images.
  metadataBase: new URL("https://your-actual-domain.tech"), 
  title: "Manav Gawas | Systems Architect & Founder",
  description: "Founder of Syncora Systems. Engineering high-concurrency Go backends, autonomous enterprise AI, and unbreakable cloud infrastructure.",
  openGraph: {
    title: "Manav Gawas | Systems Architect",
    description: "Engineering Absolute Leverage. 0-to-1 execution, primitives over frameworks.",
    url: "/", // metadataBase handles the root domain automatically now
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
  // Tells search engines to index your site
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`
        ${inter.className} 
        bg-transparent text-white antialiased 
        selection:bg-cyan-500/30 
        spatial-perspective spatial-stack
        overscroll-none 
      `}>
        
        {/* The permanent geometric wireframe backdrop (Hardware Accelerated) */}
        <GlobalBackground />

        {/* Global interactive Ctrl+K terminal */}
        <QuantTerminal />
        
        <ConsoleEasterEgg />

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}