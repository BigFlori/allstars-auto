import {
  CarFront,
  Ship,
  ClipboardList,
  Repeat,
  ShoppingCart,
  Gem,
} from "lucide-react";

const reasons = [
  {
    icon: CarFront,
    title: "Autófelvásárlás",
    text: "Minden típusú autót megvásárolunk, akár hibás állapotban is, azonnali készpénzfizetéssel.",
  },
  {
    icon: Ship,
    title: "Autóbehozatal",
    text: "Németországból, Ausztriából és más EU országból történő autóbeszerzés, teljes körű ügyintézéssel.",
  },
  {
    icon: ClipboardList,
    title: "Ügyintézés",
    text: "Eredetiségvizsgálat, átírás, okmányirodai ügyintézés, biztosítás kötés – mindent egy helyen.",
  },
  {
    icon: Repeat,
    title: "Beszámítás / Csere",
    text: "Régi autóját beszámítjuk új vásárlása esetén, vagy cserelehetőséget biztosítunk.",
  },
  {
    icon: ShoppingCart,
    title: "Autóértékesítés",
    text: "Minőségi, ellenőrzött autók széles választéka, korrekt áron.",
  },
  {
    icon: Gem,
    title: "Megbízhatóság",
    text: "Ügyfeleink elégedettsége a legfontosabb számunkra. Nálunk a minőség alapfelszereltség.",
  },
];

export function WhyUsSection() {
  return (
    <section className="border-b border-border/60 bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Miért az Allstars Autó?
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-ink p-6 text-center sm:p-7">
              <Icon className="mx-auto size-7 text-gold" strokeWidth={1.75} />
              <h3 className="mt-4 font-heading text-lg font-semibold text-gold-bright">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
