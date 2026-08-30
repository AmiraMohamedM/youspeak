import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PARTIALS_DIR = path.resolve(__dirname, "src/partials");

// Tiny build-time include system so index.html can be split into
// section files (src/partials/*.html) instead of one giant file.
//
// Usage in index.html:
//   <!-- include:hero.html -->
//
// Gets replaced with the contents of src/partials/hero.html at
// both `vite dev` and `vite build` time (transformIndexHtml runs
// in both). No runtime fetch, no extra JS shipped to the browser.
function htmlIncludePlugin() {
  return {
    name: "html-include",
    transformIndexHtml(html) {
      return html.replace(/<!--\s*include:(.+?)\s*-->/g, (_match, fileName) => {
        const filePath = path.join(PARTIALS_DIR, fileName.trim());
        if (!fs.existsSync(filePath)) {
          throw new Error(`[html-include] Partial not found: ${filePath}`);
        }
        return fs.readFileSync(filePath, "utf-8");
      });
    },
  };
}

export default defineConfig({
  plugins: [htmlIncludePlugin()],
});
