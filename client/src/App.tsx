import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CookieBanner from "./components/CookieBanner";
import ScrollDepthTracker from "./components/ScrollDepthTracker";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import CalculatorPage from "./pages/CalculatorPage";
import BlogArticle from "./components/BlogArticle";
import BlogPage from "./pages/BlogPage";
import Regulamin from "./pages/Regulamin";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import PolitykaCookies from "./pages/PolitykaCookies";
import AdminCRM from "./pages/AdminCRM";
import Glossary from "./pages/Glossary";
import BlogArticleKonwersja from "./pages/BlogArticleKonwersja";
import OlsztynPage from "./pages/OlsztynPage";
import WarszawaPage from "./pages/WarszawaPage";
import KrakowPage from "./pages/KrakowPage";
import GdanskPage from "./pages/GdanskPage";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/calculator"} component={CalculatorPage} />
      <Route path={"/blog"} component={BlogPage} />
      <Route path={"/blog/:id"} component={BlogArticle} />
      <Route path={"/regulamin"} component={Regulamin} />
      <Route path={"/polityka-prywatnosci"} component={PolitykaPrywatnosci} />
      <Route path={"/polityka-cookies"} component={PolitykaCookies} />
      <Route path={"/admin/crm"} component={AdminCRM} />
      <Route path={"/glossary"} component={Glossary} />
      <Route path={"/olsztyn"} component={OlsztynPage} />
      <Route path={"/warszawa"} component={WarszawaPage} />
      <Route path={"/krakow"} component={KrakowPage} />
      <Route path={"/gdansk"} component={GdanskPage} />
      <Route path={"/blog/jak-zwiekszac-konwersje-ecommerce"} component={BlogArticleKonwersja} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieBanner />
            <ScrollDepthTracker />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
