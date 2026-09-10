"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { quoteFieldLimits } from "@/lib/quote-limits";
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
  const carInfo = String(formData.get("carInfo") ?? "").trim();

  if (!name || !phone || !carInfo) {
    return { status: "error", message: "Kérjük, töltse ki az összes mezőt." };
  }

  if (
    name.length > quoteFieldLimits.name ||
    phone.length > quoteFieldLimits.phone ||
    carInfo.length > quoteFieldLimits.carInfo
  ) {
    return {
      status: "error",
      message:
        "A megadott adatok túl hosszúak. Kérjük, rövidebben írja le őket.",
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

  const { error } = await getResend(config.apiKey).emails.send({
    from: `Allstars Autó weboldal <ajanlatkeres@${config.emailDomain}>`,
    to: [siteConfig.email],
    subject: `Ajánlatkérés – ${name}`,
    text: [
      `Név: ${name}`,
      `Telefonszám: ${phone}`,
      "",
      "Az autó adatai:",
      carInfo,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message: `Hiba történt a küldés közben. ${callInsteadMessage}`,
    };
  }

  return successState;
}
