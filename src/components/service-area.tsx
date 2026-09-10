import { Marquee } from "@/components/ui/marquee";

const towns = [
  "Szombathely",
  "Kőszeg",
  "Sárvár",
  "Vasvár",
  "Körmend",
  "Szentgotthárd",
  "Celldömölk",
  "Bük",
  "Répcelak",
  "Vép",
];

export function ServiceArea() {
  return (
    <section className="border-y border-line bg-panel py-6">
      <p className="mb-4 text-center text-xs font-medium tracking-wide text-muted-foreground">
        Kiszállással felkeressük egész Vas vármegyében
      </p>
      <Marquee pauseOnHover className="[--gap:3rem]">
        {towns.map((town) => (
          <span
            key={town}
            className="font-heading text-xl font-medium text-steel/80"
          >
            {town}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
