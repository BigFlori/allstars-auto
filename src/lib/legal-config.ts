import { siteConfig } from "@/lib/site-config";

/**
 * ============================================================================
 *  JOGI ADATOK – KITÖLTENDŐ SABLON
 * ============================================================================
 *
 *  Ez az egyetlen fájl, amit szerkesztenie kell ahhoz, hogy az
 *  /impresszum és az /adatkezelesi-tajekoztato oldal helyes adatokat
 *  mutasson. Az oldalak markupját NEM kell hozzányúlni.
 *
 *  Minden "[KITÖLTENDŐ: ...]" szöveget cseréljen le a valós adatra.
 *  Amíg nem teszi meg, a szöveg így, kitöltendő jelöléssel jelenik meg az
 *  oldalon – így egyértelmű, mi hiányzik még.
 *
 *  Az előre kitöltött adatok (Vercel, Resend, Google, NAIH) nyilvánosak és
 *  helyesek, azokat nem kell módosítani.
 * ============================================================================
 */

/** A telephely / székhely egy sorban, a site-config alapján összefűzve. */
const siteAddressLine = `${siteConfig.address.postalCode} ${siteConfig.address.city}, ${siteConfig.address.street}`;

export const legalConfig = {
  /* ------------------------------------------------------------------ */
  /*  1. A SZOLGÁLTATÓ ADATAI (Ekertv. 2001. évi CVIII. tv. 4. §)        */
  /* ------------------------------------------------------------------ */
  provider: {
    /**
     * A vállalkozás teljes, hivatalos neve, pontosan úgy, ahogy a
     * cégkivonatban vagy az egyéni vállalkozói nyilvántartásban szerepel.
     * Pl.: "Molnár Car Invest Korlátolt Felelősségű Társaság" vagy
     * egyéni vállalkozó esetén a saját teljes neve.
     */
    name: "Molnár Car Invest Kft.",

    /**
     * A rövidített cégnév (pl. "Molnár Car Invest Kft.").
     * Egyéni vállalkozó esetén ide is a saját nevét írja.
     */
    shortName: "Molnár Car Invest Kft.",

    /**
     * A bejegyzett székhely címe. Alapértelmezésben a weboldalon
     * amúgy is szereplő cím (src/lib/site-config.ts).
     * HA a bejegyzett székhely eltér a telephelytől, írja felül itt
     * a teljes címmel, pl.: "9700 Szombathely, Fő tér 1. 2. em. 4."
     */
    headquarters: "9730 Kőszeg, Várkör 61. 2. em. 12/a. ajtó",

    /**
     * A telephely / ügyfélfogadás címe. Ha megegyezik a székhellyel,
     * hagyja így – a site-config címét használja.
     */
    premises: siteAddressLine,

    /**
     * Adószám. Megtalálja a cégkivonaton, vagy a NAV
     * adószám-kereső oldalán. Formátum: 12345678-2-18
     */
    taxNumber: "24396411-2-18",

    /**
     * Cégjegyzékszám (Kft./Bt. esetén, formátum: 18-09-123456),
     * VAGY egyéni vállalkozó esetén a nyilvántartási szám.
     */
    registrationNumber: "18-09-111779",

    /**
     * Mi ez a szám? A megnevezés az oldalon a szám előtt jelenik meg.
     * Cég esetén: "Cégjegyzékszám", egyéni vállalkozó esetén:
     * "Nyilvántartási szám".
     */
    registrationLabel: "Cégjegyzékszám",

    /**
     * A nyilvántartást vezető bíróság / hatóság.
     * Cég esetén pl.: "Szombathelyi Törvényszék Cégbírósága".
     * Egyéni vállalkozó esetén: "Belügyminisztérium – Egyéni Vállalkozók
     * Nyilvántartása (nyilvantarto.hu)".
     */
    registryAuthority: "Szombathelyi Törvényszék Cégbírósága",

    /**
     * A képviseletre jogosult személy neve (ügyvezető / egyéni vállalkozó).
     */
    representative: "Molnár Kristóf",

    /**
     * Uniós adószám (közösségi adószám). Csak akkor töltse ki, ha van.
     * Ha nincs, írjon ide üres stringet ("") – akkor nem jelenik meg.
     */
    euVatNumber: "",

    /* Ezek már a site-configból jönnek – ne duplikálja őket. */
    email: siteConfig.email,
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    domain: siteConfig.domain,
    url: siteConfig.url,
  },

  /* ------------------------------------------------------------------ */
  /*  2. TÁRHELYSZOLGÁLTATÓ – előre kitöltve, NEM kell módosítani        */
  /*     Az oldal a Vercel platformján fut.                              */
  /* ------------------------------------------------------------------ */
  hosting: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, Amerikai Egyesült Államok",
    email: "privacy@vercel.com",
    website: "https://vercel.com",
    privacyPolicy: "https://vercel.com/legal/privacy-policy",
  },

  /* ------------------------------------------------------------------ */
  /*  3. ADATFELDOLGOZÓK – előre kitöltve a ténylegesen használt          */
  /*     szolgáltatásokkal. Csak akkor módosítsa, ha a weboldal           */
  /*     technikai háttere megváltozik.                                   */
  /* ------------------------------------------------------------------ */
  processors: [
    {
      name: "Vercel Inc.",
      role: "Tárhelyszolgáltatás, a weboldal kiszolgálása és szerveroldali naplózás",
      address: "340 S Lemon Ave #4133, Walnut, CA 91789, Amerikai Egyesült Államok",
      privacyPolicy: "https://vercel.com/legal/privacy-policy",
    },
    {
      name: "Resend, Inc.",
      role: "A kapcsolatfelvételi űrlapon beküldött üzenet e-mailben történő továbbítása a szolgáltató postafiókjába",
      address: "2261 Market Street #5039, San Francisco, CA 94114, Amerikai Egyesült Államok",
      privacyPolicy: "https://resend.com/legal/privacy-policy",
    },
    {
      name: "Google Ireland Limited",
      role: "A kapcsolat menüpontban megjelenő Google Maps térkép beágyazása (a térkép betöltésekor az Ön IP-címe a Google felé továbbításra kerül)",
      address: "Gordon House, Barrow Street, Dublin 4, Írország",
      privacyPolicy: "https://policies.google.com/privacy",
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  4. ADATKEZELŐ ÉS ADATVÉDELMI KAPCSOLAT                             */
  /* ------------------------------------------------------------------ */
  privacy: {
    /**
     * Az adatkezelő megnevezése. Ez jellemzően ugyanaz, mint a
     * szolgáltató teljes neve – ha igen, írja ide ugyanazt.
     */
    controllerName: "Molnár Car Invest Kft.",

    /**
     * Adatvédelmi kérdésekben megkeresésre használható e-mail cím.
     * Lehet ugyanaz, mint az általános e-mail cím – ha igen, cserélje
     * ezt a sort erre: siteConfig.email
     */
    contactEmail: siteConfig.email,

    /**
     * Az adatkezelés kezdő időpontja – jellemzően a weboldal
     * élesítésének dátuma. Formátum: 2026. január 1.
     */
    effectiveDate: "2026. szeptember 12.",

    /**
     * A tájékoztató utolsó módosításának dátuma. Minden módosításkor
     * frissítse. Formátum: 2026. január 1.
     */
    lastUpdated: "2026. szeptember 12.",

    /**
     * Az ajánlatkérések megőrzési ideje. Az alábbi érték egy szokásos,
     * arányos időtartam – ha mást szeretne, írja át.
     */
    retentionPeriod: "az ajánlatkéréstől számított 1 év, illetve – ha adásvétel jön létre – a számviteli törvény szerinti 8 év",
  },

  /* ------------------------------------------------------------------ */
  /*  5. FELÜGYELETI HATÓSÁG (NAIH) – nyilvános, fix adat                */
  /*     Nem kell módosítani.                                            */
  /* ------------------------------------------------------------------ */
  authority: {
    name: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
    address: "1055 Budapest, Falk Miksa utca 9-11.",
    postalAddress: "1363 Budapest, Pf. 9.",
    phone: "+36 1 391 1400",
    email: "ugyfelszolgalat@naih.hu",
    website: "https://naih.hu",
  },

  /* ------------------------------------------------------------------ */
  /*  6. BÍRÓSÁGI JOGORVOSLAT – a telephely szerint illetékes törvényszék */
  /* ------------------------------------------------------------------ */
  court: {
    name: "Szombathelyi Törvényszék",
    note: "Az érintett a lakóhelye vagy tartózkodási helye szerint illetékes törvényszék előtt is indíthat pert.",
  },
} as const;

export type LegalConfig = typeof legalConfig;
