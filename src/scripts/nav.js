// ==========================================================
// Header nav: mobile menu toggle + active-section highlighting.
// ==========================================================

export function initMobileMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggleBtn.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggleBtn.classList.remove("open");
    });
  });
}

export function initActiveSectionHighlight() {
  const sections = ["booth", "pricing", "testimonials", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("current"));
          const match = document.querySelector(
            '.nav-links a[href="#' + entry.target.id + '"]',
          );
          if (match) match.classList.add("current");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

export function initHeaderShadow() {
  const siteHeader = document.getElementById("siteHeader");

  function updateHeaderShadow() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 8);
  }

  document.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();
}
