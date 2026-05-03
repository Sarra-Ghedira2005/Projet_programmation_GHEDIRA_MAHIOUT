document.addEventListener("DOMContentLoaded", () => {
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

  // IMPORTANT → afficher dès le chargement
  showSections();
});