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
import AIOPage from "./pages/AIOPage";
import DynamicPage from "./pages/DynamicPage";
import VisualBuilder from "./pages/VisualBuilder";

function Router() {
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

      <Route path={"/blog/jak-zwiekszac-konwersje-ecommerce"} component={BlogArticleKonwersja} />
      <Route path={"/aio"} component={AIOPage} />
      
      {/* Wizualny Kreator Builder.io */}
      <Route path={"/builder/:slug*"} component={VisualBuilder} />

      {/* Dynamiczne strony z Airtable */}
      <Route path={"/:slug"} component={DynamicPage} />
      
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        {/* Human-Centric Design: Light theme by default */}
        <ThemeProvider defaultTheme="light">
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
