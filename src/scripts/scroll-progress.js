// ==========================================================
// Top scroll-progress bar.
// ==========================================================

export function initScrollProgress() {
  const scrollBar = document.getElementById("scrollBar");

  function updateScrollBar() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    scrollBar.style.width = height > 0 ? (scrolled / height) * 100 + "%" : "0%";
  }

  document.addEventListener("scroll", updateScrollBar, { passive: true });
  updateScrollBar();
}
