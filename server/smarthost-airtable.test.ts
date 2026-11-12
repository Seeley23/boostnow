import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const syncScript = fs.readFileSync(path.join(projectRoot, "scripts/sync-airtable.cjs"), "utf8");

describe("Airtable publishing safeguards", () => {
  it("fails the workflow when Airtable returns an HTTP error", () => {
    expect(syncScript).toContain("if (!response.ok)");
    expect(syncScript).toContain("throw new Error");
  });

  it("does not silently replace CMS records with an empty response", () => {
    expect(syncScript).not.toContain("return [];");
  });

  it("fails when the Airtable token is missing", () => {
    expect(syncScript).toContain("process.exit(1)");
  });
});
