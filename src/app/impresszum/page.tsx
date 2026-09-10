import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";
import { legalConfig } from "@/lib/legal-config";

export const metadata: Metadata = {
  title: "Impresszum",
  description:
    "Az Allstars Autó weboldal üzemeltetőjének kötelező közzétételi adatai: szolgáltató neve, székhelye, elérhetőségei, nyilvántartási adatai és a tárhelyszolgáltató adatai.",
  alternates: { canonical: "/impresszum" },
  robots: { index: true, follow: true },
};

const { provider, hosting } = legalConfig;

/** Egy adatsor a szolgáltatói adattáblában. */
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border/60 py-3 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:gap-6">
      <dt className="text-sm font-medium text-steel">{label}</dt>
      <dd className="text-sm text-paper">{value}</dd>
    </div>
  );
}

export default function ImpresszumPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-gold-bright"
          >
            <ArrowLeft className="size-4" />
            Vissza a főoldalra
          </Link>

          <h1 className="mt-8 font-heading text-3xl font-semibold tracking-wide text-paper sm:text-4xl">
            Impresszum
          </h1>
          <p className="mt-4 text-steel">
            A(z) {siteConfig.domain} weboldal üzemeltetőjének adatai az
            elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII.
            törvény (Ekertv.) 4. §-a alapján.
          </p>

          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
              A szolgáltató adatai
            </h2>
            <dl className="mt-4 rounded-lg border border-border/60 bg-panel/40 px-5 py-2">
              <DataRow label="Szolgáltató neve" value={provider.name} />
              <DataRow label="Rövidített név" value={provider.shortName} />
              <DataRow label="Székhely" value={provider.headquarters} />
              <DataRow label="Telephely" value={provider.premises} />
              <DataRow label="Képviselő" value={provider.representative} />
              <DataRow
                label={provider.registrationLabel}
                value={provider.registrationNumber}
              />
              <DataRow
                label="Nyilvántartó hatóság"
                value={provider.registryAuthority}
              />
              <DataRow label="Adószám" value={provider.taxNumber} />
              {provider.euVatNumber ? (
                <DataRow
                  label="Közösségi adószám"
                  value={provider.euVatNumber}
                />
              ) : null}
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
              Elérhetőségek
            </h2>
            <dl className="mt-4 rounded-lg border border-border/60 bg-panel/40 px-5 py-2">
              <div className="grid gap-1 border-b border-border/60 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-steel">Telefonszám</dt>
                <dd className="text-sm text-paper">
                  <a
                    href={`tel:${provider.phone}`}
                    className="transition-colors hover:text-gold-bright"
                  >
                    {provider.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 border-b border-border/60 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-steel">E-mail cím</dt>
                <dd className="text-sm break-all text-paper">
                  <a
                    href={`mailto:${provider.email}`}
                    className="transition-colors hover:text-gold-bright"
                  >
                    {provider.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-steel">Weboldal</dt>
                <dd className="text-sm text-paper">{provider.url}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
              A tárhelyszolgáltató adatai
            </h2>
            <dl className="mt-4 rounded-lg border border-border/60 bg-panel/40 px-5 py-2">
              <DataRow label="Neve" value={hosting.name} />
              <DataRow label="Székhelye" value={hosting.address} />
              <div className="grid gap-1 border-b border-border/60 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-steel">E-mail cím</dt>
                <dd className="text-sm break-all text-paper">
                  <a
                    href={`mailto:${hosting.email}`}
                    className="transition-colors hover:text-gold-bright"
                  >
                    {hosting.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-sm font-medium text-steel">Weboldal</dt>
                <dd className="text-sm text-paper">
                  <a
                    href={hosting.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-gold-bright"
                  >
                    {hosting.website}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
              Adatkezelés
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              A weboldalon keresztül megadott személyes adatok kezeléséről az{" "}
              <Link
                href="/adatkezelesi-tajekoztato"
                className="text-gold transition-colors hover:text-gold-bright"
              >
                Adatkezelési tájékoztatóban
              </Link>{" "}
              olvashat részletesen.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
              Szerzői jogok
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              A weboldalon megjelenő szövegek, képek és egyéb tartalmak a
              szolgáltató szellemi tulajdonát képezik. Ezek felhasználása – a
              rendeltetésszerű böngészésen túl – kizárólag a szolgáltató
              előzetes írásbeli engedélyével lehetséges.
            </p>
          </section>

          <div className="mt-14 border-t border-border/60 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-gold-bright"
            >
              <ArrowLeft className="size-4" />
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
