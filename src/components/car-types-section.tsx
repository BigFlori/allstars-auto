import {
  CarFront,
  Wrench,
  ShieldAlert,
  FileWarning,
  Landmark,
  Clock,
} from "lucide-react";

const carTypes = [
  {
    icon: ShieldAlert,
    title: "Sérült, karambolos autó",
    text: "Karosszéria- vagy ütközéskárral sem probléma, megvásároljuk jelenlegi állapotában.",
  },
  {
    icon: Wrench,
    title: "Motorhibás autó",
    text: "Nem indul, füstöl, drága lenne megjavítani – nálunk ez nem akadály.",
  },
  {
    icon: FileWarning,
    title: "Lejárt műszakival álló autó",
    text: "Nem kell előbb műszakiztatnia – úgy vesszük át, ahogy áll.",
  },
  {
    icon: Landmark,
    title: "Hiteles vagy örökölt autó",
    text: "A hitel lezárásában és a hagyatéki ügyintézésben is segítünk eligazodni.",
  },
  {
    icon: Clock,
    title: "Régi, elhanyagolt autó",
    text: "Évek óta áll a garázsban vagy az udvaron? Elszállítjuk, Ön csak a pénzét kapja meg.",
  },
  {
    icon: CarFront,
    title: "Jó állapotú, futó autó",
    text: "Egyszerűen csak túladna rajta? Piaci áron, gyorsan és bürokrácia nélkül vesszük meg.",
  },
];

export function CarTypesSection() {
  return (
    <section id="autok" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-lg font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Bármilyen állapotú autót megveszünk
        </h2>
        <p className="mt-3 max-w-lg text-steel">
          Ha bizonytalan, hogy az Ön autóját megvesszük-e – valószínűleg igen.
          Hívjon, és pár perc alatt kiderül.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {carTypes.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-ink p-6 sm:p-7">
              <Icon className="size-6 text-gold" strokeWidth={1.75} />
              <h3 className="mt-4 font-heading text-lg font-semibold text-paper">
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
