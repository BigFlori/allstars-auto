import Image from "next/image";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-panel">
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

      <div className="border-t border-line px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {year} {siteConfig.name}. Minden jog fenntartva.
      </div>
    </footer>
  );
}
