"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendQuoteRequest, type QuoteFormState } from "@/app/actions";

const initialState: QuoteFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="w-full bg-gold text-primary-foreground hover:bg-gold-bright sm:w-auto"
    >
      <Send className="size-4" />
      {pending ? "Küldés…" : "Ajánlatkérés elküldése"}
    </Button>
  );
}

export function QuoteForm() {
  const [state, formAction] = useActionState(sendQuoteRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
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

      <SubmitButton />

      {state.status !== "idle" && (
        <p
          role="status"
          className={
            state.status === "success"
              ? "text-sm text-gold-bright"
              : "text-sm text-red-400"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
