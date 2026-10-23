/* ==========================================================================
   Skyline Engineering & Construction — site behaviour
   --------------------------------------------------------------------------
   1. Add your real contact details below. Until they are filled in, the
      "Call Us" / "WhatsApp Us" / "Email Us" links fall back to the quote form.
   2. Quote form submissions are handed to WhatsApp (preferred) or email,
      whichever is configured.
   ========================================================================== */

const CONTACT = {
  phone: "", // e.g. "+27 82 123 4567"
  whatsapp: "", // e.g. "+27 82 123 4567" (digits only is also fine)
  email: "", // e.g. "hello@skylinebuild.co.za"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const digitsOnly = (value) => value.replace(/[^\d]/g, "");

/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* --------------------------------------------------------------------------
   Header state
   -------------------------------------------------------------------------- */
const header = document.getElementById("site-header");
const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

const closeNav = () => {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const openNav = () => {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close menu");
  navMenu.classList.add("is-open");
  document.body.classList.add("nav-open");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeNav() : openNav();
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });
}

/* --------------------------------------------------------------------------
   Toast
   -------------------------------------------------------------------------- */
const toast = document.getElementById("toast");
let toastTimer;

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4200);
};

/* --------------------------------------------------------------------------
   Contact links
   -------------------------------------------------------------------------- */
const contactLinks = document.querySelectorAll("[data-contact]");

const buildContactHref = (type) => {
  if (type === "phone" && CONTACT.phone) return `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;
  if (type === "whatsapp" && CONTACT.whatsapp) {
    return `https://wa.me/${digitsOnly(CONTACT.whatsapp)}`;
  }
  if (type === "email" && CONTACT.email) return `mailto:${CONTACT.email}`;
  return null;
};

contactLinks.forEach((link) => {
  const type = link.dataset.contact;
  const href = buildContactHref(type);

  if (href) {
    link.setAttribute("href", href);
    if (type === "whatsapp") {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Contact details are coming soon — use the quote form and we'll get back to you.");
      const form = document.getElementById("quote-form");
      if (form) form.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    });
  }
});

/* --------------------------------------------------------------------------
   Scroll reveal
   -------------------------------------------------------------------------- */
const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* --------------------------------------------------------------------------
   Quote form
   -------------------------------------------------------------------------- */
const form = document.getElementById("quote-form");
const statusEl = document.getElementById("form-status");
const jumpButton = document.getElementById("jump-to-form");

const setStatus = (message, isError = false) => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.add("is-visible");
  statusEl.classList.toggle("is-error", isError);
};

if (jumpButton && form) {
  jumpButton.addEventListener("click", () => {
    form.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    const firstField = form.querySelector("input, select, textarea");
    if (firstField) {
      window.setTimeout(() => firstField.focus({ preventScroll: true }), prefersReducedMotion ? 0 : 450);
    }
  });
}

if (form) {
  form.addEventListener("input", () => {
    if (statusEl) statusEl.classList.remove("is-visible", "is-error");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const location = String(data.get("location") || "").trim();
    const interest = String(data.get("interest") || "Not sure yet");
    const message = String(data.get("message") || "").trim();
    const upgrades = data.getAll("upgrades").map(String);

    const lines = [
      "New quote request — Skyline website",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      location ? `Location: ${location}` : null,
      `Interested in: ${interest}`,
      upgrades.length ? `Upgrades: ${upgrades.join(", ")}` : "Upgrades: none selected",
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    const body = lines.join("\n");

    if (CONTACT.whatsapp) {
      const url = `https://wa.me/${digitsOnly(CONTACT.whatsapp)}?text=${encodeURIComponent(body)}`;
      window.open(url, "_blank", "noopener");
      setStatus("Opening WhatsApp with your request — just press send and we'll be in touch.");
      form.reset();
      return;
    }

    if (CONTACT.email) {
      const subject = `Quote request — ${interest}${location ? ` (${location})` : ""}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Opening your email app with the request — press send and we'll be in touch.");
      form.reset();
      return;
    }

    // No contact channel configured yet.
    console.info("[Skyline] Quote request (no contact channel configured):\n\n" + body);
    setStatus(
      "Your request is ready, but this site isn't connected to WhatsApp or email yet. " +
        "Add contact details in assets/js/main.js to enable sending.",
      true
    );
  });
}
