// ==========================================================
// Checkout modal + WhatsApp payment flow.
//
// NOTE: the checkout markup uses inline onclick="..." attributes
// (see src/partials/checkout-modal.html and pricing.html), so the
// functions below are attached to `window` at the bottom of this
// file. If you later refactor those partials to use
// addEventListener instead of inline onclick, you can drop the
// window.* assignments.
// ==========================================================

// ---- Payment contact details (update with real handle / number) ----
const PAYMENT_INFO = {
  whatsapp: "201500263132", // real WhatsApp number
  instapay: "YouSpeakAcademy@instapay", // TODO: real Instapay handle
  vodafone: "010XXXXXXXX", // TODO: real Vodafone Cash number
};

let overlay;
let currentMethod = "instapay";

function genOrderCode() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const d = new Date();
  const stamp =
    (d.getMonth() + 1).toString().padStart(2, "0") +
    d.getDate().toString().padStart(2, "0");
  return "YS-" + stamp + "-" + rand;
}

// ---- Direct WhatsApp inquiry when a plan is selected ----
function openWhatsAppInquiry(btn) {
  const ticket = btn.closest(".ticket");
  const priceBlock = ticket.querySelector(".price-block");
  const activeTab = priceBlock.querySelector(".price-tab.active");
  const mode = activeTab.dataset.mode;
  const price = mode === "3" ? priceBlock.dataset.m3 : priceBlock.dataset.m1;
  const duration = mode === "3" ? "3 أشهر" : "شهر واحد";
  const planName = btn.dataset.plan;

  const msg =
    'السلام عليكم، حابة أعرف تفاصيل أكتر عن خطة "' +
    planName +
    '" (' +
    duration +
    ") بسعر " +
    price +
    " جنيه.";
  const url =
    "https://wa.me/" + PAYMENT_INFO.whatsapp + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank", "noopener");
}

// ---- Checkout modal (currently not linked from any button — see README) ----
function openCheckout(btn) {
  const ticket = btn.closest(".ticket");
  const priceBlock = ticket.querySelector(".price-block");
  const activeTab = priceBlock.querySelector(".price-tab.active");
  const mode = activeTab.dataset.mode;
  const price = mode === "3" ? priceBlock.dataset.m3 : priceBlock.dataset.m1;
  const duration = mode === "3" ? "3 أشهر" : "شهر واحد";
  const planName = btn.dataset.plan;
  const orderCode = genOrderCode();

  document.querySelector(".co-plan").textContent = planName;
  document.querySelector(".co-price").textContent = price + " جنيه";
  document.querySelector(".co-duration").textContent = "(" + duration + ")";
  document.querySelector(".co-code").textContent = orderCode;
  document
    .querySelectorAll(".co-price-inline")
    .forEach((el) => (el.textContent = price));
  document.querySelector(".co-code-inline").textContent = orderCode;

  document.getElementById("instapayHandle").textContent = PAYMENT_INFO.instapay;
  document.getElementById("vodafoneNumber").textContent = PAYMENT_INFO.vodafone;

  const msg =
    'السلام عليكم، عايزة أأكد حجز خطة "' +
    planName +
    '" (' +
    duration +
    ") بمبلغ " +
    price +
    " جنيه.\nرقم الطلب: " +
    orderCode +
    "\nهبعت إيصال التحويل دلوقتي.";
  document.getElementById("coConfirmBtn").href =
    "https://wa.me/" + PAYMENT_INFO.whatsapp + "?text=" + encodeURIComponent(msg);

  switchMethod(document.querySelector('.co-tab[data-method="instapay"]'));
  overlay.classList.add("open");
  requestAnimationFrame(() => overlay.classList.add("show"));
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  overlay.classList.remove("show");
  document.body.style.overflow = "";
  setTimeout(() => overlay.classList.remove("open"), 200);
}

function switchMethod(tab) {
  currentMethod = tab.dataset.method;
  document
    .querySelectorAll(".co-tab")
    .forEach((t) => t.classList.toggle("active", t === tab));
  document.querySelectorAll("[data-method-panel]").forEach((p) => {
    p.style.display = p.dataset.methodPanel === currentMethod ? "block" : "none";
  });
}

function copyValue(elId, btn) {
  const text = document.getElementById(elId).textContent.trim();
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const original = btn.textContent;
      btn.textContent = "اتنسخت ✓";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1600);
    })
    .catch(() => {
      alert("انسخي: " + text);
    });
}

export function initCheckout() {
  overlay = document.getElementById("checkoutOverlay");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCheckout();
  });

  // Expose to window so inline onclick="..." attributes in the
  // partials can still call these functions.
  window.openWhatsAppInquiry = openWhatsAppInquiry;
  window.openCheckout = openCheckout;
  window.closeCheckout = closeCheckout;
  window.switchMethod = switchMethod;
  window.copyValue = copyValue;
}
