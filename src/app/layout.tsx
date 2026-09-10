import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Work_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const headingFont = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const bodyFont = Work_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allstars Autó – Készpénzes autófelvásárlás Szombathelyen",
    template: "%s | Allstars Autó",
  },
  description:
    "Azonnali készpénzért vásároljuk meg autóját Szombathelyen és Vas megyében – sérült, hiteles vagy régi autóját is. Hívjon, és még ma ajánlatot kap.",
  keywords: [
    "autófelvásárlás Szombathely",
    "készpénzes autófelvásárlás",
    "autófelvásárlás Vas megye",
    "roncsautó felvásárlás",
    "sérült autó felvásárlás",
    "azonnali készpénz autóért",
  ],
  authors: [{ name: "Allstars Autó" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: siteUrl,
    siteName: "Allstars Autó",
    title: "Allstars Autó – Készpénzes autófelvásárlás Szombathelyen",
    description:
      "Azonnali készpénzért vásároljuk meg autóját Szombathelyen és Vas megyében, bármilyen állapotban.",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allstars Autó – Készpénzes autófelvásárlás Szombathelyen",
    description:
      "Azonnali készpénzért vásároljuk meg autóját Szombathelyen és Vas megyében, bármilyen állapotban.",
    images: ["/opengraph-image.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
  colorScheme: "dark",
};

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/logo-hero.webp`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: siteConfig.hoursSchema.open,
      closes: siteConfig.hoursSchema.close,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.address.region,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
