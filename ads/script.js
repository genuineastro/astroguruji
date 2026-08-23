/* ==========================================================================
   Acharya Guru Ji — Relationship Mentorship Landing Page
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. WhatsApp configuration
   Update these two values to change the destination number and prefilled
   message across every WhatsApp CTA on the page.
   -------------------------------------------------------------------------- */
const WHATSAPP_URL = "YOUR_WHATSAPP_LINK_HERE"; // e.g. "https://wa.me/44XXXXXXXXXX"
const WHATSAPP_MESSAGE =
  "Hello, I would like to discuss my relationship situation and learn more about the consultation.";

function buildWhatsAppUrl() {
  // If WHATSAPP_URL is already a full wa.me link, append the prefilled text.
  // If it has been replaced with a placeholder, just return it as-is.
  if (!WHATSAPP_URL || WHATSAPP_URL === "YOUR_WHATSAPP_LINK_HERE") {
    return WHATSAPP_URL;
  }
  const separator = WHATSAPP_URL.includes("?") ? "&" : "?";
  return `${WHATSAPP_URL}${separator}text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function openWhatsApp() {
  const url = buildWhatsAppUrl();
  if (!url || url === "YOUR_WHATSAPP_LINK_HERE") {
    console.warn("WHATSAPP_URL has not been configured yet in script.js");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.addEventListener("click", openWhatsApp);
  });

  /* ------------------------------------------------------------------------
     2. Sticky header shadow on scroll
     ------------------------------------------------------------------------ */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
     3. Mobile sticky WhatsApp bar
     Appears ~1.5s after load, dismiss state remembered for the session.
     ------------------------------------------------------------------------ */
  const stickyBar = document.getElementById("sticky-bar");
  const stickyBarClose = document.getElementById("sticky-bar-close");

  if (stickyBar && !sessionStorage.getItem("whatsappBarClosed")) {
    setTimeout(() => {
      stickyBar.classList.add("is-visible");
    }, 1500);
  } else if (stickyBar) {
    stickyBar.style.display = "none";
  }

  if (stickyBarClose) {
    stickyBarClose.addEventListener("click", (e) => {
      e.stopPropagation();
      stickyBar.classList.remove("is-visible");
      sessionStorage.setItem("whatsappBarClosed", "true");
      setTimeout(() => {
        stickyBar.style.display = "none";
      }, 550);
    });
  }

  /* ------------------------------------------------------------------------
     4. FAQ accordion (keyboard accessible)
     ------------------------------------------------------------------------ */
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // Close all other panels for a clean single-open accordion.
      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
          const otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
          otherPanel.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });

  /* ------------------------------------------------------------------------
     5. Scroll-reveal animation
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported.
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------------------
     6. Footer year
     ------------------------------------------------------------------------ */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
