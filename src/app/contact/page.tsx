import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Clock, Facebook, LinkedIn, Mail, Phone, Pin, XLogo } from "@/components/Icons";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with FSD Ethiopia in Addis Ababa.",
};

export default function ContactPage() {
  const items = [
    { Icon: Pin, label: "Visit", value: site.address.join(", ") },
    { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
    { Icon: Clock, label: "Hours", value: `${site.hours} · Closed weekends` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's talk." intro="Questions, partnership ideas or media requests — we'd love to hear from you." />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ul className="space-y-6">
              {items.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-100 text-teal-700">
                    <Icon className="size-6" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    {href ? (
                      <a href={href} className="text-lg font-medium text-teal-900 hover:text-green-600">
                        {value}
                      </a>
                    ) : (
                      <span className="text-lg font-medium text-teal-900">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              {[
                [site.social.linkedin, LinkedIn, "LinkedIn"],
                [site.social.facebook, Facebook, "Facebook"],
                [site.social.x, XLogo, "X"],
              ].map(([href, Icon, label]) => {
                const I = Icon as typeof LinkedIn;
                return (
                  <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" aria-label={label as string} className="grid size-11 place-items-center rounded-full bg-teal-700 text-white hover:bg-teal-800">
                    <I className="size-4" />
                  </a>
                );
              })}
            </div>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-sage-200">
              <iframe title="Map showing the FSD Ethiopia office in Addis Ababa" src={site.mapEmbed} className="size-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-teal-900/5 ring-1 ring-sage-200 sm:p-10">
            <h2 className="text-2xl font-semibold text-teal-900">Send us a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
