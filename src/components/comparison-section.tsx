import { Check, X } from "lucide-react";

const classic = [
  "Hetekig fut a hirdetés, mire jelentkezik valaki",
  "Idegenek jönnek nézni, sokan csak alkudoznak",
  "Bizonytalan, mikor és mennyiért kel el az autó",
  "A szerződést és a leadást Önnek kell intézni",
];

const allstars = [
  "Egy telefonhívás, és már jövünk is megnézni",
  "Helyben, készpénzben fizetünk – nincs várakozás",
  "Egy tisztességes ár, alkudozás nélkül",
  "A papírmunkát és a leadást mi vállaljuk",
];

export function ComparisonSection() {
  return (
    <section className="border-b border-border/60 bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-lg font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Miért egyszerűbb minálunk?
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 md:grid-cols-2">
          <div className="bg-ink p-8">
            <h3 className="font-heading text-lg font-semibold text-steel">
              Hirdetés feladásával
            </h3>
            <ul className="mt-6 space-y-4">
              {classic.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-steel">
                  <X className="mt-0.5 size-4 shrink-0 text-steel/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-8">
            <h3 className="font-heading text-lg font-semibold text-gold-bright">
              Az Allstars Autóval
            </h3>
            <ul className="mt-6 space-y-4">
              {allstars.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-paper">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
