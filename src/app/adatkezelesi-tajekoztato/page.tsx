import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";
import { legalConfig } from "@/lib/legal-config";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "Tájékoztató arról, hogy az Allstars Autó milyen személyes adatokat kezel a weboldalon keresztül, milyen célból és jogalapon, meddig őrzi meg azokat, és milyen jogok illetik meg Önt.",
  alternates: { canonical: "/adatkezelesi-tajekoztato" },
  robots: { index: true, follow: true },
};

const { provider, privacy, processors, authority, court } = legalConfig;

/** Szakaszcím – a számozás a szövegben kézzel követhető. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 scroll-mt-24">
      <h2 className="font-heading text-xl font-semibold tracking-wide text-paper">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-steel">
        {children}
      </div>
    </section>
  );
}

export default function AdatkezelesiTajekoztatoPage() {
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
            Adatkezelési tájékoztató
          </h1>
          <p className="mt-4 text-steel">
            Ez a tájékoztató azt írja le, hogy a(z) {siteConfig.domain}{" "}
            weboldalon keresztül megadott személyes adatait hogyan kezeljük, az
            Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR)
            alapján.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <dt>Hatályos:</dt>
              <dd className="text-steel">{privacy.effectiveDate}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Utolsó módosítás:</dt>
              <dd className="text-steel">{privacy.lastUpdated}</dd>
            </div>
          </dl>

          <Section title="1. Az adatkezelő adatai">
            <dl className="space-y-2">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">Adatkezelő:</dt>
                <dd className="text-paper">{privacy.controllerName}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">Székhely:</dt>
                <dd className="text-paper">{provider.headquarters}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">Képviselő:</dt>
                <dd className="text-paper">{provider.representative}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">
                  {provider.registrationLabel}:
                </dt>
                <dd className="text-paper">{provider.registrationNumber}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">Adószám:</dt>
                <dd className="text-paper">{provider.taxNumber}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">Telefonszám:</dt>
                <dd className="text-paper">
                  <a
                    href={`tel:${provider.phone}`}
                    className="transition-colors hover:text-gold-bright"
                  >
                    {provider.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">
                  Adatvédelmi kapcsolattartás:
                </dt>
                <dd className="break-all text-paper">
                  {privacy.contactEmail}
                </dd>
              </div>
            </dl>
            <p>
              Adatvédelmi tisztviselő kinevezésére nem került sor, mert az
              adatkezelés jellege és mértéke azt a GDPR 37. cikke alapján nem
              teszi kötelezővé.
            </p>
          </Section>

          <Section title="2. A kezelt személyes adatok köre">
            <p>
              A weboldalon a kapcsolatfelvételi (ajánlatkérő) űrlapon keresztül
              a következő adatokat adhatja meg:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-gold">
              <li>
                <span className="text-paper">Név</span> – hogy tudjuk, kit
                keressünk vissza és hogyan szólítsuk meg.
              </li>
              <li>
                <span className="text-paper">Telefonszám</span> – hogy a
                visszahíváskor elérjük Önt.
              </li>
              <li>
                <span className="text-paper">
                  Az autóra vonatkozó szabadszöveges leírás
                </span>{" "}
                (márka, típus, évjárat, állapot és minden egyéb, amit fontosnak
                tart) – ez alapján tudunk árajánlatot adni.
              </li>
            </ul>
            <p>
              A szabadszöveges mező tartalmát Ön határozza meg. Kérjük, hogy oda
              csak az ajánlatadáshoz szükséges információt írja, és ne adjon meg
              különleges (pl. egészségügyi) adatot vagy harmadik személyre
              vonatkozó adatot.
            </p>
            <p>
              Ha telefonon vagy e-mailben veszi fel velünk a kapcsolatot, az
              ennek során Ön által megadott adatokat (jellemzően név,
              telefonszám, e-mail cím és az üzenet tartalma) ugyanezen elvek
              szerint kezeljük.
            </p>
            <p>
              A weboldalt kiszolgáló szerver a működés biztosítása és
              biztonsága érdekében technikai naplókat készít, amelyek – rövid
              ideig – tartalmazhatják a látogató IP-címét, a kérés időpontját és
              a böngésző típusát. Ezekhez az adatokhoz a tárhelyszolgáltató
              rendszerén keresztül férünk hozzá, és azokat nem kapcsoljuk össze
              az űrlapon megadott adatokkal.
            </p>
          </Section>

          <Section title="3. Az adatkezelés célja és jogalapja">
            <ul className="list-disc space-y-3 pl-5 marker:text-gold">
              <li>
                <span className="text-paper">
                  Ajánlatkérés megválaszolása, kapcsolatfelvétel
                </span>{" "}
                – Jogalap: a GDPR 6. cikk (1) bekezdés b) pontja, azaz a
                szerződés megkötését megelőzően az Ön kérésére történő lépések
                megtétele. Ön azért adja meg az adatait, hogy árajánlatot
                kapjon az autójára; ezek nélkül az ajánlatot nem tudjuk
                elkészíteni.
              </li>
              <li>
                <span className="text-paper">
                  Az adásvétel lebonyolítása és a számviteli kötelezettségek
                  teljesítése
                </span>{" "}
                – Ha az ajánlatból üzlet lesz, az adatkezelés jogalapja a
                szerződés teljesítése (GDPR 6. cikk (1) bek. b) pont), a
                bizonylatok megőrzése tekintetében pedig jogi kötelezettség
                teljesítése (GDPR 6. cikk (1) bek. c) pont, a számvitelről szóló
                2000. évi C. törvény 169. §-a alapján).
              </li>
              <li>
                <span className="text-paper">
                  A weboldal biztonságos működtetése, visszaélések megelőzése
                </span>{" "}
                – Jogalap: az adatkezelő jogos érdeke (GDPR 6. cikk (1) bek. f)
                pont). Jogos érdekünk fűződik ahhoz, hogy a weboldal
                üzemszerűen és támadásoktól védetten működjön; ez az érdek a
                naplóadatok rövid megőrzése mellett nem korlátozza aránytalanul
                az Ön jogait.
              </li>
              <li>
                <span className="text-paper">
                  A beágyazott Google Maps térkép megjelenítése
                </span>{" "}
                – Jogalap: az Ön hozzájárulása (GDPR 6. cikk (1) bek. a) pont),
                amelyet a térképet is tartalmazó oldal megnyitásával,
                ráutaló magatartással ad meg. A térkép a betöltésekor
                kapcsolatba lép a Google szervereivel.
              </li>
            </ul>
            <p>
              Az adatszolgáltatás önkéntes: nem köteles kitölteni az űrlapot.
              Ha viszont nem adja meg a fenti adatokat, nem tudunk ajánlatot
              adni és nem tudjuk felvenni Önnel a kapcsolatot.
            </p>
          </Section>

          <Section title="4. Az adatok megőrzési ideje">
            <p>
              Az ajánlatkérés során megadott adatokat{" "}
              <span className="text-paper">{privacy.retentionPeriod}</span>{" "}
              elteltéig őrizzük meg, ezt követően töröljük őket.
            </p>
            <p>
              Ha az adatkezelés az Ön hozzájárulásán alapul, a hozzájárulás
              visszavonásáig kezeljük az adatokat. A hozzájárulás visszavonása
              nem érinti a visszavonás előtti adatkezelés jogszerűségét.
            </p>
            <p>
              A törlést bármikor kérheti a fenti elérhetőségeinken; ilyenkor az
              adatokat töröljük, kivéve, ha jogszabály a megőrzésüket kötelezővé
              teszi (pl. számviteli bizonylatok).
            </p>
          </Section>

          <Section title="5. Adatfeldolgozók, adattovábbítás">
            <p>
              Az adatokat nem adjuk el és nem adjuk át harmadik félnek
              marketingcélra. A weboldal működtetéséhez az alábbi
              adatfeldolgozók szolgáltatásait vesszük igénybe:
            </p>
            <ul className="space-y-4">
              {processors.map((p) => (
                <li
                  key={p.name}
                  className="rounded-lg border border-border/60 bg-panel/40 p-4"
                >
                  <p className="font-medium text-paper">{p.name}</p>
                  <p className="mt-1 text-muted-foreground">{p.address}</p>
                  <p className="mt-2">{p.role}</p>
                  <a
                    href={p.privacyPolicy}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-block break-all text-gold transition-colors hover:text-gold-bright"
                  >
                    Adatvédelmi tájékoztatójuk
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Az űrlapon beküldött üzenet e-mailben érkezik meg a szolgáltató
              postafiókjába; az e-mail-fiók szolgáltatója az üzenet
              tárolása körében szintén adatfeldolgozónak minősül.
            </p>
            <p>
              Az Egyesült Államokban működő adatfeldolgozók esetében az
              adattovábbítás jogi kereteit az Európai Bizottság megfelelőségi
              határozata (EU–USA adatvédelmi keret), illetve az Európai
              Bizottság által elfogadott általános szerződési feltételek
              biztosítják.
            </p>
            <p>
              Hatósági megkeresés esetén – jogszabályi kötelezettség alapján –
              az adatokat az eljáró hatóság részére átadhatjuk.
            </p>
          </Section>

          <Section title="6. Sütik (cookie-k)">
            <p>
              <span className="text-paper">
                Ez a weboldal nem használ analitikai, statisztikai vagy
                marketingcélú sütiket,
              </span>{" "}
              és nem működtet látogatottságmérőt vagy hirdetési
              nyomkövetőt sem. Az oldal saját maga egyáltalán nem helyez el
              sütit a böngészőjében, ezért süti-elfogadó sávot sem jelenítünk
              meg.
            </p>
            <p>
              Egy kivétel van: a kapcsolat szakaszban beágyazott{" "}
              <span className="text-paper">Google Maps térkép</span>. Amikor ez
              a térkép betöltődik, a Google szervereivel kapcsolat jön létre,
              amelynek során a Google – saját döntése alapján – sütiket vagy
              hasonló technológiákat helyezhet el, és megismerheti az Ön
              IP-címét. Erre a Google saját adatvédelmi tájékoztatója
              vonatkozik. Ha ezt el szeretné kerülni, a böngészője
              beállításaival korlátozhatja a harmadik féltől származó sütiket,
              vagy tartalomblokkolót használhat.
            </p>
          </Section>

          <Section title="7. Az Ön jogai">
            <p>
              Az adatkezeléssel kapcsolatban az alábbi jogok illetik meg. Ezeket
              a(z) {privacy.contactEmail} címen, illetve a {provider.phoneDisplay}{" "}
              telefonszámon gyakorolhatja.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-gold">
              <li>
                <span className="text-paper">Hozzáférés joga</span> –
                tájékoztatást kérhet arról, hogy kezelünk-e Önről adatot, és ha
                igen, másolatot kérhet róla.
              </li>
              <li>
                <span className="text-paper">Helyesbítés joga</span> – kérheti a
                pontatlan adat javítását vagy a hiányos adat kiegészítését.
              </li>
              <li>
                <span className="text-paper">
                  Törlés joga („az elfeledtetéshez való jog”)
                </span>{" "}
                – kérheti adatai törlését, ha azok kezelésére már nincs
                szükségünk, vagy ha visszavonja a hozzájárulását.
              </li>
              <li>
                <span className="text-paper">Korlátozás joga</span> – kérheti az
                adatkezelés korlátozását, például amíg az adat pontosságát
                ellenőrizzük.
              </li>
              <li>
                <span className="text-paper">Tiltakozás joga</span> –
                tiltakozhat a jogos érdeken alapuló adatkezelés ellen; ilyenkor
                az adatkezelést megszüntetjük, kivéve, ha azt kényszerítő erejű
                jogos ok indokolja.
              </li>
              <li>
                <span className="text-paper">Adathordozhatóság joga</span> – a
                hozzájáruláson vagy szerződésen alapuló, automatizált módon
                kezelt adatait tagolt, géppel olvasható formátumban kérheti ki,
                vagy kérheti azok továbbítását másik adatkezelőhöz.
              </li>
              <li>
                <span className="text-paper">
                  Hozzájárulás visszavonásának joga
                </span>{" "}
                – a hozzájáruláson alapuló adatkezelést bármikor, indokolás
                nélkül leállíthatja.
              </li>
            </ul>
            <p>
              A kérelmére indokolatlan késedelem nélkül, legkésőbb a beérkezéstől
              számított egy hónapon belül válaszolunk. A kérelem teljesítése
              díjmentes; ismételt vagy megalapozatlan kérelem esetén
              költségtérítést kérhetünk, illetve a teljesítést
              megtagadhatjuk.
            </p>
          </Section>

          <Section title="8. Jogorvoslati lehetőségek">
            <p>
              Ha úgy érzi, hogy az adatkezelés során sérültek a jogai, kérjük,
              először minket keressen meg – a legtöbb kérdés így rendezhető a
              leggyorsabban. Emellett panasszal élhet a felügyeleti hatóságnál,
              illetve bírósághoz fordulhat.
            </p>
            <div className="rounded-lg border border-border/60 bg-panel/40 p-4">
              <p className="font-medium text-paper">{authority.name}</p>
              <dl className="mt-2 space-y-1">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted-foreground">Székhely:</dt>
                  <dd>{authority.address}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted-foreground">Postacím:</dt>
                  <dd>{authority.postalAddress}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted-foreground">Telefon:</dt>
                  <dd>{authority.phone}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted-foreground">E-mail:</dt>
                  <dd className="break-all">
                    <a
                      href={`mailto:${authority.email}`}
                      className="text-gold transition-colors hover:text-gold-bright"
                    >
                      {authority.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted-foreground">Weboldal:</dt>
                  <dd className="break-all">
                    <a
                      href={authority.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-gold transition-colors hover:text-gold-bright"
                    >
                      {authority.website}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <p>
              Bírósági jogorvoslat: az adatkezelővel szemben pert indíthat a{" "}
              {court.name} előtt. {court.note} A per elbírálása a törvényszék
              hatáskörébe tartozik, és Ön illetékmentesen indíthatja meg.
            </p>
          </Section>

          <Section title="9. Adatbiztonság">
            <p>
              A weboldal titkosított (HTTPS) kapcsolaton keresztül érhető el, az
              űrlapon beküldött adatok tehát titkosított csatornán jutnak el
              hozzánk. Az adatokhoz kizárólag a szolgáltató képviselője fér
              hozzá, olyan mértékben, amennyire az ajánlatadáshoz szükséges.
              Automatizált döntéshozatalt és profilalkotást nem végzünk.
            </p>
          </Section>

          <Section title="10. A tájékoztató módosítása">
            <p>
              Fenntartjuk a jogot, hogy a jelen tájékoztatót módosítsuk,
              például ha a szolgáltatás vagy a jogszabályi környezet
              megváltozik. A mindenkor hatályos változat ezen az oldalon érhető
              el; a legutóbbi módosítás dátumát az oldal tetején tüntetjük fel.
            </p>
            <p>
              Kapcsolódó oldal:{" "}
              <Link
                href="/impresszum"
                className="text-gold transition-colors hover:text-gold-bright"
              >
                Impresszum
              </Link>
              .
            </p>
          </Section>

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
