/* ======================================================================
   CONFIG — edit everything here. No need to touch the HTML/CSS to
   change WhatsApp number, review counts, quotes, videos, etc.
   ====================================================================== */
const CONFIG = {
  whatsapp: {
    number: "447442217945", // digits only, no +
    defaultMessage: "Hello Acharya Guru Ji, I need help with my relationship",
    urgentMessage: "Hello Acharya Guru Ji, I need urgent help"
  },
  instagramUrl: "https://www.instagram.com/solutionbreakup",

  marqueeItems: [
    "10,000+ Happy Clients",
    "4.9 / 5 Star Rating",
    "100% Confidential",
    "UK & Canada Specialist",
    "24/7 Available",
    "15+ Years Experience"
  ],

  // Video testimonials — horizontal-scroll cards.
  // youtubeId: leave "" to show a placeholder card instead of a real video.
  videoReviews: [
    { youtubeId: "rEKe_hckR-s", name: "Emily, UK", role: "Got her ex back in 21 days" },
    { youtubeId: "md5ZiP_q3IY", name: "Jason, Canada", role: "Marriage was saved" },
    { youtubeId: "y4YiHWbG-04", name: "Client Story", role: "Client Experience" },
    { youtubeId: "laCedqqXQ_E", name: "Priya", role: "Guidance in a difficult time" }
  ],

  // WhatsApp screenshot reviews
  chatReviews: [
    { img: "https://acharyagurujiuk.com/assets/Whatsapp%20reviews/Review1.png", alt: "WhatsApp review 1" },
    { img: "https://acharyagurujiuk.com/assets/Whatsapp%20reviews/Review2.png", alt: "WhatsApp review 2" },
    { img: "https://acharyagurujiuk.com/assets/Whatsapp%20reviews/Review3.png", alt: "WhatsApp review 3" },
    { img: "https://acharyagurujiuk.com/assets/Whatsapp%20reviews/Review4.png", alt: "WhatsApp review 4" }
  ],

  // Written quote reviews
  quoteReviews: [
    {
      stars: 5,
      quote: "I was completely broken after my partner of 4 years left suddenly. Within 3 weeks my partner came back and we are stronger than ever.",
      name: "Emily Richardson",
      location: "London, UK \u{1F1EC}\u{1F1E7}",
      avatar: "https://acharyagurujiuk.com/assets/pp/images.jpg"
    },
    {
      stars: 5,
      quote: "I was sceptical at first, but after a few days my ex called out of nowhere. Worth every penny — he is the real deal.",
      name: "Jason Mitchell",
      location: "Toronto, Canada \u{1F1E8}\u{1F1E6}",
      avatar: "https://acharyagurujiuk.com/assets/pp/boy-3.jpg"
    },
    {
      stars: 5,
      quote: "My marriage was on the edge of divorce — constant fighting, no love left. Guru Ji identified the issue and gave a clear solution.",
      name: "Sarah Khan",
      location: "Manchester, UK \u{1F1EC}\u{1F1E7}",
      avatar: "https://acharyagurujiuk.com/assets/pp/girl-3.jpg"
    },
    {
      stars: 5,
      quote: "After finding out my partner was cheating I was shattered. Guru Ji gave me real strength and a clear path forward.",
      name: "Raj Patel",
      location: "Vancouver, Canada \u{1F1E8}\u{1F1E6}",
      avatar: "https://acharyagurujiuk.com/assets/pp/boy-2.jpg"
    },
    {
      stars: 5,
      quote: "My parents were completely against our relationship. Through Guru Ji's guidance, they gave their blessing within a month.",
      name: "Michael Tran",
      location: "Calgary, Canada \u{1F1E8}\u{1F1E6}",
      avatar: "https://acharyagurujiuk.com/assets/pp/boy-1.jpg"
    }
  ],

  // Sticky bottom mini CTA card (desktop + mobile popup)
  stickyCta: {
    enabled: true,
    heading: "Need Relationship Guidance?",
    subtext: "Start a private conversation",
    buttonText: "Chat Now",
    showAfterScrollPx: 500,
    reopenEverySession: true // if false, once closed it stays closed until page reload
  },

  // Sticky bottom bar (mobile quick-action strip)
  stickyBar: {
    enabled: true,
    title: "Free private consultation",
    subtitle: "Available 24/7 · 100% confidential",
    buttonText: "Chat Now",
    showAfterScrollPx: 400
  }
};

/* ====================================================================== */

function waLink(message) {
  const text = encodeURIComponent(message || CONFIG.whatsapp.defaultMessage);
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${text}`;
}

function starString(n) {
  return "★★★★★".slice(0, n) || "★★★★★";
}

/* ---------- header scroll state ---------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ---------- wire static WhatsApp / Instagram links from CONFIG ---------- */
function wireStaticLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const kind = el.getAttribute("data-wa"); // "default" | "urgent" | "bare"
    const msg =
      kind === "urgent" ? CONFIG.whatsapp.urgentMessage :
      kind === "bare" ? "" :
      CONFIG.whatsapp.defaultMessage;
    el.href = kind === "bare" ? `https://wa.me/${CONFIG.whatsapp.number}` : waLink(msg);
  });
  document.querySelectorAll("[data-ig]").forEach((el) => {
    el.href = CONFIG.instagramUrl;
  });
  document.querySelectorAll("[data-wa-tel]").forEach((el) => {
    el.textContent = `+${CONFIG.whatsapp.number.replace(/^44/, "44 ")}`;
  });
}

/* ---------- marquee ---------- */
function buildMarquee() {
  const marqueeEl = document.getElementById("marquee");
  if (!marqueeEl) return;
  let html = "";
  for (let r = 0; r < 2; r++) {
    CONFIG.marqueeItems.forEach((t) => {
      html += `<span><i class="fa-solid fa-circle"></i>${t}</span>`;
    });
  }
  marqueeEl.innerHTML = html;
}

/* ---------- mentor image selector ---------- */
function initMentorSelector() {
  document.querySelectorAll(".selector-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".selector-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

/* ---------- review tabs ---------- */
function initReviewTabs() {
  document.querySelectorAll(".rev-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".rev-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".rev-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
    });
  });
}

/* ---------- build video review cards (horizontal scroll) ---------- */
function buildVideoReviews() {
  const scroller = document.getElementById("videoScroller");
  if (!scroller) return;

  scroller.innerHTML = CONFIG.videoReviews.map((v, i) => {
    const inner = v.youtubeId
      ? `<div class="v-thumb"><div class="play"><i class="fa-solid fa-play"></i></div></div>`
      : `<div class="v-thumb"><div class="play"><i class="fa-solid fa-play"></i></div><div class="placeholder-text">Video coming soon</div></div>`;
    return `
      <div class="v-item">
        <div class="v-card" data-yt="${v.youtubeId}" data-index="${i}">
        //   ${inner}
        <iframe src="https://www.youtube.com/embed/${v.youtubeId}?autoplay=0" title="Client video testimonial" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="v-name">${v.name}</div>
        <div class="v-role">${v.role}</div>
        <div class="v-underline"></div>
      </div>
    `;
  }).join("");

  scroller.querySelectorAll(".v-card").forEach((card) => {
    card.addEventListener("click", () => {
      const yt = card.dataset.yt;
      if (!yt) return; // placeholder card, nothing to play yet
      card.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1" title="Client video testimonial" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    });
  });
}

/* ---------- video scroller nav buttons ---------- */
function initVideoScrollerNav() {
  const scroller = document.getElementById("videoScroller");
  const left = document.getElementById("videoLeft");
  const right = document.getElementById("videoRight");
  if (!scroller || !left || !right) return;
  left.addEventListener("click", () => scroller.scrollBy({ left: -250, behavior: "smooth" }));
  right.addEventListener("click", () => scroller.scrollBy({ left: 250, behavior: "smooth" }));
}

/* ---------- build chat screenshot reviews ---------- */
function buildChatReviews() {
  const scroller = document.getElementById("chatScroller");
  if (!scroller) return;
  scroller.innerHTML = CONFIG.chatReviews.map((c) => `
    <div class="chat-card"><img src="${c.img}" alt="${c.alt}" loading="lazy"></div>
  `).join("");
}

/* ---------- build written quote reviews ---------- */
function buildQuoteReviews() {
  const scroller = document.getElementById("quoteScroller");
  if (!scroller) return;
  scroller.innerHTML = CONFIG.quoteReviews.map((q) => `
    <div class="quote-card">
      <div class="stars">${starString(q.stars)}</div>
      <p class="q">"${q.quote}"</p>
      <div class="who">
        <img src="${q.avatar}" alt="${q.name}" loading="lazy">
        <div><b>${q.name}</b><span>${q.location}</span></div>
      </div>
    </div>
  `).join("");
}

/* ---------- quote scroller nav buttons ---------- */
function initQuoteScrollerNav() {
  const qScroller = document.getElementById("quoteScroller");
  const leftBtn = document.getElementById("quoteLeft");
  const rightBtn = document.getElementById("quoteRight");
  if (!qScroller || !leftBtn || !rightBtn) return;
  leftBtn.addEventListener("click", () => qScroller.scrollBy({ left: -340, behavior: "smooth" }));
  rightBtn.addEventListener("click", () => qScroller.scrollBy({ left: 340, behavior: "smooth" }));
}

/* ---------- faq accordion ---------- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const a = item.querySelector(".faq-a");
    if (item.classList.contains("open")) a.style.maxHeight = a.scrollHeight + "px";
    item.querySelector(".faq-q").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = 0;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------- sticky bottom mini CTA card ---------- */
function initStickyCta() {
  const cfg = CONFIG.stickyCta;
  const card = document.getElementById("stickyCta");
  if (!cfg.enabled || !card) return;

  card.querySelector(".sticky-cta-heading").textContent = cfg.heading;
  card.querySelector(".sticky-cta-subtext").textContent = cfg.subtext;
  card.querySelector(".sticky-cta-btn").innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${cfg.buttonText}`;
  card.querySelector(".sticky-cta-btn").href = waLink(CONFIG.whatsapp.defaultMessage);

  const closedKey = "stickyCtaClosed";
  let dismissed = sessionStorage.getItem(closedKey) === "1";

  const closeBtn = card.querySelector(".sticky-cta-close");
  closeBtn.addEventListener("click", () => {
    card.classList.remove("visible");
    dismissed = true;
    if (!cfg.reopenEverySession) sessionStorage.setItem(closedKey, "1");
  });

  window.addEventListener("scroll", () => {
    if (dismissed) return;
    if (window.scrollY > cfg.showAfterScrollPx) {
      card.classList.add("visible");
    }
  });
}

/* ---------- sticky bottom bar (mobile) ---------- */
function initStickyBar() {
  const cfg = CONFIG.stickyBar;
  const bar = document.getElementById("stickyBar");
  if (!cfg.enabled || !bar) return;

  bar.querySelector(".sticky-bar-title").textContent = cfg.title;
  bar.querySelector(".sticky-bar-subtitle").textContent = cfg.subtitle;
  bar.querySelector(".sticky-bar-btn").innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${cfg.buttonText}`;
  bar.querySelector(".sticky-bar-btn").href = waLink(CONFIG.whatsapp.defaultMessage);

  window.addEventListener("scroll", () => {
    bar.classList.toggle("visible", window.scrollY > cfg.showAfterScrollPx);
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireStaticLinks();
  initHeaderScroll();
  buildMarquee();
  initMentorSelector();
  initReviewTabs();
  buildVideoReviews();
  initVideoScrollerNav();
  buildChatReviews();
  buildQuoteReviews();
  initQuoteScrollerNav();
  initFaqAccordion();
  initStickyCta();
  initStickyBar();
});









const GALLERY_ITEMS = [
    {
        id: 1,
        aspect: "tall",
        bg: "from-emerald-950 via-green-900 to-black",
        label: "Sacred Yantra Ceremony",
        img: "https://www.lovespellcaster.uk/gallery/img-c-1.jpg",
    },
    {
        id: 2,
        aspect: "wide",
        bg: "from-green-950 via-emerald-900 to-slate-950",
        label: "Consultation Session",
        img: "https://www.lovespellcaster.uk/gallery/img-c-2.jpg",
    },
    {
        id: 3,
        aspect: "square",
        bg: "from-teal-950 via-green-900 to-black",
        label: "Vedic Rituals",
        img: "https://www.lovespellcaster.uk/gallery/img-c-3.jpg",
    },
    {
        id: 4,
        aspect: "square",
        bg: "from-slate-950 via-emerald-900 to-green-950",
        label: "Client Blessings",
        img: "https://www.lovespellcaster.uk/gallery/img-c-4.jpg",
    },
    {
        id: 5,
        aspect: "tall",
        bg: "from-green-950 via-teal-900 to-black",
        label: "Temple Prayers",
        img: "https://www.lovespellcaster.uk/gallery/img-c-5.jpg",
    },
    {
        id: 6,
        aspect: "wide",
        bg: "from-emerald-950 via-green-800 to-black",
        label: "Success Ceremony",
        img: "https://www.lovespellcaster.uk/gallery/img-c-7.jpg",
    },
];


document.addEventListener("DOMContentLoaded", () => {

    const track =
        document.getElementById("galleryTrack");

    const dotsContainer =
        document.getElementById("galleryDots");

    const prev =
        document.getElementById("galleryPrev");

    const next =
        document.getElementById("galleryNext");

    const viewport =
        document.querySelector(".gallery-viewport");


    if (!track || !viewport) return;


    let currentIndex = 0;

    let autoplay;


    /* =========================================
       CREATE CARDS
    ========================================= */

    GALLERY_ITEMS.forEach((item) => {

        const card =
            document.createElement("div");

        card.className = "gallery-card";

        card.innerHTML = `
            <img
                src="${item.img}"
                alt="${item.label}"
                loading="lazy"
            >

            <div class="gallery-caption">
                ${item.label}
            </div>
        `;

        track.appendChild(card);

    });


    const cards =
        [...track.querySelectorAll(".gallery-card")];


    /* =========================================
       CREATE DOTS
    ========================================= */

    GALLERY_ITEMS.forEach((item, index) => {

        const dot =
            document.createElement("button");

        dot.className = "gallery-dot";

        dot.setAttribute(
            "aria-label",
            `Show gallery image ${index + 1}`
        );

        dot.addEventListener("click", () => {

            goToSlide(index);

            restartAutoplay();

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        [...dotsContainer.querySelectorAll(".gallery-dot")];


    /* =========================================
       CALCULATE CENTER
    ========================================= */

    function getOffset(index) {

        const card =
            cards[index];

        const viewportWidth =
            viewport.clientWidth;

        const cardCenter =
            card.offsetLeft +
            card.offsetWidth / 2;

        return (
            viewportWidth / 2 -
            cardCenter
        );

    }


    /* =========================================
       GO TO SLIDE
    ========================================= */

    function goToSlide(index) {

        currentIndex =
            (index + cards.length) %
            cards.length;


        const offset =
            getOffset(currentIndex);


        track.style.transform =
            `translate3d(${offset}px, 0, 0)`;


        cards.forEach((card, i) => {

            card.classList.toggle(
                "active",
                i === currentIndex
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentIndex
            );

        });

    }


    /* =========================================
       CONTROLS
    ========================================= */

    next.addEventListener(
        "click",
        () => {

            goToSlide(
                currentIndex + 1
            );

            restartAutoplay();

        }
    );


    prev.addEventListener(
        "click",
        () => {

            goToSlide(
                currentIndex - 1
            );

            restartAutoplay();

        }
    );


    /* =========================================
       AUTOPLAY
    ========================================= */

    function startAutoplay() {

        clearInterval(autoplay);

        autoplay =
            setInterval(() => {

                goToSlide(
                    currentIndex + 1
                );

            }, 3500);

    }


    function restartAutoplay() {

        clearInterval(autoplay);

        startAutoplay();

    }


    /* =========================================
       SWIPE
    ========================================= */

    let touchStart = 0;

    viewport.addEventListener(
        "touchstart",
        (e) => {

            touchStart =
                e.changedTouches[0].screenX;

            clearInterval(autoplay);

        },
        { passive: true }
    );


    viewport.addEventListener(
        "touchend",
        (e) => {

            const touchEnd =
                e.changedTouches[0].screenX;

            const distance =
                touchStart - touchEnd;


            if (Math.abs(distance) > 45) {

                if (distance > 0) {

                    goToSlide(
                        currentIndex + 1
                    );

                } else {

                    goToSlide(
                        currentIndex - 1
                    );

                }

            }

            startAutoplay();

        },
        { passive: true }
    );


    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            goToSlide(currentIndex);

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    goToSlide(0);

    startAutoplay();

});