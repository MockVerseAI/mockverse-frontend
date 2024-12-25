import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Providers from "./components/Providers.tsx";
import "./index.css";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import Account from "./pages/dashboard/Account.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import EmailSent from "./pages/auth/EmailSent.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import Home from "./pages/Home.tsx";
import Interview from "./pages/Interview.tsx";
import Login from "./pages/auth/Login.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import Signup from "./pages/auth/Signup.tsx";
import SSOSuccess from "./pages/auth/SSOSuccess.tsx";
import VerifyEmail from "./pages/auth/VerifyEmail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/verify-email/:verificationToken" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/sso-success" element={<SSOSuccess />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/interview" element={<Interview />} />
            <Route path="/dashboard/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
