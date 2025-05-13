
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OtpVerification from "./pages/auth/OtpVerification";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ShopPage from "./pages/shop/ShopPage";
import ProductListPage from "./pages/shop/ProductListPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentConfirmationPage from "./pages/payment/PaymentConfirmationPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import BnplPage from "./pages/bnpl/BnplPage";
import EmiPaymentPage from "./pages/bnpl/EmiPaymentPage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import KycPage from "./pages/profile/KycPage";
import BankAccountPage from "./pages/profile/BankAccountPage";
import SettingsPage from "./pages/profile/SettingsPage";
import SecurityPage from "./pages/profile/SecurityPage";
import SupportPage from "./pages/support/SupportPage";
import FaqPage from "./pages/support/FaqPage";
import ContactPage from "./pages/support/ContactPage";
import ReferralPage from "./pages/referral/ReferralPage";
import SplashScreen from "./pages/onboarding/SplashScreen";
import ScanPage from "./pages/scanner/ScanPage";

// Seller pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerFinancials from "./pages/seller/SellerFinancials";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerSettings from "./pages/seller/SellerSettings";
import SellerSupport from "./pages/seller/SellerSupport";

const App = () => {
  // Create a new QueryClient instance within the component
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/confirm" element={<PaymentConfirmationPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/bnpl" element={<BnplPage />} />
            <Route path="/emi-payment/:id" element={<EmiPaymentPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/kyc" element={<KycPage />} />
            <Route path="/bank-account" element={<BankAccountPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/refer" element={<ReferralPage />} />
            <Route path="/scan" element={<ScanPage />} />
            
            {/* Seller routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/analytics" element={<SellerAnalytics />} />
            <Route path="/seller/financials" element={<SellerFinancials />} />
            <Route path="/seller/profile" element={<SellerProfile />} />
            <Route path="/seller/settings" element={<SellerSettings />} />
            <Route path="/seller/support" element={<SellerSupport />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
