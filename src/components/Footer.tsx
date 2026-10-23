import { ArrowUp, ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT } from "../config";
import { NAV } from "../content";
import { scrollToId, scrollToTop } from "../lib/lenis";
import { useToast } from "./Toast";
import { Magnetic } from "./Magnetic";

export function Footer() {
  const showToast = useToast();
  const whatsappDigits = CONTACT.whatsapp.replace(/\D/g, "");

  const contactActions = [
    {
      label: "Call us",
      icon: Phone,
      href: CONTACT.phone ? `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}` : null,
      toast: "Phone details are being added — request a free quote and we’ll be in touch.",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
      toast: "WhatsApp details are being added — use the quote form and we’ll reply.",
    },
    {
      label: "Email",
      icon: Mail,
      href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
      toast: "Email details are being added — use the quote form and we’ll reply.",
    },
  ];

  return (
    <footer className="overflow-hidden border-t border-white/10 bg-ink text-paper">
      <div className="container-x pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex bg-paper px-2 py-1.5"
              aria-label="Skyline Engineering & Construction — back to top"
            >
              <img
                src="./logo.png"
                alt="Skyline Engineering & Construction"
                width="302"
                height="260"
                loading="lazy"
                className="h-12 w-auto"
              />
            </button>
            <p className="mt-7 max-w-xs font-display text-2xl font-medium leading-tight tracking-tight">
              {BRAND.tagline}
            </p>
            <p className="label mt-6 text-paper/60">
              Beautiful homes. Honest prices.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="label text-paper/60">Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(item.href);
                    }}
                    className="link-line text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-paper/60">Get in touch</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#quote"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId("#quote");
                  }}
                  className="link-line text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  Request a quote
                </a>
              </li>
              {contactActions.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.label}>
                    {action.href ? (
                      <a
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          action.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
                      >
                        <Icon
                          className="size-3.5 text-paper/60 transition-colors group-hover:text-acid"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {action.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          showToast(action.toast);
                          scrollToId("#quote");
                        }}
                        className="group inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
                      >
                        <Icon
                          className="size-3.5 text-paper/60 transition-colors group-hover:text-acid"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {action.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-paper/60">Start here</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
              A free, no-obligation conversation about your home, your plot and your
              budget.
            </p>
            <Magnetic className="mt-6">
              <a
                href="#quote"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#quote");
                }}
                className="group inline-flex items-center gap-3 bg-acid px-5 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
              >
                Get a quote
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label max-w-md text-paper/60">
            © {BRAND.year} {BRAND.name}. All rights reserved.
            <span className="mt-1 block normal-case tracking-normal text-paper/55">
              Concept imagery used for illustration; not completed Skyline projects.
            </span>
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 label text-paper/60 transition-colors hover:text-acid"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="relative overflow-hidden border-t border-white/10 pt-8">
          <p
            aria-hidden="true"
            className="display select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,18rem)] leading-[0.72] tracking-[-0.07em] text-white/40"
          >
            SKYLINE<span className="text-acid">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
