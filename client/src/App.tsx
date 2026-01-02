import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import CalculatorPage from "./pages/CalculatorPage";
import BlogArticle from "./components/BlogArticle";
import BlogPage from "./pages/BlogPage";
import Regulamin from "./pages/Regulamin";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import PolitykaCookies from "./pages/PolitykaCookies";
import AdminCRM from "./pages/AdminCRM";
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
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
