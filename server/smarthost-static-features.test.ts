import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

describe("Smarthost public feature contract", () => {
  it("includes a PHP contact endpoint for the shared hosting runtime", () => {
    const endpointPath = path.join(projectRoot, "client/public/contact.php");
    expect(fs.existsSync(endpointPath)).toBe(true);
    expect(readProjectFile("client/public/contact.php")).toContain("kontakt@boostnow.pl");
  });

  it("does not call tRPC from the public contact section", () => {
    const contactSection = readProjectFile("client/src/components/ContactSection.tsx");
    expect(contactSection).not.toContain("@/lib/trpc");
    expect(contactSection).not.toContain("contact.submit");
  });

  it("does not render a backend-dependent rating widget in articles", () => {
    const blogArticle = readProjectFile("client/src/components/BlogArticle.tsx");
    expect(blogArticle).not.toContain("BlogRating");
    expect(blogArticle).not.toContain("parseInt(id)");
  });

  it("does not call tRPC from the public AIO lead form", () => {
    const aioPage = readProjectFile("client/src/pages/AIOPage.tsx");
    expect(aioPage).not.toContain("@/lib/trpc");
    expect(aioPage).not.toContain("aio.submit");
  });
});
