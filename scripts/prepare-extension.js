import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "../public");
const targetDir = path.join(__dirname, "../dist");

// Copy manifest and icons
function copyPublicFiles() {
  // Copy manifest
  fs.copyFileSync(
    path.join(sourceDir, "manifest.json"),
    path.join(targetDir, "manifest.json")
  );

  // Create icons directory in dist
  const distIconsDir = path.join(targetDir, "icons");
  if (!fs.existsSync(distIconsDir)) {
    fs.mkdirSync(distIconsDir, { recursive: true });
  }

  // Copy icons
  ["16", "48", "128"].forEach((size) => {
    const iconFile = `icon${size}.png`;
    const sourcePath = path.join(sourceDir, "icons", iconFile);
    const targetPath = path.join(distIconsDir, iconFile);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      console.warn(`Warning: ${iconFile} not found in public/icons directory`);
    }
  });
}

// Update index.html
function updateIndexHtml() {
  const indexPath = path.join(targetDir, "index.html");
  let content = fs.readFileSync(indexPath, "utf-8");

  // Remove inline scripts
  content = content.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );

  // Update asset paths
  content = content.replace(/src="\//g, 'src="');
  content = content.replace(/href="\//g, 'href="');

  fs.writeFileSync(indexPath, content);
}

// Execute
copyPublicFiles();
updateIndexHtml();
console.log("Extension files prepared successfully!");
