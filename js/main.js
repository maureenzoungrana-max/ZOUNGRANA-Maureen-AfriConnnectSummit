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

// validation du formulaire 
const form = document.getElementById("contact-form");

const nom = document.getElementById("nom");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const participation = document.getElementById("participation");
const pays = document.getElementById("pays");
const message = document.getElementById("message");

const successMessage = document.getElementById("success-message");
if(form){

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valide = true;

    // Effacer les anciens messages
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    // Réinitialiser les classes
    document
        .querySelectorAll("input, select, textarea")
        .forEach(element => {
            element.classList.remove("success", "error-input");
        });

    successMessage.textContent = "";
    successMessage.classList.remove("success-message");

    // verification du nom
    if (nom.value.trim() === "") {

        document.getElementById("nom-error").textContent =
            "Le nom est obligatoire.";

        nom.classList.add("error-input");
        valide = false;

    } else {

        nom.classList.add("success");
    }

    // verification de l'email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.value.trim())) {

        document.getElementById("email-error").textContent =
            "Veuillez saisir un email valide.";

        email.classList.add("error-input");
        valide = false;

    } else {

        email.classList.add("success");
    }

    // verification du numéro de téléphone
    if (telephone.value.trim().length < 8) {

        document.getElementById("telephone-error").textContent =
            "Le téléphone doit contenir au moins 8 chiffres.";

        telephone.classList.add("error-input");
        valide = false;

    } else {

        telephone.classList.add("success");
    }

    // verification de la participation
    if (participation.value === "") {

        document.getElementById("participation-error").textContent =
            "Veuillez choisir un type de participation.";

        participation.classList.add("error-input");
        valide = false;

    } else {

        participation.classList.add("success");
    }

    // verification du pays
    if (pays.value === "") {

        document.getElementById("pays-error").textContent =
            "Veuillez sélectionner un pays.";

        pays.classList.add("error-input");
        valide = false;

    } else {

        pays.classList.add("success");
    }

    // verification du pays
    if (message.value.trim().length < 20) {

        document.getElementById("message-error").textContent =
            "Le message doit contenir au moins 20 caractères.";

        message.classList.add("error-input");
        valide = false;

    } else {

        message.classList.add("success");
    }

    // validation du formulaire si tout est valide
    if (valide) {

        successMessage.textContent =
            "Votre inscription a été envoyée avec succès !";

        successMessage.classList.add("success-message");

        form.reset();

        document
            .querySelectorAll("input, select, textarea")
            .forEach(element => {
                element.classList.remove("success");
            });
    }

});
}

// bouton qui apparait au scroll
window.addEventListener('scroll', function () {

  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const backToTopButton = document.getElementById('back-to-top');

  if (scrollPosition > 300) { // Ajoute la classe .scrolled si on défile de plus de 300px, sinon la retire

    backToTopButton.classList.add('visible');

  } else {

    backToTopButton.classList.remove('visible');

  }

});