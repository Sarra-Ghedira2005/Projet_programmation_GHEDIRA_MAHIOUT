document.addEventListener("DOMContentLoaded", () => {

  // --- ANIMATION SCROLL ---
  const sections = document.querySelectorAll("section");

  function showSections() {
    sections.forEach(sec => {
      let top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        sec.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", showSections);
  showSections();

  // --- DIAPORAMA ---
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (!slides.length) return; // sécurité si la page n'a pas de diaporama

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  // Rendre les fonctions accessibles depuis les onclick="" du HTML
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
});
// --- AGENDA : modification des cases ---
const cells = document.querySelectorAll("td");
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let newCourse = prompt("Modifier le cours :", cell.textContent);
        if (newCourse !== null) {
            cell.textContent = newCourse;
        }
    });
});

// --- EQUIPE : message au clic sur une carte ---
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("click", () => {
        alert("Plus d'informations bientôt !");
    });
});

// --- FORMATION : quiz ---
const questions = [
    {
        question: "Tu préfères :",
        answers: [
            { text: "Créer des sites web", type: "web" },
            { text: "Analyser des données", type: "data" },
            { text: "Sécuriser des systèmes", type: "cyber" },
            { text: "Administrer des réseaux", type: "reseau" }
        ]
    },
    {
        question: "Ton point fort :",
        answers: [
            { text: "Créativité", type: "web" },
            { text: "Logique et statistiques", type: "data" },
            { text: "Vigilance", type: "cyber" },
            { text: "Organisation", type: "reseau" }
        ]
    },
    {
        question: "Tu préfères travailler :",
        answers: [
            { text: "Sur l'interface utilisateur", type: "web" },
            { text: "Avec des chiffres et des modèles", type: "data" },
            { text: "Contre les cybermenaces", type: "cyber" },
            { text: "Sur des infrastructures", type: "reseau" }
        ]
    }
];

const resultMessages = {
    web:    "🌐 Développement Web & Logiciel — tu es fait pour créer des applications !",
    data:   "📊 Data Science & IA — tu es fait pour analyser et modéliser !",
    cyber:  "🔐 Cybersécurité — tu es fait pour protéger les systèmes !",
    reseau: "🖧 Réseaux & Systèmes — tu es fait pour construire des infrastructures !"
};

// On vérifie que le quiz existe sur cette page avant de l'initialiser
if (document.getElementById("question")) {
    let currentQuestion = 0;
    let scores = { web: 0, data: 0, cyber: 0, reseau: 0 };

    function showQuestion() {
        let q = questions[currentQuestion];
        document.getElementById("question").textContent = q.question;
        let answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";
        q.answers.forEach(answer => {
            let btn = document.createElement("button");
            btn.textContent = answer.text;
            btn.onclick = () => selectAnswer(answer.type);
            answersDiv.appendChild(btn);
        });
    }

    function selectAnswer(type) {
        scores[type]++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            document.getElementById("quiz").style.display = "none";
            let best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            document.getElementById("result").textContent = "Résultat : " + resultMessages[best];
        }
    }

    showQuestion();
}