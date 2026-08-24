/* ==========================================================================
   Acharya Guru Ji — Relationship Mentorship Landing Page
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. WhatsApp configuration
   -------------------------------------------------------------------------- */
const WHATSAPP_URL = "YOUR_WHATSAPP_LINK_HERE"; // e.g. "https://wa.me/44XXXXXXXXXX"
const WHATSAPP_MESSAGE =
  "Hello, I would like to discuss my relationship situation and learn more about the consultation.";

function buildWhatsAppUrl() {
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
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
     3. Mobile sticky WhatsApp bar
     ------------------------------------------------------------------------ */
  const stickyBar = document.getElementById("sticky-bar");
  const stickyBarClose = document.getElementById("sticky-bar-close");

  if (stickyBar && !sessionStorage.getItem("whatsappBarClosed")) {
    setTimeout(() => stickyBar.classList.add("is-visible"), 1500);
  } else if (stickyBar) {
    stickyBar.style.display = "none";
  }

  if (stickyBarClose) {
    stickyBarClose.addEventListener("click", (e) => {
      e.stopPropagation();
      stickyBar.classList.remove("is-visible");
      sessionStorage.setItem("whatsappBarClosed", "true");
      setTimeout(() => (stickyBar.style.display = "none"), 550);
    });
  }

  /* ------------------------------------------------------------------------
     4. FAQ accordion
     ------------------------------------------------------------------------ */
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

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
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------------------
     6. Footer year
     ------------------------------------------------------------------------ */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     7. About section — swap caption when a tab is clicked
     ------------------------------------------------------------------------ */
  const aboutTabs = document.querySelectorAll(".about-tab");
  const captionTitle = document.getElementById("about-caption-title");
  const captionSub = document.getElementById("about-caption-sub");

  aboutTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      aboutTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      if (captionTitle) captionTitle.textContent = tab.dataset.title;
      if (captionSub) captionSub.textContent = tab.dataset.sub;
    });
  });

  /* ------------------------------------------------------------------------
     8. Testimonials — Video / Written tab switcher
     ------------------------------------------------------------------------ */
  const tabVideo = document.getElementById("tab-video");
  const tabWritten = document.getElementById("tab-written");
  const panelVideo = document.getElementById("panel-video");
  const panelWritten = document.getElementById("panel-written");

  function activateTestimonialTab(tab, panel, otherTab, otherPanel) {
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    otherTab.classList.remove("is-active");
    otherTab.setAttribute("aria-selected", "false");
    panel.classList.add("is-active");
    otherPanel.classList.remove("is-active");
  }

  if (tabVideo && tabWritten) {
    tabVideo.addEventListener("click", () =>
      activateTestimonialTab(tabVideo, panelVideo, tabWritten, panelWritten)
    );
    tabWritten.addEventListener("click", () =>
      activateTestimonialTab(tabWritten, panelWritten, tabVideo, panelVideo)
    );
  }

  /* ------------------------------------------------------------------------
     9. Video testimonial modal
     ------------------------------------------------------------------------ */
  const videoModal = document.getElementById("video-modal");
  const videoModalClose = document.getElementById("video-modal-close");
  const videoModalBackdrop = document.getElementById("video-modal-backdrop");
  const videoModalTopic = document.getElementById("video-modal-topic");
  const videoModalName = document.getElementById("video-modal-name");
  const videoModalLocation = document.getElementById("video-modal-location");

  function openVideoModal(card) {
    if (!videoModal) return;
    videoModalTopic.textContent = card.dataset.topic || "";
    videoModalName.textContent = card.dataset.name || "";
    videoModalLocation.textContent = card.dataset.location || "";
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".video-card").forEach((card) => {
    const playBtn = card.querySelector(".video-play");
    const watchBtn = card.querySelector(".video-watch");
    [playBtn, watchBtn].forEach((btn) => {
      if (btn) btn.addEventListener("click", () => openVideoModal(card));
    });
  });

  if (videoModalClose) videoModalClose.addEventListener("click", closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener("click", closeVideoModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideoModal();
  });

  /* ------------------------------------------------------------------------
     10. Written reviews carousel
     ------------------------------------------------------------------------ */
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsWrap = document.getElementById("carousel-dots");

  if (track) {
    const slides = Array.from(track.children);
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Go to review ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));
  }
});
