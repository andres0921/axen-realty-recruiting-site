// Build step: render the page to static HTML and inject it into dist/index.html.
// Runs after `vite build` and `vite build --ssr` (see package.json "build").
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(indexPath, "utf-8");
const marker = "<!--app-html-->";
if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}

fs.writeFileSync(indexPath, template.replace(marker, render()));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("prerender: wrote static HTML into dist/index.html");
