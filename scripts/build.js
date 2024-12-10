import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildExtension() {
  try {
    // Build the project
    await build();

    // Read the generated index.html
    const indexPath = path.join(__dirname, "../dist/index.html");
    let html = fs.readFileSync(indexPath, "utf-8");

    // Ensure script tag is present
    if (!html.includes("assets/main.js")) {
      html = html.replace(
        "</body>",
        '    <script type="module" src="assets/main.js"></script>\n  </body>'
      );
      fs.writeFileSync(indexPath, html);
    }

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildExtension();
