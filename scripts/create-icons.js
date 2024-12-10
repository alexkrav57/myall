import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4285f4"/>
  <text 
    x="50%" 
    y="50%" 
    font-family="Arial" 
    font-size="${size / 2}px" 
    fill="white" 
    text-anchor="middle" 
    dominant-baseline="middle"
  >
    CP
  </text>
</svg>
`;

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create icons for different sizes
[16, 48, 128].forEach((size) => {
  const iconPath = path.join(iconsDir, `icon${size}.png`);
  const svgContent = createIconSVG(size);
  fs.writeFileSync(iconPath, svgContent);
  console.log(`Created icon${size}.png`);
});

console.log("Icons created successfully!");
