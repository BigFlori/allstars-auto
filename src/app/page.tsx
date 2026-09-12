import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ServiceArea } from "@/components/service-area";
import { WhyUsSection } from "@/components/why-us-section";
import { ProcessSection } from "@/components/process-section";
import { CarTypesSection } from "@/components/car-types-section";
import { ComparisonSection } from "@/components/comparison-section";
import { FaqSection, faqStructuredData } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ServiceArea />
        <WhyUsSection />
        <ProcessSection />
        <CarTypesSection />
        <ComparisonSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
