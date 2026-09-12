import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21h3.08Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-panel">
      <div className="border-b border-line bg-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <p className="font-heading text-lg font-medium text-paper sm:text-xl">
            Egy helyen minden, ami autó!
          </p>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Allstars Autó Facebook oldala"
            className="flex size-9 items-center justify-center rounded-full border border-border/60 text-steel transition-colors hover:border-gold hover:text-gold-bright"
          >
            <FacebookIcon className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-header.webp"
            alt="Allstars Autó"
            width={200}
            height={72}
            className="h-11 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Helyi, készpénzes autófelvásárlás Szombathelyen és Vas vármegyében –
            gyorsan, feleslegesen bonyolult ügyintézés nélkül.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="font-heading text-lg font-semibold tracking-wide text-paper">
            Elérhetőség
          </h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
                {siteConfig.address.street}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-bright">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-bright">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-gold" />
              <span>Hétfő–Péntek: {siteConfig.hours}</span>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="font-heading text-lg font-semibold tracking-wide text-paper">
            Oldal
          </h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>
              <a href="#folyamat" className="hover:text-gold-bright">
                Hogyan zajlik
              </a>
            </li>
            <li>
              <a href="#autok" className="hover:text-gold-bright">
                Milyen autót veszünk
              </a>
            </li>
            <li>
              <a href="#gyik" className="hover:text-gold-bright">
                Gyakori kérdések
              </a>
            </li>
            <li>
              <a href="#kapcsolat" className="hover:text-gold-bright">
                Kapcsolat
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-line px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p>
          © {year} {siteConfig.name}. Minden jog fenntartva.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/impresszum" className="hover:text-gold-bright">
            Impresszum
          </Link>
          <Link
            href="/adatkezelesi-tajekoztato"
            className="hover:text-gold-bright"
          >
            Adatkezelési tájékoztató
          </Link>
        </nav>
      </div>
    </footer>
  );
}
