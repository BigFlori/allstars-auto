import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.mapsQuery,
  )}&output=embed`;

  return (
    <section id="kapcsolat" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-lg font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Kérjen ajánlatot még ma
        </h2>
        <p className="mt-3 max-w-lg text-steel">
          Hívjon telefonon, vagy töltse ki az űrlapot fent – mindkettő
          ugyanolyan gyorsan célba ér.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <div className="space-y-4 rounded-lg border border-border/60 bg-panel/40 p-6">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-start gap-3 text-sm text-paper"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <span className="block font-medium">{siteConfig.phoneDisplay}</span>
                  <span className="text-steel">Hívjon nyitvatartási időben</span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 text-sm text-paper"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="break-all">{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-paper">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
                  {siteConfig.address.street}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-paper">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>Nyitva: {siteConfig.hours}</span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-gold text-primary-foreground hover:bg-gold-bright sm:w-auto"
            >
              <a href="#ajanlatkeres">Ajánlatkérő űrlap kitöltése</a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-lg border border-border/60 lg:col-span-3">
            <iframe
              title="Allstars Autó telephelye a térképen"
              src={mapSrc}
              width="100%"
              height="360"
              style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
