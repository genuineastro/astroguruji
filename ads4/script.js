// header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

// marquee content
const marqueeItems = ["10,000+ Happy Clients", "4.9 / 5 Star Rating", "100% Confidential", "UK & Canada Specialist", "24/7 Available", "15+ Years Experience"];
const marqueeEl = document.getElementById('marquee');
const buildMarquee = () => { let html = ''; for (let r = 0; r < 2; r++) { marqueeItems.forEach(t => { html += `<span><i class="fa-solid fa-circle"></i>${t}</span>`; }); } marqueeEl.innerHTML = html; };
buildMarquee();

// mentor image selector (purely visual state toggle; wire real srcs when photos are added)
document.querySelectorAll('.selector-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.selector-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// review tabs
document.querySelectorAll('.rev-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.rev-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.rev-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
});

// video cards -> load iframe on click (perf: no autoplay on load)
document.querySelectorAll('.v-card').forEach(card => {
    card.addEventListener('click', () => {
        const yt = card.dataset.yt;
        card.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1" title="Client video testimonial" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    });
});

// quote scroller nav
const qScroller = document.getElementById('quoteScroller');
document.getElementById('quoteLeft').addEventListener('click', () => qScroller.scrollBy({ left: -340, behavior: 'smooth' }));
document.getElementById('quoteRight').addEventListener('click', () => qScroller.scrollBy({ left: 340, behavior: 'smooth' }));

// faq accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const a = item.querySelector('.faq-a');
    if (item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    item.querySelector('.faq-q').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = 0; });
        if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
});