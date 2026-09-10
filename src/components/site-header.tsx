import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ink/90 backdrop-blur supports-[backdrop-filter]:bg-ink/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Allstars Autó – kezdőlap">
          <Image
            src="/images/logo-header.webp"
            alt="Allstars Autó"
            width={220}
            height={79}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-steel md:flex">
          <Link href="#folyamat" className="transition-colors hover:text-gold-bright">
            Hogyan zajlik
          </Link>
          <Link href="#autok" className="transition-colors hover:text-gold-bright">
            Milyen autót veszünk
          </Link>
          <Link href="#kapcsolat" className="transition-colors hover:text-gold-bright">
            Kapcsolat
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            className="bg-gold text-primary-foreground hover:bg-gold-bright"
          >
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="size-4" />
              {siteConfig.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
