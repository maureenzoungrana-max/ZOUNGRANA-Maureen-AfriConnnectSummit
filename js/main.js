// menu hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Ouverture/Fermeture du menu
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// navbar dynamique
const navbar = document.querySelector(".navbar");

// Changement de la navbar après 80 px
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// dark-mode
(function () {

  const root = document.documentElement;

  function updateIcon(toggler, theme) {
    toggler.innerHTML = theme === "dark"
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-fill"></i>';
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document.querySelectorAll("[data-theme-toggler]").forEach((toggler) => {
      updateIcon(toggler, theme);
    });
  }

  function toggleDarkMode() {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }

  // adaptation a la préférence du systeme
  function init() {
    const storedPreference = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedPreference || (systemPrefersDark ? "dark" : "light");
    root.setAttribute("data-theme", theme);
  }

  init();

  document.addEventListener("DOMContentLoaded", function () {
    const togglers = document.querySelectorAll("[data-theme-toggler]");
    togglers.forEach((toggler) => {
      updateIcon(toggler, root.getAttribute("data-theme"));
      toggler.addEventListener("click", toggleDarkMode);
    });
  });

})();

// ligne de copyrigth
const copyright = document.getElementById("copyrigth");

copyright.innerHTML =
`&copy; ${new Date().getFullYear()} AfriConnect Summit - Tous droits réservés.`;
