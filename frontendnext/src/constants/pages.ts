import {
  Clock,
  Eye,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { FaqItem, JobOpening, ValueItem } from "@/types";

// Copy for the inner pages (about, careers, faq), edit freely

export const MISSION =
  "Put world-class technology within reach of every business — with products that are fast, beautiful and built to last.";
export const VISION = "To be the studio ambitious teams call first when they want to move fast without cutting corners.";

export const VALUES: ValueItem[] = [
  { icon: Target, title: "Outcomes over output", desc: "We measure success by your numbers — revenue, retention, hours saved — not by tickets closed." },
  { icon: Eye, title: "Radical transparency", desc: "Weekly demos, shared boards and honest updates. You always know where things stand." },
  { icon: Sparkles, title: "Craft in the details", desc: "Smooth interactions, readable code and pixel-level polish are part of the job, not extras." },
  { icon: ShieldCheck, title: "Secure by default", desc: "Security, privacy and accessibility are designed in from the first sprint." },
  { icon: Handshake, title: "Partners, not vendors", desc: "We work as an extension of your team and stay with you long after launch." },
  { icon: Rocket, title: "Ship, learn, repeat", desc: "Small releases, real feedback, quick iterations — momentum beats perfection." },
];

export const ENGAGEMENT_MODELS = [
  { icon: Layers, title: "Fixed-scope project", desc: "A clear scope, timeline and price. Ideal for MVPs, websites and well-defined builds." },
  { icon: Users, title: "Dedicated team", desc: "A cross-functional squad working only on your product, scaled up or down monthly." },
  { icon: Clock, title: "Monthly retainer", desc: "Ongoing design, development and growth support with a set number of hours each month." },
];

export const INDUSTRIES = ["Startups & SaaS", "E-commerce & D2C", "Healthcare", "FinTech", "Education", "Real estate", "Logistics", "Hospitality"];

export const CAREER_PERKS: ValueItem[] = [
  { icon: Laptop, title: "Remote-friendly", desc: "Work from our office or from home — we care about output, not hours at a desk." },
  { icon: GraduationCap, title: "Learning budget", desc: "Courses, books and conferences to keep you growing." },
  { icon: HeartPulse, title: "Health cover", desc: "Medical insurance for you and your family." },
  { icon: Globe, title: "Global projects", desc: "Work with founders and teams from around the world." },
  { icon: Clock, title: "Flexible hours", desc: "Plan your day around your best hours, with a few shared overlap hours." },
  { icon: Lock, title: "Real ownership", desc: "Own features end to end, from idea to production." },
];

// Replace with real openings, or leave empty to show only the open application card
export const JOB_OPENINGS: JobOpening[] = [
  { title: "Senior Full-Stack Developer", team: "Engineering", location: "Remote / India", type: "Full-time", summary: "Build web apps with Next.js, TypeScript and Node.js, and help shape our engineering practices." },
  { title: "Product Designer (UI/UX)", team: "Design", location: "Remote / India", type: "Full-time", summary: "Own user flows, prototypes and design systems for client products across web and mobile." },
  { title: "React Native Developer", team: "Engineering", location: "Remote / India", type: "Full-time", summary: "Ship polished iOS and Android apps from a single codebase." },
];

export const HIRING_STEPS = ["Apply with your CV or portfolio", "Intro call (30 min)", "Practical task or portfolio review", "Team interview", "Offer"];

export const GENERAL_FAQS: FaqItem[] = [
  { q: "How much does a project cost?", a: "It depends on scope. Most websites start from a few weeks of work, while apps and platforms are larger. After a free consultation we send a detailed proposal with a fixed price or a monthly estimate." },
  { q: "How long does it take?", a: "A marketing website typically takes 3–6 weeks and an MVP app 8–12 weeks. We share a week-by-week plan before we start." },
  { q: "Who owns the code and designs?", a: "You do. Once invoices are paid, all source code, designs and assets are transferred to you." },
  { q: "Do you sign an NDA?", a: "Yes, we're happy to sign an NDA before you share any details about your idea." },
  { q: "How do we communicate during the project?", a: "You get a dedicated project manager, a shared project board, weekly demo calls and a Slack or WhatsApp channel for quick questions." },
  { q: "Do you work with clients outside India?", a: "Yes. We work with clients across time zones and keep a few overlap hours every day for calls." },
  { q: "What happens after launch?", a: "Every project includes a free support period. After that, you can choose a maintenance or growth plan, or take it fully in-house — we'll hand over documentation either way." },
  { q: "How do payments work?", a: "Fixed-scope projects are usually split into milestones; dedicated teams and retainers are billed monthly in advance." },
];
