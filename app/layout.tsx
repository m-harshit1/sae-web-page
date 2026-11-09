import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

/* ── SEO Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "SAEINDIA IIITDM Kurnool Collegiate Club | Student Engineering Portal",
  description:
    "Official portal of the SAEINDIA Collegiate Club at IIITDM Kurnool. Explore BAJA ATV B-26 designs, AWIM school outreach, upcoming Formula Student EV, and engineering dashboards.",
  keywords: [
    "SAEINDIA",
    "IIITDM Kurnool",
    "BAJA SAEINDIA",
    "Team Monarch Racing",
    "AWIM Outreach",
    "Formula Student",
    "Aero Design",
    "Electric Vehicle",
    "CAD SolidWorks",
    "ANSYS FEA",
    "Motorsport Engineering",
    "Student Engineering Club",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "SAEINDIA IIITDM Kurnool Collegiate Club",
    description:
      "Designing, building, and racing competitive high-performance off-road and motorsport vehicles. Explore our interactive specs and sponsor packages.",
    url: "https://sae.iiitk.ac.in",
    siteName: "SAEINDIA IIITDM Kurnool Portal",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://sae.iiitk.ac.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAEINDIA IIITDM Kurnool Portal Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAEINDIA IIITDM Kurnool Collegiate Club",
    description:
      "Official portal of the SAEINDIA Collegiate Club at IIITDM Kurnool. Exploring BAJA ATV B-26 designs and AWIM school outreach.",
  },
};

/* ── Root Layout ───────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-carbon-900 text-alloy-100 selection:bg-apex-red selection:text-white">
        <ScrollProgressBar />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SAEINDIA26"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SAEINDIA26');
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
