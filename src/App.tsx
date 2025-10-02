// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { Tracking } from "./components/Tracking";
import { StickyNav } from "./components/ui/sticky-nav";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import VipOffer from "./pages/VipOffer";
import VipConfirmed from "./pages/VipConfirmed";
import VipInvite from "./pages/VipInvite";
import Replay from "./pages/Replay";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Tracking />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* StickyNav should be inside BrowserRouter if it uses Link/useLocation */}
          <StickyNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vip-offer" element={<VipOffer />} />
            <Route path="/vip-confirmed" element={<VipConfirmed />} />
            <Route path="/vip-invite" element={<VipInvite />} />
            <Route path="/replay" element={<Replay />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;