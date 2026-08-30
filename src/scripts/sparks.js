// ==========================================================
// Floating gold sparks in the hero "door scene" illustration.
// Skips entirely if the user prefers reduced motion.
// ==========================================================

export function initSparks() {
  const doorScene = document.querySelector(".door-scene");
  if (!doorScene) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function spawnSpark() {
    const spark = document.createElement("span");
    spark.className = "spark";
    const x = 30 + Math.random() * 40;
    spark.style.right = x + "%";
    spark.style.bottom = 20 + Math.random() * 20 + "%";
    spark.style.animationDuration = 3.5 + Math.random() * 2.5 + "s";
    doorScene.appendChild(spark);
    setTimeout(() => spark.remove(), 6000);
  }

  setInterval(spawnSpark, 700);
}
