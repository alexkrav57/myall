import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, "../dist/index.html");

try {
  // Read the HTML file
  let htmlContent = fs.readFileSync(htmlPath, "utf-8");

  // Add the script tag before closing body tag
  htmlContent = htmlContent.replace(
    "</body>",
    '  <script type="module" src="assets/index.js"></script>\n</body>'
  );

  // Write the modified HTML back
  fs.writeFileSync(htmlPath, htmlContent);
  console.log("Successfully added script tag to index.html");
} catch (error) {
  console.error("Error modifying index.html:", error);
}
