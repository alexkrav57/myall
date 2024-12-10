import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the manifest file
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../dist/manifest.json"), "utf-8")
);

// Get the entry file name
const entryFile = manifest["index.html"].file;
const cssFile = manifest["index.html"].css[0];

// Update the HTML file
let html = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf-8");

// Add the script and CSS
html = html.replace(
  "</head>",
  `  <link rel="stylesheet" href="assets/${cssFile}">
  </head>`
);

html = html.replace(
  "</body>",
  `  <script type="module" src="assets/${entryFile}"></script>
  </body>`
);

// Write the updated HTML
fs.writeFileSync(path.join(__dirname, "../dist/index.html"), html);

console.log("HTML file updated successfully");
