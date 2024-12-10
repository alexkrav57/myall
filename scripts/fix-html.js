import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTML with correct file names
const newHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyAll Panel</title>
    <link rel="stylesheet" href="assets/main.css">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="assets/main.js"></script>
  </body>
</html>`;

try {
  fs.writeFileSync(path.join(__dirname, "../dist/index.html"), newHtml);
  console.log("Successfully created index.html with correct asset paths");
} catch (error) {
  console.error("Error writing index.html:", error);
}
