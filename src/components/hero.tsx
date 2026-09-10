import Image from "next/image";
import { Phone, MessageCircle, Banknote, ClipboardCheck, FileCheck2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";

const trustFacts = [
  { icon: Banknote, label: "Készpénz a helyszínen" },
  { icon: ClipboardCheck, label: "Ingyenes, kötelezettség nélküli felmérés" },
  { icon: FileCheck2, label: "A papírmunkát mi intézzük" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 30rem at 15% -10%, color-mix(in oklch, var(--gold) 16%, transparent), transparent), radial-gradient(40rem 24rem at 100% 10%, color-mix(in oklch, var(--steel) 10%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-24">
        <div>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl">
            Eladná az autóját? Készpénzben fizetünk érte, még ma.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel">
            Egy hívás, és kimegyünk megnézni Szombathelyen vagy a környező
            településeken. Sérült, hiteles vagy egyszerűen csak megunt autóját
            is helyben, készpénzben kifizetjük.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold text-primary-foreground hover:bg-gold-bright h-13 px-8 text-base font-semibold"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="size-5" />
                Hívjon most: {siteConfig.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-steel/40 bg-transparent px-8 text-base text-paper hover:bg-secondary hover:text-paper"
            >
              <a href="#kapcsolat">
                <MessageCircle className="size-5" />
                Kérek ingyenes ajánlatot
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-4 border-t border-border/60 pt-8 sm:grid-cols-3">
            {trustFacts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-gold" />
                <dt className="text-sm text-steel">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-panel/50 p-8 sm:p-10">
            <BorderBeam size={140} duration={10} colorFrom="#cf9f42" colorTo="#f0c164" />
            <Image
              src="/images/logo-hero.webp"
              alt="Allstars Autó logó"
              width={868}
              height={310}
              priority
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
