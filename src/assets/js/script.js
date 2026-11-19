const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const dots = Array.from(document.querySelectorAll(".carousel__dot"));
const previousButton = document.querySelector(".carousel__previous");
const nextButton = document.querySelector(".carousel__next");
const carousel = document.querySelector(".carousel");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const caption = document.querySelector(".hero__caption");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterNotice = document.querySelector("#newsletter-notice");

let activeSlide = 0;
let autoplayTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("is-active", isActive);

    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  const slideNumber = String(activeSlide + 1).padStart(2, "0");
  caption.innerHTML = `<span>${slideNumber}</span> / 07 <i></i> Ingeniería que despierta los sentidos`;
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();

  if (!reducedMotion.matches && !document.hidden) {
    autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);
document.addEventListener("visibilitychange", startAutoplay);

reducedMotion.addEventListener("change", startAutoplay);
startAutoplay();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.focus();
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterNotice.textContent =
    "El formulario está listo, pero la suscripción aún no está conectada al servicio.";
});
