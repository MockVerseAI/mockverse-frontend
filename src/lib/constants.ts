import { ChartColumnBigIcon, DatabaseIcon, TrendingUpIcon, WandSparklesIcon, ZapIcon } from "lucide-react";
import { PLAN } from "./types";

export const NAV_LINKS = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Practice",
    href: "#practice",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export const FEATURES = [
  {
    title: "AI Interview Simulation",
    description:
      "Practice with our advanced AI interviewer that adapts to your responses and provides real-time feedback",
    icon: WandSparklesIcon,
    image: "/images/feature-two.svg",
  },
  {
    title: "Performance Analytics",
    description:
      "Get detailed insights into your interview performance, including communication skills, technical knowledge, and areas for improvement",
    icon: ChartColumnBigIcon,
    image: "/images/feature-one.svg",
  },
  {
    title: "Interview Repository",
    description: "Access a vast collection of industry-specific interview questions and best practices",
    icon: DatabaseIcon,
    image: "/images/feature-three.svg",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed progress reports and skill assessments",
    icon: TrendingUpIcon,
    image: "/images/feature-four.svg",
  },
  {
    title: "Instant Feedback",
    description: "Receive immediate, actionable feedback on your responses, body language, and presentation skills",
    icon: ZapIcon,
    image: "/images/feature-five.svg",
  },
];

export const PLANS: PLAN[] = [
  {
    id: "basic",
    title: "Basic",
    desc: "Perfect for students and fresh graduates starting their interview preparation journey.",
    monthlyPrice: 19,
    annuallyPrice: 190,
    buttonText: "Start Free Trial",
    features: [
      "5 AI mock interviews/month",
      "Basic performance analytics",
      "Common interview questions",
      "Text-based feedback",
      "Basic interview tips",
      "Email support",
      "Mobile app access",
    ],
    link: "#",
  },
  {
    id: "pro",
    title: "Professional",
    desc: "Ideal for job seekers actively interviewing and looking to maximize their success rate.",
    monthlyPrice: 49,
    annuallyPrice: 490,
    badge: "Most Popular",
    buttonText: "Upgrade to Pro",
    features: [
      "Unlimited AI mock interviews",
      "Advanced performance analytics",
      "Industry-specific questions",
      "Video & voice feedback",
      "Custom interview scenarios",
      "Priority support 24/7",
      "Interview recording & playback",
    ],
    link: "#",
  },
];

export const PLANS_FAQ = [
  {
    id: 1,
    question: "How do AI mock interviews work?",
    answer:
      "Our AI interviewer uses advanced natural language processing to conduct realistic interview simulations. It adapts to your responses, provides real-time feedback, and helps you improve your interview skills through personalized guidance.",
  },
  {
    id: 2,
    question: "What types of interviews are supported?",
    answer:
      "We support various interview types including technical interviews, behavioral interviews, system design discussions, and role-specific interviews across different industries and job levels.",
  },
  {
    id: 3,
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 7-day free trial with our Basic plan, allowing you to experience AI mock interviews and get a feel for our platform before committing.",
  },
  {
    id: 4,
    question: "Can I practice specific company interviews?",
    answer:
      "Yes, our Professional plan includes company-specific interview simulations based on reported interview experiences and common questions from top tech companies.",
  },
  {
    id: 5,
    question: "How accurate is the AI feedback?",
    answer:
      "Our AI provides highly accurate feedback based on industry standards and best practices. It analyzes your responses, communication style, and technical accuracy to provide comprehensive improvement suggestions.",
  },
  {
    id: 6,
    question: "What kind of support do you provide?",
    answer:
      "We offer email support for Basic plans, 24/7 priority support for Professional plans, and dedicated account management with custom training for Enterprise plans.",
  },
  {
    id: 7,
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing, while downgrades apply from the next billing cycle.",
  },
  {
    id: 8,
    question: "Is there a mobile app available?",
    answer:
      "Yes, all plans include access to our mobile app for iOS and Android, allowing you to practice interviews on the go and review your performance anywhere.",
  },
  {
    id: 9,
    question: "How do you handle privacy and data security?",
    answer:
      "We take privacy seriously. All interview recordings and data are encrypted, and we follow industry-standard security practices. Enterprise plans include additional security features like SSO and custom data retention policies.",
  },
];

export const PLANS_TABLE = [
  {
    id: 1,
    title: "Basic",
    priceMonthly: "$19",
    priceYearly: "$190",
    buttonText: "Start free trial",
    usage: {
      interviews: "5 interviews/mo",
      questionBank: "500+ questions",
      interviewTypes: "Basic",
      feedback: "Text-based",
    },
    features: [
      "AI mock interviews",
      "Basic analytics",
      "Common questions library",
      "Text feedback",
      "Interview tips",
      "Mobile access",
      "Email support",
      "Community forum",
    ],
  },
  {
    id: 2,
    title: "Professional",
    priceMonthly: "$49",
    priceYearly: "$490",
    buttonText: "Go Pro",
    usage: {
      interviews: "Unlimited",
      questionBank: "2000+ questions",
      interviewTypes: "All types",
      feedback: "Video & Voice",
    },
    features: [
      "Unlimited interviews",
      "Advanced analytics",
      "Company-specific prep",
      "Video feedback",
      "Custom scenarios",
      "Interview recording",
      "Priority support",
      "Progress tracking",
      "Peer community",
    ],
  },
  {
    id: 3,
    title: "Enterprise",
    priceMonthly: "$199",
    priceYearly: "$1990",
    buttonText: "Contact sales",
    usage: {
      interviews: "Unlimited",
      questionBank: "Custom",
      interviewTypes: "Custom",
      feedback: "Full Suite",
    },
    features: [
      "Custom scenarios",
      "Bulk user management",
      "Custom branding",
      "Advanced dashboard",
      "API access",
      "Dedicated support",
      "Custom training",
      "Analytics exports",
      "Custom workflows",
    ],
  },
];
