// ==========================================================
// Pricing card monthly / 3-month toggle (with flip micro-animation),
// plus the cursor-follow glow highlight on primary buttons.
// ==========================================================

export function initPricingTabs() {
  document.querySelectorAll(".price-block").forEach((block) => {
    const m1 = block.dataset.m1;
    const m3 = block.dataset.m3;
    const old3 = block.dataset.old3;
    const save3 = block.dataset.save3;
    const priceEl = block.querySelector(".js-price");
    const saveEl = block.querySelector(".js-save");
    const oldRow = block.querySelector(".price-old-row");
    const tabs = block.querySelectorAll(".price-tab");

    function render(mode) {
      tabs.forEach((t) => t.classList.toggle("active", t.dataset.mode === mode));
      priceEl.classList.add("flip");
      setTimeout(() => {
        if (mode === "3") {
          priceEl.textContent = m3;
          saveEl.style.display = "inline-block";
          saveEl.textContent = "وفّر " + save3 + " جنيه";
          oldRow.innerHTML = '<span class="old latin">' + old3 + " جنيه</span>";
        } else {
          priceEl.textContent = m1;
          saveEl.style.display = "none";
          oldRow.innerHTML = "";
        }
        priceEl.classList.remove("flip");
      }, 140);
    }

    tabs.forEach((tab) => tab.addEventListener("click", () => render(tab.dataset.mode)));
    render("3");
  });
}

export function initButtonGlow() {
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", e.clientX - r.left + "px");
      btn.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
}
