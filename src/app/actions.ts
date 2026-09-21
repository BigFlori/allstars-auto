"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { quoteFieldLimits, quotePhotoLimits } from "@/lib/quote-limits";
import { siteConfig } from "@/lib/site-config";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Best-effort only: serverless instances have their own memory, so this map
// slows down casual flooding from a single client, not a determined attacker.
// If that becomes necessary, Vercel BotID is the upgrade path.
const submissionLog = new Map<string, number[]>();

const successState: QuoteFormState = {
  status: "success",
  message:
    "Köszönjük! Elküldtük az ajánlatkérését, hamarosan felvesszük Önnel a kapcsolatot.",
};

const callInsteadMessage = `Kérjük, hívjon minket a ${siteConfig.phoneDisplay} számon.`;

let resendClient: Resend | null = null;

function getResend(apiKey: string) {
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const emailDomain = process.env.RESEND_EMAIL_DOMAIN;
  const missing = [
    apiKey ? null : "RESEND_API_KEY",
    emailDomain ? null : "RESEND_EMAIL_DOMAIN",
  ].filter(Boolean);

  if (!apiKey || !emailDomain) {
    console.error(
      `Quote request not sent: missing environment variable(s) ${missing.join(", ")}.`,
    );
    return null;
  }

  return { apiKey, emailDomain };
}

async function getClientIp() {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || null;
}

function isRateLimited(ip: string) {
  const now = Date.now();

  for (const [key, timestamps] of submissionLog) {
    const recent = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (recent.length > 0) {
      submissionLog.set(key, recent);
    } else {
      submissionLog.delete(key);
    }
  }

  const attempts = submissionLog.get(ip) ?? [];
  if (attempts.length >= RATE_LIMIT_MAX) {
    return true;
  }

  submissionLog.set(ip, [...attempts, now]);
  return false;
}

export async function sendQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  if (String(formData.get("website") ?? "").trim()) {
    return successState;
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const mileage = String(formData.get("mileage") ?? "").trim();
  const fuelType = String(formData.get("fuelType") ?? "").trim();
  const plate = String(formData.get("plate") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const defects = String(formData.get("defects") ?? "").trim();
  const consent = formData.get("consent") === "on";
  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (
    !name ||
    !phone ||
    !email ||
    !brand ||
    !model ||
    !year ||
    !mileage ||
    !fuelType ||
    !location ||
    !consent
  ) {
    return { status: "error", message: "Kérjük, töltse ki a kötelező mezőket." };
  }

  const textFields: Array<[string, string, number]> = [
    [name, "name", quoteFieldLimits.name],
    [phone, "phone", quoteFieldLimits.phone],
    [email, "email", quoteFieldLimits.email],
    [brand, "brand", quoteFieldLimits.brand],
    [model, "model", quoteFieldLimits.model],
    [year, "year", quoteFieldLimits.year],
    [mileage, "mileage", quoteFieldLimits.mileage],
    [fuelType, "fuelType", quoteFieldLimits.fuelType],
    [plate, "plate", quoteFieldLimits.plate],
    [location, "location", quoteFieldLimits.location],
    [notes, "notes", quoteFieldLimits.notes],
    [defects, "defects", quoteFieldLimits.defects],
  ];

  if (textFields.some(([value, , limit]) => value.length > limit)) {
    return {
      status: "error",
      message:
        "A megadott adatok túl hosszúak. Kérjük, rövidebben írja le őket.",
    };
  }

  if (photos.length > quotePhotoLimits.maxCount) {
    return {
      status: "error",
      message: `Legfeljebb ${quotePhotoLimits.maxCount} fotót tölthet fel.`,
    };
  }

  const totalPhotoSize = photos.reduce((sum, photo) => sum + photo.size, 0);
  if (
    photos.some((photo) => photo.size > quotePhotoLimits.maxSizePerFile) ||
    totalPhotoSize > quotePhotoLimits.maxTotalSize ||
    photos.some(
      (photo) =>
        !quotePhotoLimits.acceptedTypes.includes(photo.type as never),
    )
  ) {
    return {
      status: "error",
      message: `A fotók mérete vagy formátuma nem megfelelő. Kérjük, JPG vagy PNG képeket töltsön fel, egyenként max. ${
        quotePhotoLimits.maxSizePerFile / (1024 * 1024)
      } MB méretben.`,
    };
  }

  const ip = await getClientIp();
  if (ip && isRateLimited(ip)) {
    return {
      status: "error",
      message: `Túl sok ajánlatkérést küldött rövid időn belül. ${callInsteadMessage}`,
    };
  }

  const config = getResendConfig();
  if (!config) {
    return {
      status: "error",
      message: `Az ajánlatkérés küldése jelenleg nem elérhető. ${callInsteadMessage}`,
    };
  }

  const attachments = await Promise.all(
    photos.map(async (photo, index) => ({
      filename: photo.name || `foto-${index + 1}.jpg`,
      content: Buffer.from(await photo.arrayBuffer()),
    })),
  );

  const { error } = await getResend(config.apiKey).emails.send({
    from: `Allstars Autó weboldal <ajanlatkeres@${config.emailDomain}>`,
    to: [siteConfig.email],
    replyTo: email || undefined,
    subject: `Ajánlatkérés – ${brand} ${model} (${name})`,
    text: [
      `Név: ${name}`,
      `Telefonszám: ${phone}`,
      email ? `Email: ${email}` : null,
      "",
      "Az autó adatai:",
      `Márka: ${brand}`,
      `Típus: ${model}`,
      year ? `Évjárat: ${year}` : null,
      mileage ? `Km futás: ${mileage}` : null,
      fuelType ? `Motortípus / Üzemanyag: ${fuelType}` : null,
      plate ? `Rendszám: ${plate}` : null,
      `Tartózkodási hely: ${location}`,
      defects ? `\nAutó hibái:\n${defects}` : null,
      notes ? `\nMegjegyzés:\n${notes}` : null,
      attachments.length ? `\nMellékelt fotók: ${attachments.length} db` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
    attachments: attachments.length ? attachments : undefined,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message: `Hiba történt a küldés közben. ${callInsteadMessage}`,
    };
  }

  if (email) {
    const { error: confirmationError } = await getResend(
      config.apiKey,
    ).emails.send({
      from: `Allstars Autó <ajanlatkeres@${config.emailDomain}>`,
      to: [email],
      subject: "Megkaptuk az ajánlatkérését – Allstars Autó",
      text: [
        `Kedves ${name}!`,
        "",
        "Köszönjük megkeresését, ajánlatkérését megkaptuk, hamarosan felvesszük Önnel a kapcsolatot.",
        "",
        "Összefoglaló:",
        `Márka: ${brand}`,
        `Típus: ${model}`,
        year ? `Évjárat: ${year}` : null,
        mileage ? `Km futás: ${mileage}` : null,
        `Tartózkodási hely: ${location}`,
        "",
        "Ez egy automatikus visszaigazoló email, kérjük ne válaszoljon rá, mivel ezt a postafiókot nem figyeljük.",
        `Ha kérdése van, hívjon minket a ${siteConfig.phoneDisplay} számon.`,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });

    if (confirmationError) {
      console.error("Resend confirmation email error:", confirmationError);
    }
  }

  return successState;
}
