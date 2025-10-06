// src/App.tsx
// Updated to temporarily redirect the VIP pages to the homepage.

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// THE FIX: Import the Navigate component from react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <StickyNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* --- THE FIX: The old VIP routes are now redirects --- */}
            {/* The 'replace' prop ensures a clean redirect without breaking the user's back button history. */}
            <Route path="/vip-offer" element={<Navigate to="/" replace />} />
            <Route path="/vip-invite" element={<Navigate to="/" replace />} />
            
            {/* 
              TO REACTIVATE LATER:
              1. Delete the two <Navigate> routes above.
              2. Uncomment these original routes:
            */}
            {/* <Route path="/vip-offer" element={<VipOffer />} /> */}
            {/* <Route path="/vip-invite" element={<VipInvite />} /> */}

            <Route path="/vip-confirmed" element={<VipConfirmed />} />
            <Route path="/replay" element={<Replay />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;