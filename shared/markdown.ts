/**
 * Markdown → HTML for blog articles. Used by the build-time prerender
 * (scripts/prerender-site.ts) and by the React article page, so crawlers and
 * readers get the same markup and the swap from static HTML to React is
 * seamless.
 *
 * - GFM tables and numbered lists (react-markdown without plugins dropped both)
 * - "## Heading {#anchor}" → <h2 id="anchor">Heading</h2>
 * - H1 in content is demoted to H2 (the page title is the only H1)
 * - raw HTML from the CMS is escaped, never passed through
 */
import { Marked } from "marked";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const md = new Marked({ gfm: true, async: false });
md.use({
  renderer: {
    heading({ tokens, depth }) {
      let text = this.parser.parseInline(tokens);
      let id = "";
      const m = text.match(/\s*\{#([\w-]+)\}\s*$/);
      if (m) {
        id = ` id="${m[1]}"`;
        text = text.slice(0, m.index);
      }
      const level = Math.max(2, depth);
      return `<h${level}${id}>${text}</h${level}>\n`;
    },
    html({ text }) {
      return escapeHtml(text);
    },
  },
});

export function renderMarkdown(source: string): string {
  return md.parse(source || "") as string;
}
