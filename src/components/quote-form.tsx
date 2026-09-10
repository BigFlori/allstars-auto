"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const carInfo = String(form.get("carInfo") ?? "");

    const subject = `Ajánlatkérés – ${name || "névtelen érdeklődő"}`;
    const body = [
      `Név: ${name}`,
      `Telefonszám: ${phone}`,
      "",
      "Az autó adatai:",
      carInfo,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-steel">
            Neve
          </label>
          <input
            id="name"
            name="name"
            required
            className="h-11 w-full rounded-md border border-border bg-panel px-3.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold"
            placeholder="Kovács János"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-steel">
            Telefonszáma
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="h-11 w-full rounded-md border border-border bg-panel px-3.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold"
            placeholder="+36 30 000 0000"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="carInfo" className="text-sm font-medium text-steel">
          Milyen autóról van szó?
        </label>
        <textarea
          id="carInfo"
          name="carInfo"
          rows={4}
          required
          className="w-full resize-none rounded-md border border-border bg-panel px-3.5 py-2.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold"
          placeholder="Márka, típus, évjárat, állapot – amit fontosnak tart"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-gold text-primary-foreground hover:bg-gold-bright sm:w-auto"
      >
        <Send className="size-4" />
        Ajánlatkérés elküldése
      </Button>

      {sent && (
        <p className="text-sm text-gold-bright" role="status">
          Megnyitottuk az emailküldőt az adataival kitöltve – csak küldje el,
          és hamarosan jelentkezünk.
        </p>
      )}
    </form>
  );
}
