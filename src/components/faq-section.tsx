import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Műszaki vizsga nélkül is megveszik az autómat?",
    answer:
      "Igen. Lejárt vagy hiányzó műszakival is átvesszük az autót, Önnek emiatt nem kell külön intézkednie.",
  },
  {
    question: "Mennyi idő alatt kapom meg a pénzt?",
    answer:
      "A helyszíni megtekintés után azonnal, még aznap készpénzben fizetünk, ha elfogadja az ajánlatunkat.",
  },
  {
    question: "Van-e bármilyen rejtett költség vagy jutalék?",
    answer:
      "Nincs. A felmérés és az ügyintézés is díjmentes, az egyeztetett összeget kapja kézhez, levonás nélkül.",
  },
  {
    question: "Csak Szombathelyen belül jönnek ki megnézni az autót?",
    answer:
      "Szombathely mellett egész Vas vármegyében kiszállunk – hívjon minket, és egyeztetünk egy Önnek megfelelő időpontot.",
  },
  {
    question: "Hiteles vagy örökölt autót is átvesznek?",
    answer:
      "Igen, ezekben az esetekben is segítünk eligazodni az ügyintézésben, és a hitel lezárását is figyelembe vesszük az ajánlatban.",
  },
];

export function FaqSection() {
  return (
    <section id="gyik" className="border-b border-border/60 bg-panel/40">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="font-heading text-3xl font-semibold text-paper sm:text-4xl">
          Gyakori kérdések
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-border/60">
              <AccordionTrigger className="text-base text-paper">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-steel">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
