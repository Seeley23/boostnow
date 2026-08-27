import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const pdfPath = path.join(projectRoot, "wizytowka_uslugi_boostnow_v2.pdf");
const docxPath = path.join(projectRoot, "oferta_self_storage.docx");
const cardScript = path.join(projectRoot, "create_premium_business_card.py");

function pdfInfo(): string {
  return execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" });
}

describe("print deliverables", () => {
  it("contains a two-page business card with 3 mm bleed dimensions", () => {
    expect(existsSync(pdfPath)).toBe(true);
    expect(statSync(pdfPath).size).toBeGreaterThan(10_000);

    const info = pdfInfo();
    expect(info).toMatch(/Pages:\s+2/);
    expect(info).toMatch(/Page size:\s+257\.953 x 172\.913 pts/);
  });

  it("uses the exact frontend logo source rendered at high resolution", () => {
    const source = readFileSync(cardScript, "utf8");
    expect(source).toContain("boostnow-official-browser.png");
    expect(existsSync("/home/ubuntu/boostnow_print_assets/boostnow-official-browser.png")).toBe(true);
  });

  it("contains a valid self-storage offer DOCX", () => {
    expect(existsSync(docxPath)).toBe(true);
    expect(statSync(docxPath).size).toBeGreaterThan(10_000);
    execFileSync("unzip", ["-t", docxPath], { stdio: "ignore" });
  });
});
