import Image from "next/image";
import { Handshake, ShieldCheck, Clock, Banknote, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { QuoteForm } from "@/components/quote-form";

const trustFacts = [
  { icon: Handshake, label: "Azonnali felvásárlás" },
  { icon: ShieldCheck, label: "Korrekt ajánlat" },
  { icon: Clock, label: "Gyors ügyintézés" },
  { icon: Banknote, label: "Készpénz fizetés" },
];

export function Hero() {
  return (
    <section id="ajanlatkeres" className="relative overflow-hidden border-b border-border/60 bg-ink">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dealership.webp"
          alt="Allstars Autó telephelye Szombathelyen, kirakott autókkal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-bright">
            Autófelvásárlás Vas megyéből
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            Eladná autóját? Töltse ki az alábbi kérdéseket, és{" "}
            <span className="text-gold-bright">akár még ma felvásároljuk</span>{" "}
            – készpénzben.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">
            Töltse ki az alábbi kérdéseket, és kollégáink hamarosan felveszik
            Önnel a kapcsolatot – sérült, hiteles vagy egyszerűen csak megunt
            autóját is helyben, készpénzben kifizetjük.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-steel">
            <MapPin className="size-4 shrink-0 text-gold" />
            <span>
              ALLSTARS AUTÓ SZOMBATHELY — {siteConfig.address.postalCode}{" "}
              {siteConfig.address.city}, {siteConfig.address.street}
            </span>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {trustFacts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <Icon className="size-6 text-gold" strokeWidth={1.75} />
                <dt className="text-sm font-medium text-paper">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-panel/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8 lg:p-10">
          <h2 className="font-heading text-2xl font-semibold text-paper sm:text-3xl">
            Kérjen ajánlatot most!
          </h2>
          <p className="mt-2 text-sm text-steel">
            Töltse ki az alábbi adatokat, és kollégáink hamarosan felveszik
            Önnel a kapcsolatot!
          </p>

          <div className="mt-8">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
