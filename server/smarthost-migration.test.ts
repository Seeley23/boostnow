import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

describe("Smarthost static deployment contract", () => {
  it("ships an Apache SPA fallback without Manus-specific routing", () => {
    const htaccessPath = path.join(projectRoot, "client/public/.htaccess");
    expect(fs.existsSync(htaccessPath)).toBe(true);

    const htaccess = readProjectFile("client/public/.htaccess");
    expect(htaccess).toContain("RewriteRule . /index.html [L]");
    expect(htaccess).not.toContain("manus");
  });

  it("keeps the production Vite build independent from the Manus runtime plugin", () => {
    const viteConfig = readProjectFile("vite.config.ts");
    expect(viteConfig).not.toContain("vite-plugin-manus-runtime");
    expect(viteConfig).not.toContain("vitePluginManusRuntime");
  });

  it("publishes only the canonical sitemap in robots.txt", () => {
    const robots = readProjectFile("client/public/robots.txt");
    expect(robots).toContain("Sitemap: https://boostnow.pl/sitemap.xml");
    expect(robots).not.toContain("manus.space");
    expect(robots).not.toContain("manus.computer");
  });
});
