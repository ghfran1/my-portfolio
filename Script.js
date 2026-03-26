// =========================================
// 1. Mobile Menu Functionality
// =========================================
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// =========================================
// 2. Header: add .scrolled class on scroll
// =========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// =========================================
// 3. Scroll Spy: Highlight Active Nav Link
// =========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function scrollSpy() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160; // adjust for fixed header
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollSpy);
window.addEventListener('load', scrollSpy);

// =========================================
// 4. ScrollReveal Animations (Responsive Safe)
// =========================================
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1000,
        easing: 'ease-out',
        reset: false, // don't repeat animations
        mobile: false // disable animations on small screens for responsiveness
    });

    sr.reveal('.hero-subtitle', { origin: 'top', delay: 100 });
    sr.reveal('.hero-title', { origin: 'left', delay: 200 });
    sr.reveal('.hero-role', { origin: 'right', delay: 300 });
    sr.reveal('.hero-description', { origin: 'bottom', delay: 400 });
    sr.reveal('.hero-buttons', { origin: 'bottom', delay: 500 });
    sr.reveal('.hero-socials', { origin: 'bottom', delay: 600 });

    sr.reveal('.about-image', { origin: 'left', delay: 100 });
    sr.reveal('.about-text', { origin: 'right', delay: 200 });

    sr.reveal('.timeline-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.skills-grid', { origin: 'bottom', interval: 200 });
    sr.reveal('.services-list .service-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.projects-grid .project-card', { origin: 'bottom', interval: 200 });
    sr.reveal('.edu-certs-grid', { origin: 'bottom', interval: 200 });
    sr.reveal('.contact-info', { origin: 'left', delay: 100 });
    sr.reveal('.contact-form', { origin: 'right', delay: 200 });
}

// =========================================
// 5. Scroll To Top Button
// =========================================
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// 6. Contact Form AJAX Submission
// =========================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        fetch('https://formsubmit.co/ajax/ghfransabry911@gmail.com', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                successMessage.style.display = 'flex';
                contactForm.reset();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = 'Error! Try again.';
                submitBtn.disabled = false;
            });
    });
}

// =========================================
// 7. Testimonials Slider
// =========================================
(function () {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('testimonialsDots');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;
    let autoTimer;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonials-dot');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(dot);
    });

    function goTo(i) {
        current = (i + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dotsWrap.querySelectorAll('.testimonials-dot').forEach((d, idx) => {
            d.classList.toggle('active', idx === current);
        });
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }
    startAuto();

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });

    // Touch / swipe
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', startAuto);

    // ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.testimonials-subtitle', { origin: 'top', delay: 100, distance: '30px', duration: 800 });
        ScrollReveal().reveal('.testimonials-slider', { origin: 'bottom', delay: 200, distance: '40px', duration: 900 });
        ScrollReveal().reveal('.testimonials-controls', { origin: 'bottom', delay: 400, distance: '20px', duration: 800 });
    }
}());








const themeBtn = document.getElementById("theme-toggle");

themeBtn.onclick = function () {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }else{
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
};












let currentLang = "en";

const translations = {

  en: {
    home: "Home",
    about: "About",
    education: "Education",
    skills: "Skills",
    experience: "Experience",
    services: "Services",
    projects: "Projects",
    testimonials: "Testimonials",
    plans: "Plans",
    contact: "Contact Me",
    hero_subtitle: "Welcome to my world"
  },

  ar: {
    home: "الرئيسية",
    about: "من أنا",
    education: "التعليم",
    skills: "المهارات",
    experience: "الخبرات",
    services: "الخدمات",
    projects: "المشاريع",
    testimonials: "آراء العملاء",
    plans: "الخطط",
    contact: "تواصل معي",
    hero_subtitle: "مرحباً بك في عالمي"
  }

};

document.getElementById("lang-toggle").onclick = function () {

  const elements = document.querySelectorAll("[data-key]");

  if (currentLang === "en") {

    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      el.innerText = translations.ar[key];
    });

    document.body.style.direction = "rtl";
    this.innerText = "EN";
    currentLang = "ar";

  } else {

    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      el.innerText = translations.en[key];
    });

    document.body.style.direction = "ltr";
    this.innerText = "AR";
    currentLang = "en";

  }

};