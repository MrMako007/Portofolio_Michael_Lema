// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.trabajo, .info p').forEach(el => {
  observer.observe(el);
});

// Función para actualizar íconos de redes según el tema
function actualizarIconosRedes() {
  const modoOscuro = document.body.classList.contains('dark-mode');
  document.querySelectorAll('.icono-red').forEach(icono => {
    const src = modoOscuro ? icono.dataset.dark : icono.dataset.light;
    icono.setAttribute('src', src);
  });
}

// Modo oscuro/claro con persistencia
const toggleTheme = document.getElementById('toggle-theme');

// Al cargar, aplicar preferencia guardada
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}
actualizarIconosRedes();

// Al cambiar, alternar clase y actualizar íconos
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  actualizarIconosRedes();
});