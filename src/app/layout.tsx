import type { Metadata }                       from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SpeedInsights }                         from "@vercel/speed-insights/next";
import "./globals.css";
import { DemoModalProvider }  from "@/context/DemoModalContext";
import { MockSessionProvider } from "@/context/MockSessionContext";
import ModalController        from "@/components/ModalController";
import MockModeBanner         from "@/components/MockModeBanner";

const bricolage = Bricolage_Grotesque({
  subsets:  ["latin"],
  variable: "--font-display",
  weight:   ["400", "600", "700", "800"],
});

const instrument = Instrument_Sans({
  subsets:  ["latin"],
  variable: "--font-body",
  weight:   ["400", "500", "600"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://swiftbuy.az";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "SwiftBuy — B2B Topdan Platform",
    template: "%s | SwiftBuy",
  },
  description:
    "Topdan sifarişi ekspeditorsuz idarə et. Mağaza sifarişi platformada verir, distribütor dərhal görür.",
  keywords: [
    "topdan sifariş", "B2B platform", "distribütor",
    "mağaza", "ekspeditor", "Azərbaycan", "SwiftBuy",
  ],
  authors:    [{ name: "SwiftBuy" }],
  creator:    "SwiftBuy",
  publisher:  "SwiftBuy",
  robots:     { index: true, follow: true },
  openGraph: {
    type:        "website",
    locale:      "az_AZ",
    url:         BASE_URL,
    siteName:    "SwiftBuy",
    title:       "SwiftBuy — B2B Topdan Platform",
    description: "Topdan sifarişi ekspeditorsuz idarə et.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "SwiftBuy — B2B Topdan Platform",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SwiftBuy — B2B Topdan Platform",
    description: "Topdan sifarişi ekspeditorsuz idarə et.",
    images:      ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${bricolage.variable} ${instrument.variable}`}>
      <body className="bg-[#080D1A] text-white antialiased">
        <MockModeBanner />
        <MockSessionProvider>
          <DemoModalProvider>
            {children}
            <ModalController />
          </DemoModalProvider>
        </MockSessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
