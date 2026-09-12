"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Send, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/compress-image";
import { quoteFieldLimits, quotePhotoLimits } from "@/lib/quote-limits";
import { sendQuoteRequest, type QuoteFormState } from "@/app/actions";

const initialState: QuoteFormState = { status: "idle", message: "" };

const carBrands = [
  "Audi",
  "BMW",
  "Citroën",
  "Dacia",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Škoda",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Egyéb",
];

const fuelTypes = [
  "Benzin",
  "Dízel",
  "Hibrid",
  "Elektromos",
  "LPG / Gáz",
  "Egyéb",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1979 }, (_, index) => currentYear - index);

const inputClass =
  "h-11 w-full rounded-md border border-border bg-panel px-3.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="h-13 w-full bg-gold text-base font-semibold text-primary-foreground hover:bg-gold-bright sm:w-auto sm:px-10"
    >
      <Send className="size-5" />
      {pending ? "Küldés…" : "Ajánlatot kérek"}
    </Button>
  );
}

type PhotoFile = {
  id: string;
  file: File;
  previewUrl: string;
};

function PhotoUploader({ id }: { id: string }) {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileInputRef.current) return;
    const dataTransfer = new DataTransfer();
    photos.forEach((photo) => dataTransfer.items.add(photo.file));
    fileInputRef.current.files = dataTransfer.files;
  }, [photos]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setError("");

    const incoming = Array.from(fileList).filter((file) =>
      quotePhotoLimits.acceptedTypes.includes(file.type as never),
    );

    if (incoming.length < fileList.length) {
      setError("Csak JPG, PNG vagy WebP képeket tud feltölteni.");
    }

    setIsProcessing(true);
    const compressed = await Promise.all(incoming.map((file) => compressImage(file)));
    setIsProcessing(false);

    setPhotos((prev) => {
      const combined = [...prev, ...compressed.map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }))];

      if (combined.length > quotePhotoLimits.maxCount) {
        setError(`Legfeljebb ${quotePhotoLimits.maxCount} fotót adhat hozzá.`);
        return combined.slice(0, quotePhotoLimits.maxCount);
      }

      return combined;
    });
  }

  function removePhoto(photoId: string) {
    setPhotos((prev) => {
      const target = prev.find((photo) => photo.id === photoId);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((photo) => photo.id !== photoId);
    });
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-steel">
        Fotók feltöltése (opcionális, de segít a gyorsabb ajánlatban)
      </label>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          addFiles(event.dataTransfer.files);
        }}
        className="rounded-md border border-dashed border-border bg-panel/60 p-4"
      >
        <div className="flex flex-wrap gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative size-20 shrink-0 overflow-hidden rounded-md border border-border/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- client-side blob preview, not an optimizable asset */}
              <img
                src={photo.previewUrl}
                alt=""
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                aria-label="Fotó eltávolítása"
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-ink/80 text-paper transition-colors hover:bg-ember"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}

          {photos.length < quotePhotoLimits.maxCount && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex size-20 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-border text-steel transition-colors hover:border-gold hover:text-gold-bright disabled:opacity-50"
            >
              <Upload className="size-5" />
              <span className="text-[0.65rem]">
                {isProcessing ? "Feldolgozás…" : "Tallózás"}
              </span>
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-steel">
          Kattintson a képek feltöltéséhez, vagy húzza ide a fájlokat (max.{" "}
          {quotePhotoLimits.maxCount} kép, JPG, PNG). A képeket automatikusan
          tömörítjük feltöltés előtt.
        </p>
      </div>

      <input
        ref={fileInputRef}
        id={id}
        name="photos"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        onChange={(event) => addFiles(event.target.files)}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function QuoteForm() {
  const [state, formAction] = useActionState(sendQuoteRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const photoInputId = useId();

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <label htmlFor="brand" className="text-sm font-medium text-steel">
            Autó márka <span className="text-red-400">*</span>
          </label>
          <select
            id="brand"
            name="brand"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Válasszon márkát
            </option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="model" className="text-sm font-medium text-steel">
            Típus <span className="text-red-400">*</span>
          </label>
          <input
            id="model"
            name="model"
            required
            maxLength={quoteFieldLimits.model}
            placeholder="Pl.: Golf, 320d"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="year" className="text-sm font-medium text-steel">
            Évjárat <span className="text-red-400">*</span>
          </label>
          <select
            id="year"
            name="year"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Válasszon évjáratot
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mileage" className="text-sm font-medium text-steel">
            Km futás <span className="text-red-400">*</span>
          </label>
          <input
            id="mileage"
            name="mileage"
            required
            inputMode="numeric"
            maxLength={quoteFieldLimits.mileage}
            placeholder="Pl.: 180000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="fuelType" className="text-sm font-medium text-steel">
            Motortípus / Üzemanyag <span className="text-red-400">*</span>
          </label>
          <select
            id="fuelType"
            name="fuelType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Válasszon motortípust
            </option>
            {fuelTypes.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="plate" className="text-sm font-medium text-steel">
            Magyar rendszám (ha van)
          </label>
          <input
            id="plate"
            name="plate"
            maxLength={quoteFieldLimits.plate}
            placeholder="Pl.: ABC-123"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="notes" className="text-sm font-medium text-steel">
            Megjegyzés (extrák, felszereltség, téli/nyári gumi stb.)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={quoteFieldLimits.notes}
            placeholder="Írja le az autó főbb jellemzőit…"
            className="w-full resize-none rounded-md border border-border bg-panel px-3.5 py-2.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="defects" className="text-sm font-medium text-steel">
            Autó hibái (ha vannak)
          </label>
          <textarea
            id="defects"
            name="defects"
            rows={3}
            maxLength={quoteFieldLimits.defects}
            placeholder="Írja le az esetleges hibákat…"
            className="w-full resize-none rounded-md border border-border bg-panel px-3.5 py-2.5 text-paper outline-none placeholder:text-steel/50 focus:border-gold"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-steel">
            Név <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={quoteFieldLimits.name}
            placeholder="Az Ön neve"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-steel">
            Telefonszáma <span className="text-red-400">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={quoteFieldLimits.phone}
            placeholder="+36 30 123 4567"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-steel">
            Email cím <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={quoteFieldLimits.email}
            placeholder="pelda@email.hu"
            className={inputClass}
          />
        </div>
      </div>

      <PhotoUploader id={photoInputId} />

      <div aria-hidden className="sr-only">
        <label htmlFor="website">Weboldal</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-steel">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 rounded border-border bg-panel accent-gold"
        />
        <span>
          <span className="text-red-400">* </span>
          Hozzájárulok, hogy az adataimat az ALLSTARS AUTÓ kapcsolatfelvétel
          céljából kezelje az{" "}
          <Link
            href="/adatkezelesi-tajekoztato"
            className="underline underline-offset-2 hover:text-gold-bright"
          >
            adatkezelési tájékoztatóban
          </Link>{" "}
          foglaltak szerint.
        </span>
      </label>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </form>
  );
}
