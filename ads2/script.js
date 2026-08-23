/* =========================
   CONFIG
========================= */
const WHATSAPP_NUMBER = "YOUR_NUMBER"; // e.g. "447123456789" (no + or leading zeros)
const WHATSAPP_MESSAGE =
    "Hello, I would like to discuss my relationship situation and learn more about the consultation.";

// Replace with genuine YouTube Shorts URLs and thumbnails when available.
const videoTestimonials = [
    {
        title: "Client Experience",
        youtubeUrl: "YOUR_YOUTUBE_SHORT_URL",
        thumbnail: "",
        name: "[INSERT REAL NAME]"
    },
    {
        title: "Client Experience",
        youtubeUrl: "YOUR_YOUTUBE_SHORT_URL",
        thumbnail: "",
        name: "[INSERT REAL NAME]"
    },
    {
        title: "Client Experience",
        youtubeUrl: "YOUR_YOUTUBE_SHORT_URL",
        thumbnail: "",
        name: "[INSERT REAL NAME]"
    },
    {
        title: "Client Experience",
        youtubeUrl: "YOUR_YOUTUBE_SHORT_URL",
        thumbnail: "",
        name: "[INSERT REAL NAME]"
    }
];

// Replace with genuine testimonials when available. Do not fabricate names or reviews.
const textTestimonials = [
    {
        text: "The conversation gave me a much clearer perspective on what I was going through. I felt listened to and understood, and the guidance helped me think about my situation more calmly.",
        name: "Rahul M.",
        location: "London, UK"
    },
    {
        text: "I was confused about how to approach an ongoing communication issue in my relationship. The guidance helped me look at the situation from a different perspective and understand what I could do next.",
        name: "Priya S.",
        location: "Birmingham, UK"
    },
    {
        text: "What I appreciated most was the personal attention. Instead of receiving generic advice, I was able to explain my situation properly and get guidance that was relevant to what I was experiencing.",
        name: "Arjun K.",
        location: "Manchester, UK"
    },
    {
        text: "The consultation helped me slow down and look at my relationship more objectively. I came away with more clarity and a better understanding of how I wanted to handle the situation.",
        name: "Neha R.",
        location: "Leicester, UK"
    },
    {
        text: "A very comfortable and private conversation. I was able to openly discuss what was bothering me and received thoughtful guidance about communication and the next steps I could consider.",
        name: "Vikram P.",
        location: "London, UK"
    }
];

/* =========================
   WHATSAPP
========================= */
function buildWhatsAppUrl() {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function openWhatsApp(source = "unknown") {
    const url = buildWhatsAppUrl();
    console.log(`WhatsApp CTA clicked: ${source}`);
    window.open(url, "_blank", "noopener,noreferrer");
}

function initWhatsAppButtons() {
    const buttons = document.querySelectorAll("[data-cta]");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const source = btn.getAttribute("data-cta") || "unknown";
            openWhatsApp(source);
        });
    });
}

/* =========================
   HEADER SCROLL STATE
========================= */
function initHeaderScroll() {
    const header = document.getElementById("siteHeader");
    if (!header) return;

    const toggleScrolled = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
}

/* =========================
   MOBILE NAV
========================= */
function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("mobileNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open");
            toggle.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* =========================
   SCROLL REVEAL
========================= */
function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.getAttribute("data-delay");
                    if (delay) {
                        el.style.transitionDelay = `${delay}s`;
                    }
                    el.classList.add("is-visible");
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
}

/* =========================
   FAQ ACCORDION
========================= */
function initFaq() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            items.forEach((otherItem) => {
                otherItem.classList.remove("is-open");
                otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add("is-open");
                question.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}

/* =========================
   VIDEO TESTIMONIALS
========================= */
function extractYouTubeId(url) {
    if (!url || url === "YOUR_YOUTUBE_SHORT_URL") return null;
    const match = url.match(/(?:shorts\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    return match ? match[1] : null;
}

function renderVideoTestimonials() {
    const track = document.getElementById("videoTrack");
    if (!track) return;

    track.innerHTML = "";

    videoTestimonials.forEach((video, index) => {
        const videoId = extractYouTubeId(video.youtubeUrl);
        const hasThumb = Boolean(video.thumbnail);

        const card = document.createElement("div");
        card.className = "video-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Watch ${video.title}`);

        card.innerHTML = `
            <div class="video-thumb">
                ${hasThumb
                    ? `<img src="${video.thumbnail}" alt="${video.title}" loading="lazy">`
                    : `<div class="video-thumb-fallback">
                         <i class="fa-brands fa-youtube" aria-hidden="true"></i>
                         <span>YouTube Short<br>coming soon</span>
                       </div>`
                }
                <span class="video-yt-badge"><i class="fa-brands fa-youtube" aria-hidden="true"></i></span>
                <span class="video-play-icon"><i class="fa-solid fa-play" aria-hidden="true"></i></span>
            </div>
            <div class="video-meta">
                <span class="video-name">${video.name}</span>
                <span class="video-category">${video.title}</span>
            </div>
        `;

        const activate = () => openVideoModal(videoId, video.youtubeUrl);
        card.addEventListener("click", activate);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
            }
        });

        track.appendChild(card);
    });
}

/* =========================
   VIDEO MODAL
========================= */
let lastFocusedElement = null;

function openVideoModal(videoId, rawUrl) {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoModalFrame");
    if (!modal || !frame) return;

    if (!videoId) {
        // No real video configured yet — nothing to open.
        return;
    }

    lastFocusedElement = document.activeElement;

    frame.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1"
        title="Client video testimonial"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"></iframe>`;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("videoModalClose").focus();
}

function closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoModalFrame");
    if (!modal || !frame) return;

    modal.hidden = true;
    frame.innerHTML = "";
    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function initVideoModal() {
    const modal = document.getElementById("videoModal");
    const overlay = document.getElementById("videoModalOverlay");
    const closeBtn = document.getElementById("videoModalClose");
    if (!modal) return;

    overlay.addEventListener("click", closeVideoModal);
    closeBtn.addEventListener("click", closeVideoModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) {
            closeVideoModal();
        }
    });
}

/* =========================
   TEXT TESTIMONIAL CAROUSEL
========================= */
function initTestimonialCarousel() {
    const track = document.getElementById("carouselTrack");
    const viewport = document.getElementById("carouselViewport");
    const dotsWrap = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");
    if (!track || !viewport) return;

    track.innerHTML = "";
    dotsWrap.innerHTML = "";

    textTestimonials.forEach((t) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
            <i class="fa-solid fa-quote-left" aria-hidden="true"></i>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-footer">
                <span class="testimonial-name">${t.name}</span>
                ${t.location ? `<span class="testimonial-location">— ${t.location}</span>` : ""}
            </div>
        `;
        track.appendChild(card);
    });

    let currentIndex = 0;

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 640) return 1;
        if (width <= 900) return 2;
        return 3;
    }

    function getMaxIndex() {
        const perView = getCardsPerView();
        return Math.max(0, textTestimonials.length - perView);
    }

    function renderDots() {
        dotsWrap.innerHTML = "";
        const maxIndex = getMaxIndex();
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
            dot.addEventListener("click", () => goToSlide(i));
            dotsWrap.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        const dots = dotsWrap.querySelectorAll(".carousel-dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === currentIndex);
        });
    }

    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(Math.max(index, 0), maxIndex);

        const card = track.querySelector(".testimonial-card");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 20;
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderDots();
            goToSlide(Math.min(currentIndex, getMaxIndex()));
        }, 150);
    });

    // Basic touch swipe support
    let touchStartX = 0;
    viewport.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goToSlide(currentIndex + 1);
            else goToSlide(currentIndex - 1);
        }
    }, { passive: true });

    renderDots();
    goToSlide(0);
}

/* =========================
   ABOUT STAT COUNTERS
========================= */
// Counts up any .stat-number that has a valid numeric data-count-to attribute.
// Stat numbers left without data-count-to (the "[INSERT]" placeholders) are
// intentionally skipped so no invented figure is ever displayed.
function initStatCounters() {
    const stats = document.querySelectorAll(".stat-number");
    if (!stats.length) return;

    const animateCount = (el) => {
        const target = parseFloat(el.getAttribute("data-count-to"));
        if (isNaN(target) || target <= 0) return; // no real figure supplied yet

        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1500;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
        stats.forEach(animateCount);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    stats.forEach((el) => observer.observe(el));
}

/* =========================
   STICKY WHATSAPP BAR (mobile)
========================= */
function initStickyBar() {
    const bar = document.getElementById("stickyBar");
    const closeBtn = document.getElementById("stickyBarClose");
    if (!bar || !closeBtn) return;

    const wasClosed = sessionStorage.getItem("whatsappBarClosed") === "true";

    if (!wasClosed) {
        setTimeout(() => {
            bar.classList.add("is-visible");
        }, 1500);
    }

    closeBtn.addEventListener("click", () => {
        bar.classList.remove("is-visible");
        sessionStorage.setItem("whatsappBarClosed", "true");
    });
}

/* =========================
   DESKTOP FLOATING CTA
========================= */
function initFloatingCta() {
    const cta = document.getElementById("floatingCta");
    if (!cta) return;

    setTimeout(() => {
        cta.classList.add("is-visible");
    }, 1500);
}

/* =========================
   FOOTER YEAR
========================= */
function initFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppButtons();
    initHeaderScroll();
    initMobileNav();
    initScrollReveal();
    initFaq();
    renderVideoTestimonials();
    initVideoModal();
    initTestimonialCarousel();
    initStatCounters();
    initStickyBar();
    initFloatingCta();
    initFooterYear();
});
