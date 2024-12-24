import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Providers from "./components/Providers.tsx";
import "./index.css";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import DashboardHome from "./pages/DashboardHome.tsx";
import EmailSent from "./pages/EmailSent.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Home from "./pages/Home.tsx";
import Interview from "./pages/Interview.tsx";
import Login from "./pages/Login.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Signup from "./pages/Signup.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import SSOSuccess from "./pages/SSOSuccess.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/verify-email/:verificationToken" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/sso-success" element={<SSOSuccess />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="interview" element={<Interview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
