/* ==========================================
    SCROLL SUAVE (Lenis)
   ========================================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ==========================================
    CURSOR PERSONALIZADO
   ========================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
  });

  // Efectos Hover Generales
  document.querySelectorAll('a, button, .trabajo, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.backgroundColor = 'rgba(255, 60, 60, 0.1)';
      cursorOutline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.backgroundColor = 'transparent';
      cursorOutline.style.borderColor = 'var(--color-text)';
    });
  });
  
  // FIX IFRAME: Ocultar cursor personalizado sobre el libro interactivo
  const iframeZone = document.querySelector('.iframe-container');
  if (iframeZone) {
    iframeZone.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = 0;
      cursorOutline.style.opacity = 0;
    });
    iframeZone.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
    });
  }
}

/* ==========================================
    ANIMACIONES Y LÓGICA
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  
  // -- Animación del Nombre --
  const words = document.querySelectorAll('.palabra');
  words.forEach(word => {
    const text = new SplitType(word, { types: 'chars' });
    gsap.from(text.chars, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      rotationX: -90,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.2
    });
  });

  // -- Animación del Logo --
  gsap.to(".logo-bg", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
  const tlLogo = gsap.timeline({ repeat: -1, repeatDelay: 0.5, yoyo: true });
  tlLogo
    .to(".logo-m", { strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power2.inOut" })
    .to(".logo-m", { fill: "#efe5d6", duration: 1, ease: "power1.in" })
    .to(".logo-m", { duration: 2 });

  // -- Efecto 3D Galería --
  VanillaTilt.init(document.querySelectorAll(".trabajo"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
    scale: 1.02
  });
});

// -- Scroll Reveal --
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.trabajo, .info p').forEach(el => observer.observe(el));

// -- Menú Hamburguesa --
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// -- Tema Oscuro / Claro --
const toggleTheme = document.getElementById('toggle-theme');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});