import Providers from "@/providers/Providers.tsx";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "regenerator-runtime/runtime";
import FullScreenLoader from "./components/loaders/FullScreenLoader";
import "./index.css";
import Test from "./pages/Test.tsx";

// Layouts
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout.tsx"));
const PublicLayout = lazy(() => import("./layouts/PublicLayout.tsx"));
const PrivateLayout = lazy(() => import("./layouts/PrivateLayout.tsx"));

// Public Pages
const Home = lazy(() => import("./pages/Home.tsx"));
const Login = lazy(() => import("./pages/auth/Login.tsx"));
const Signup = lazy(() => import("./pages/auth/Signup.tsx"));
const EmailSent = lazy(() => import("./pages/auth/EmailSent.tsx"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail.tsx"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword.tsx"));
const SSOSuccess = lazy(() => import("./pages/auth/SSOSuccess.tsx"));

// Dashboard Pages
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome.tsx"));
const InterviewWorkspaces = lazy(() => import("./pages/dashboard/interview-workspace/InterviewWorkspaces.tsx"));
const InterviewWorkspaceSetup = lazy(() => import("./pages/dashboard/interview-workspace/InterviewWorkspaceSetup.tsx"));
const Interviews = lazy(() => import("./pages/dashboard/interview-workspace/interview/Interviews.tsx"));
const InterviewSetup = lazy(() => import("./pages/dashboard/interview-workspace/interview/InterviewSetup.tsx"));
const InterviewChat = lazy(() => import("./pages/dashboard/interview-workspace/interview/InterviewChat.tsx"));
const InterviewAgent = lazy(() => import("./pages/dashboard/interview-workspace/interview/InterviewAgent.tsx"));
const InterviewReport = lazy(() => import("./pages/dashboard/interview-workspace/interview/InterviewReport.tsx"));
const ApplicationEnhancer = lazy(() => import("./pages/dashboard/application-enhancer/ApplicationEnhancer.tsx"));
const ApplicationEnhancerSetup = lazy(
  () => import("./pages/dashboard/application-enhancer/ApplicationEnhancerSetup.tsx")
);
const ApplicationEnhancerReport = lazy(
  () => import("./pages/dashboard/application-enhancer/ApplicationEnhancerReport.tsx")
);
const Account = lazy(() => import("./pages/dashboard/Account.tsx"));

// Not Found
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

createRoot(document.getElementById("root")!).render(
  <Providers>
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
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

          <Route element={<PrivateLayout />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/interview-workspace" element={<InterviewWorkspaces />} />
              <Route path="/dashboard/interview-workspace/setup" element={<InterviewWorkspaceSetup />} />
              <Route path="/dashboard/interview-workspace/:id" element={<Interviews />} />
              <Route path="/dashboard/interview-workspace/:id/interview/setup" element={<InterviewSetup />} />
              <Route
                path="/dashboard/interview-workspace/:id/interview/chat/:interviewId"
                element={<InterviewChat />}
              />
              <Route
                path="/dashboard/interview-workspace/:id/interview/report/:interviewId"
                element={<InterviewReport />}
              />
              <Route path="/dashboard/application-enhancer" element={<ApplicationEnhancer />} />
              <Route path="/dashboard/application-enhancer/setup" element={<ApplicationEnhancerSetup />} />
              <Route path="/dashboard/application-enhancer/report/:id" element={<ApplicationEnhancerReport />} />
              <Route path="/dashboard/account" element={<Account />} />
            </Route>

            <Route
              path="/dashboard/interview-workspace/:id/interview/agent/:interviewId"
              element={<InterviewAgent />}
            />
          </Route>
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Providers>
);
