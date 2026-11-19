import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

const rootEl = document.getElementById("root")!;

// Static prerender (scripts/prerender-site.ts): keep it on screen until React
// has rendered the real page, instead of replacing it with an empty loader.
// "Ready" = the app has put an <h1> into #root (loaders have none); give up
// after 4 s so a page without an <h1> still appears.
const prerendered = rootEl.querySelector<HTMLElement>(":scope > [data-prerender]");
if (prerendered) {
  rootEl.before(prerendered);
  rootEl.hidden = true;
  const reveal = () => {
    observer.disconnect();
    clearTimeout(timer);
    rootEl.hidden = false;
    prerendered.remove();
  };
  const observer = new MutationObserver(() => {
    if (rootEl.querySelector("h1")) reveal();
  });
  observer.observe(rootEl, { childList: true, subtree: true });
  const timer = window.setTimeout(reveal, 4000);
}

createRoot(rootEl).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
