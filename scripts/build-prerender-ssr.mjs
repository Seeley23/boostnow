/**
 * Builds client/src/prerender-entry.tsx for Node (dist/ssr) so that
 * scripts/prerender-site.ts can render React-only pages to static HTML.
 * All dependencies are bundled (react-helmet-async is CJS and breaks as an
 * external ESM import).
 */
import path from "node:path";
import { build } from "vite";

const root = process.cwd();
await build({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "warn",
  ssr: { noExternal: true },
  build: {
    ssr: "src/prerender-entry.tsx",
    outDir: path.join(root, "dist/ssr"),
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
