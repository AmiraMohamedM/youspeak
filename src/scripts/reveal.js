// ==========================================================
// Scroll-triggered reveal animations (.reveal, .reveal-scale, ...).
// Pairs with the CSS in src/styles/animations.css.
// ==========================================================

export function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    ".reveal, .reveal-scale, .reveal-left, .reveal-right, .stagger, .stars-row, .why-list",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}
