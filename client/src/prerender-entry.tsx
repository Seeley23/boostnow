/**
 * SSR entry used only at build time by scripts/prerender-site.ts to put the
 * text of React-only pages (no CMS data) into static HTML for crawlers.
 * Built with: vite build --ssr src/prerender-entry.tsx --outDir ../dist/ssr
 */
import type { ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import AIOPage from "./pages/AIOPage";
import Glossary from "./pages/Glossary";
import AuthorPage from "./pages/AuthorPage";
import CalculatorPage from "./pages/CalculatorPage";
import Regulamin from "./pages/Regulamin";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import PolitykaCookies from "./pages/PolitykaCookies";
import AiCommerceAuditPage from "./pages/AiCommerceAuditPage";

const PAGES: Record<string, ComponentType> = {
  "/aio": AIOPage,
  "/glossary": Glossary,
  "/mateusz-nowotka": AuthorPage,
  "/calculator": CalculatorPage,
  "/regulamin": Regulamin,
  "/polityka-prywatnosci": PolitykaPrywatnosci,
  "/polityka-cookies": PolitykaCookies,
  "/audyt-ai-dla-sklepu": AiCommerceAuditPage,
};

export function render(route: string): string | null {
  const Page = PAGES[route];
  if (!Page) return null;
  // Forms on these pages need the tRPC context; static rendering never sends
  // a request, so the client is only there to satisfy the hooks.
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });
  return renderToStaticMarkup(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={{}}>
          <Router ssrPath={route}>
            <Page />
          </Router>
        </HelmetProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
