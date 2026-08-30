// ==========================================================
// App entry point. Vite loads this from index.html via
// <script type="module" src="/src/main.js">.
//
// Add a new feature? Put it in its own file under src/scripts/,
// export an init function, then import + call it below.
// ==========================================================

import "./styles/main.css";

import { initScrollProgress } from "./scripts/scroll-progress.js";
import { initMobileMenu, initActiveSectionHighlight, initHeaderShadow } from "./scripts/nav.js";
import { initRevealAnimations } from "./scripts/reveal.js";
import { initPricingTabs, initButtonGlow } from "./scripts/pricing-tabs.js";
import { initCheckout } from "./scripts/checkout.js";
import { initSparks } from "./scripts/sparks.js";

initScrollProgress();
initHeaderShadow();
initMobileMenu();
initActiveSectionHighlight();
initRevealAnimations();
initPricingTabs();
initButtonGlow();
initCheckout();
initSparks();
