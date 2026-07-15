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

// Animations fade-in, slide-in, zoom-in au scroll 
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }

  });

}, {
  threshold: 0.3
});


elements.forEach(element => {
  observer.observe(element);
});

// onglets jour : programme
const boutons = document.querySelectorAll(".tab");
const plannings = document.querySelectorAll(".planning");

boutons.forEach(bouton => {

    bouton.addEventListener("click", () => {

        boutons.forEach(btn => btn.classList.remove("active"));
        plannings.forEach(planning => planning.classList.remove("active"));

        bouton.classList.add("active");

        const jour = bouton.dataset.day;
        document.getElementById(jour).classList.add("active");

    });

});

// filtres dynamiques des intervenants
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".intervenant");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        // Retirer la classe active
        buttons.forEach(btn => btn.classList.remove("active"));

        // Ajouter active au bouton cliqué
        button.classList.add("active");


        const filter = button.dataset.filter;


        cards.forEach(card => {

            const category = card.dataset.category;


            if(filter === "all" || category === filter){

                card.style.display = "flex";

            }else{

                card.style.display = "none";

            }

        });

    });

});

// 
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent =
                        "+" + Math.ceil(count).toLocaleString("fr-FR");

                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent =
                        "+" + target.toLocaleString("fr-FR");
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

document.querySelectorAll(".count").forEach(counter => {
    counterObserver.observe(counter);
});