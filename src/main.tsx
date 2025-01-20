import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "regenerator-runtime/runtime";
import Providers from "./components/Providers.tsx";
import "./index.css";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import EmailSent from "./pages/auth/EmailSent.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import Login from "./pages/auth/Login.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import Signup from "./pages/auth/Signup.tsx";
import SSOSuccess from "./pages/auth/SSOSuccess.tsx";
import VerifyEmail from "./pages/auth/VerifyEmail.tsx";
import Account from "./pages/dashboard/Account.tsx";
import ApplicationEnhancer from "./pages/dashboard/application-enhancer/ApplicationEnhancer.tsx";
import ApplicationEnhancerReport from "./pages/dashboard/application-enhancer/ApplicationEnhancerReport.tsx";
import ApplicationEnhancerSetup from "./pages/dashboard/application-enhancer/ApplicationEnhancerSetup.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import InterviewChat from "./pages/dashboard/interview/InterviewChat.tsx";
import InterviewReport from "./pages/dashboard/interview/InterviewReport.tsx";
import Interviews from "./pages/dashboard/interview/Interviews.tsx";
import InterviewSetup from "./pages/dashboard/interview/InterviewSetup.tsx";
import Home from "./pages/Home.tsx";

createRoot(document.getElementById("root")!).render(
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
          <Route path="/dashboard/interview" element={<Interviews />} />
          <Route path="/dashboard/interview/setup" element={<InterviewSetup />} />
          <Route path="/dashboard/interview/chat/:id" element={<InterviewChat />} />
          <Route path="/dashboard/interview/report/:id" element={<InterviewReport />} />
          <Route path="/dashboard/application-enhancer" element={<ApplicationEnhancer />} />
          <Route path="/dashboard/application-enhancer/setup" element={<ApplicationEnhancerSetup />} />
          <Route path="/dashboard/application-enhancer/report/:id" element={<ApplicationEnhancerReport />} />
          <Route path="/dashboard/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>
);
