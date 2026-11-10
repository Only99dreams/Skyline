import { useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Asterisk,
  BookmarkCheck,
  Check,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
} from "lucide-react";
import { CONTACT } from "../config";
import { INTEREST_OPTIONS, SHOWCASE_ITEMS, UPGRADES } from "../content";
import { scrollToId } from "../lib/lenis";
import { cn } from "../lib/utils";
import { useToast } from "./Toast";
import { Reveal } from "./Reveal";

type QuoteProps = {
  selected: string[];
  onToggle: (id: string) => void;
  looks: string[];
  onClearLooks: () => void;
  interest: string;
  onInterestChange: (value: string) => void;
};

type Channel = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  href: string | null;
  toast: string;
};

export function Quote({
  selected,
  onToggle,
  looks,
  onClearLooks,
  interest,
  onInterestChange,
}: QuoteProps) {
  const [status, setStatus] = useState<{
    tone: "success" | "info";
    message: string;
  } | null>(null);
  const showToast = useToast();

  const phoneDigits = CONTACT.phone.replace(/[^\d+]/g, "");
  const whatsappDigits = CONTACT.whatsapp.replace(/\D/g, "");
  const savedLooks = SHOWCASE_ITEMS.filter((item) => looks.includes(item.id));

  const channels: Channel[] = [
    {
      id: "phone",
      label: "Call us",
      hint: CONTACT.phone || "Request a callback",
      icon: Phone,
      href: CONTACT.phone ? `tel:${phoneDigits}` : null,
      toast:
        "Phone details are being added. Request a free quote below and we’ll get back to you.",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      hint: CONTACT.whatsapp ? CONTACT.whatsapp : "Request a chat",
      icon: MessageCircle,
      href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
      toast:
        "WhatsApp details are being added. Send us a quote request below instead.",
    },
    {
      id: "email",
      label: "Email",
      hint: CONTACT.email || "Send a message",
      icon: Mail,
      href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
      toast:
        "Email details are being added. Use the quote form below and we’ll be in touch.",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const chosenUpgrades = UPGRADES.filter((upgrade) =>
      selected.includes(upgrade.id),
    ).map((upgrade) => upgrade.short);
    const chosenLooks = savedLooks.map((item) => item.title);

    const request = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      location: String(data.get("location") ?? ""),
      interest,
      upgrades: chosenUpgrades,
      looks: chosenLooks,
      message: String(data.get("message") ?? ""),
    };

    const body = [
      "New quote request — Skyline",
      `Name: ${request.name}`,
      `Phone: ${request.phone}`,
      request.email ? `Email: ${request.email}` : "",
      request.location ? `Location: ${request.location}` : "",
      `Interested in: ${request.interest}`,
      request.upgrades.length ? `Upgrades: ${request.upgrades.join(", ")}` : "",
      request.looks.length ? `Lookbook: ${request.looks.join(", ")}` : "",
      request.message ? `Message: ${request.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      window.localStorage.setItem(
        "skyline:last-quote-request",
        JSON.stringify({ ...request, createdAt: new Date().toISOString() }),
      );
    } catch {
      // Storage can be unavailable in private modes — the request can still be sent.
    }

    if (CONTACT.whatsapp) {
      window.open(
        `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatus({
        tone: "success",
        message:
          "Your request is ready in WhatsApp — press send there and we’ll take it from here.",
      });
      return;
    }

    if (CONTACT.email) {
      const subject = encodeURIComponent(
        `Quote request — ${request.name || "New home"}`,
      );
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setStatus({
        tone: "success",
        message:
          "Your email app should open with the request. Send it across and we’ll reply shortly.",
      });
      return;
    }

    console.info(
      "Skyline quote request (demo mode). Configure CONTACT in src/config.ts to deliver enquiries:",
      request,
    );
    setStatus({
      tone: "info",
      message:
        "Thanks — your details were saved in this browser, but this demo form isn’t connected to a live inbox yet, so nothing has been sent.",
    });
  };

  return (
    <section id="quote" className="relative overflow-hidden bg-acid py-24 text-ink lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 hidden select-none text-ink/[0.07] lg:block"
      >
        <Asterisk className="size-[26rem]" strokeWidth={0.6} />
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="label flex items-center gap-3 text-ink/70">
                <span className="size-1.5 shrink-0 bg-ink" aria-hidden="true" />
                <span>07</span>
                <span className="h-px w-8 bg-current" aria-hidden="true" />
                <span>Get started</span>
              </div>
              <h2 className="display mt-5 text-[clamp(2.9rem,6vw,5.7rem)]">
                Ready to own
                <br />
                a home you’ll love?
              </h2>
              <p className="mt-7 max-w-md text-[1rem] leading-relaxed text-ink/70">
                Talk to us today for a free consultation and quote. Let’s build
                something great together.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10 border-t border-ink/20">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <span className="flex items-center gap-4">
                      <Icon
                        className="size-5 shrink-0 text-ink/70"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="label block text-ink/65">{channel.label}</span>
                        <span className="mt-1 block text-[0.95rem] font-medium">
                          {channel.hint}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </>
                );

                const className =
                  "group flex w-full items-center justify-between gap-6 border-b border-ink/20 py-4 text-left transition-colors hover:text-ink/60";

                return channel.href ? (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.id === "whatsapp" ? "_blank" : undefined}
                    rel={channel.id === "whatsapp" ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={channel.id}
                    type="button"
                    className={className}
                    onClick={() => {
                      showToast(channel.toast);
                      scrollToId("#quote-form");
                    }}
                  >
                    {content}
                  </button>
                );
              })}
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink/70">
                No obligation. No pressure. Just a clear conversation about what’s
                possible.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              id="quote-form"
              className="border border-ink/10 bg-ink p-6 text-paper shadow-[0_30px_80px_rgba(0,0,0,0.22)] sm:p-9"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <span className="label text-acid">Request a quote</span>
                <span className="label text-paper/60">Free · No obligation</span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Tell us about your project.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">
                A few details are all we need to start the conversation.
              </p>

              <form className="mt-8" onSubmit={handleSubmit}>
                {savedLooks.length > 0 && (
                  <div className="mb-7 border border-acid/30 bg-acid/[0.06] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <BookmarkCheck
                          className="mt-0.5 size-4 shrink-0 text-acid"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="label text-acid">
                            Your saved looks ·{" "}
                            {String(savedLooks.length).padStart(2, "0")}
                          </p>
                          <p className="mt-2 text-[0.82rem] leading-relaxed text-paper/70">
                            {savedLooks.map((item) => item.title).join(" · ")}
                          </p>
                          <p className="mt-2 text-[0.7rem] text-paper/50">
                            We’ll include these in your enquiry.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onClearLooks}
                        aria-label="Clear saved looks"
                        className="grid size-8 shrink-0 place-items-center border border-white/20 text-paper/60 transition-colors hover:border-acid hover:text-acid"
                      >
                        <Trash2
                          className="size-3.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label text-paper/65">
                      Full name <span className="text-acid">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      className="field mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label text-paper/65">
                      Phone <span className="text-acid">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                      required
                      className="field mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label text-paper/65">
                      Email <span className="text-paper/60">(optional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="field mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="label text-paper/65">
                      Location <span className="text-paper/60">(optional)</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Town or city"
                      className="field mt-1"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="interest" className="label text-paper/65">
                    I’m interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={interest}
                    onChange={(event) => onInterestChange(event.target.value)}
                    className="field mt-1"
                  >
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    {!INTEREST_OPTIONS.includes(interest) && (
                      <option value={interest}>{interest}</option>
                    )}
                  </select>
                </div>

                <fieldset className="mt-7">
                  <legend className="label text-paper/65">
                    Upgrades I’d like to discuss{" "}
                    <span className="text-paper/60">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {UPGRADES.map((upgrade) => {
                      const checked = selected.includes(upgrade.id);
                      return (
                        <label
                          key={upgrade.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 border px-3.5 py-2.5 text-[0.78rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acid",
                            checked
                              ? "border-acid bg-acid text-ink"
                              : "border-white/20 text-paper/65 hover:border-white/45 hover:text-paper",
                          )}
                        >
                          <input
                            type="checkbox"
                            name="upgrades"
                            value={upgrade.title}
                            checked={checked}
                            onChange={() => onToggle(upgrade.id)}
                            className="sr-only"
                          />
                          <span
                            className={cn(
                              "grid size-4 place-items-center border",
                              checked
                                ? "border-ink/40 text-ink"
                                : "border-white/30 text-transparent",
                            )}
                          >
                            <Check
                              className="size-3"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          {upgrade.short}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-7">
                  <label htmlFor="message" className="label text-paper/65">
                    Anything else? <span className="text-paper/60">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your plot, timeline, or budget."
                    className="field mt-1 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-8 flex w-full items-center justify-between gap-4 bg-acid px-6 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
                >
                  Request my free quote
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "mt-4 min-h-5 text-[0.82rem] leading-relaxed",
                    status?.tone === "success" ? "text-acid" : "text-paper/65",
                  )}
                >
                  {status?.message}
                </p>

                <p className="mt-2 text-[0.72rem] leading-relaxed text-paper/60">
                  We’ll only use your details to respond to your enquiry.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
