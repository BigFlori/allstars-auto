const steps = [
  {
    number: "1",
    title: "Hívjon vagy írjon nekünk",
    text: "Meséljen pár szót az autójáról – márka, típus, állapot, pár fotó is elég ahhoz, hogy egy kezdeti árat tudjunk mondani.",
  },
  {
    number: "2",
    title: "Megnézzük, és ajánlatot adunk",
    text: "Egyeztetett időpontban megnézzük az autót – akár az Ön portáján is –, és a helyszínen mondunk egy tisztességes, végleges árat.",
  },
  {
    number: "3",
    title: "Készpénzben fizetünk",
    text: "Ha megállapodtunk, azonnal fizetünk, az adásvételi szerződést és a hivatalos leadást pedig mi intézzük.",
  },
];

export function ProcessSection() {
  return (
    <section id="folyamat" className="border-b border-border/60 bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-lg font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Így zajlik az autó eladása
        </h2>
        <p className="mt-3 max-w-lg text-steel">
          Nincs hirdetésfeladás, nincs várakozás – három lépésben lezárjuk az
          ügyet.
        </p>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => (
            <li key={step.number} className="relative">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl font-semibold text-gold">
                  {step.number}
                </span>
                <h3 className="font-heading text-xl font-semibold text-paper">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                {step.text}
              </p>
              {index < steps.length - 1 && (
                <span
                  className="absolute right-[-1.25rem] top-2 hidden h-px w-8 bg-gradient-to-r from-gold/60 to-transparent sm:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
