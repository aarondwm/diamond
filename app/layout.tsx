import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Tajawal } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diamond PKW — Premium Car Detailing Studio | Kuwait",
  description:
    "Kuwait's premier car care & detailing studio. Paint protection film, ceramic coating, window tinting, and premium detailing services. Book your appointment today.",
  keywords: [
    "car detailing",
    "Kuwait",
    "paint protection film",
    "ceramic coating",
    "window tinting",
    "PPF",
    "Diamond PKW",
    "car care",
    "auto detailing",
  ],
  openGraph: {
    title: "Diamond PKW — Premium Car Detailing Studio",
    description:
      "Kuwait's premier car care & detailing studio. Paint protection film, ceramic coating, window tinting, and premium detailing services.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_KW",
    siteName: "Diamond PKW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${tajawal.variable}`}
      >
        {children}
        {/* Grain overlay */}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
