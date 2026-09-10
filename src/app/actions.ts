"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const carInfo = String(formData.get("carInfo") ?? "").trim();

  if (!name || !phone || !carInfo) {
    return { status: "error", message: "Kérjük, töltse ki az összes mezőt." };
  }

  const { error } = await resend.emails.send({
    from: `Allstars Autó weboldal <ajanlatkeres@${process.env.RESEND_EMAIL_DOMAIN}>`,
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
      message:
        "Hiba történt a küldés közben. Kérjük, hívjon minket telefonon.",
    };
  }

  return {
    status: "success",
    message:
      "Köszönjük! Elküldtük az ajánlatkérését, hamarosan felvesszük Önnel a kapcsolatot.",
  };
}
