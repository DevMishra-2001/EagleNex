import { Brain, ChartBar, Cloud, Code, Palette, Smartphone } from "lucide-react";
import type { Service } from "@/types";

// Service cards on the home page + /services and /services/[slug] pages
export const SERVICES: Service[] = [
  {
    slug: "web-development",
    icon: Code,
    title: "Web Development",
    desc: "Blazing fast, SEO-ready websites and web apps built on modern stacks.",
    color: "from-violet-500 to-fuchsia-500",
    tagline: "Websites and web apps that load fast, rank well and convert.",
    overview:
      "From marketing sites to complex SaaS dashboards, we build on modern frameworks like Next.js and React with performance, accessibility and SEO baked in from day one. Every build ships with analytics, a CMS where it helps, and a codebase your team can own.",
    deliverables: [
      "Marketing websites & landing pages",
      "Custom web apps, portals & dashboards",
      "E-commerce storefronts",
      "Headless CMS setup",
      "Core Web Vitals & technical SEO",
      "Third-party API & payment integrations",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    outcomes: [
      { value: "<1s", label: "Typical page load" },
      { value: "90+", label: "Lighthouse scores" },
      { value: "100%", label: "Code ownership" },
    ],
    faqs: [
      { q: "Which tech stack do you use?", a: "Mostly Next.js, React and TypeScript on the front end with Node.js services, but we pick what fits your product and team." },
      { q: "Can you work on our existing website?", a: "Yes. We regularly audit, speed up and extend existing sites and apps instead of rebuilding from scratch." },
      { q: "Will I be able to edit content myself?", a: "Yes. We set up an easy-to-use CMS wherever content changes often, and walk your team through it." },
    ],
  },
  {
    slug: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feel iOS & Android apps that users love to open every day.",
    color: "from-cyan-400 to-blue-500",
    tagline: "One codebase, two stores, an experience that feels native.",
    overview:
      "We design and build cross-platform and native apps for iOS and Android — from MVPs that validate an idea to production apps serving thousands of daily users. We handle design, development, store submission and post-launch updates.",
    deliverables: [
      "iOS & Android apps",
      "Cross-platform apps (React Native / Flutter)",
      "App backend & admin panel",
      "Push notifications & in-app purchases",
      "App Store & Play Store launch",
      "Maintenance & OS-version updates",
    ],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    outcomes: [
      { value: "2", label: "Platforms, one codebase" },
      { value: "8–12", label: "Weeks to a typical MVP" },
      { value: "4.5★+", label: "Store rating target" },
    ],
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform suits most products and saves cost; we recommend native when you need deep hardware or platform features." },
      { q: "Do you publish the app to the stores?", a: "Yes. We prepare listings, handle review guidelines and submit to both the App Store and Google Play." },
      { q: "What happens after launch?", a: "We offer support plans covering bug fixes, OS updates, monitoring and new features." },
    ],
  },
  {
    slug: "ai-solutions",
    icon: Brain,
    title: "AI Solutions",
    desc: "Chatbots, automation and AI integrations that save hours every week.",
    color: "from-pink-500 to-rose-500",
    tagline: "Practical AI that removes busywork and adds real value.",
    overview:
      "We help teams put large language models and automation to work — support chatbots trained on your knowledge base, document processing, internal copilots and workflow automation — with a focus on accuracy, privacy and measurable time saved.",
    deliverables: [
      "AI chatbots & assistants",
      "Knowledge-base search (RAG)",
      "Document & data extraction",
      "Workflow automation",
      "AI features inside your product",
      "Evaluation, guardrails & monitoring",
    ],
    stack: ["LLM APIs", "Python", "LangChain", "Vector databases", "Node.js", "n8n"],
    outcomes: [
      { value: "10h+", label: "Saved per team, per week" },
      { value: "24/7", label: "Customer support coverage" },
      { value: "4–6", label: "Weeks to a pilot" },
    ],
    faqs: [
      { q: "Is our data safe?", a: "We use providers and settings that don't train on your data, keep sensitive data in your infrastructure where needed, and sign an NDA on request." },
      { q: "Can AI work with our existing tools?", a: "Usually, yes — we connect to CRMs, helpdesks, spreadsheets, databases and most tools with an API." },
      { q: "How do you measure success?", a: "We agree on metrics up front, such as resolution rate or hours saved, and track them from the pilot onwards." },
    ],
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces crafted with intent — beautiful, intuitive and on-brand.",
    color: "from-amber-400 to-orange-500",
    tagline: "Design that looks great and makes the next step obvious.",
    overview:
      "Research, wireframes, high-fidelity UI and design systems — we design products people understand at a glance. Every screen is prototyped and tested before a single line of code is written, so development is faster and cheaper.",
    deliverables: [
      "User research & journey mapping",
      "Wireframes & clickable prototypes",
      "High-fidelity UI design",
      "Design systems & component libraries",
      "Usability testing",
      "Brand identity & logo design",
    ],
    stack: ["Figma", "FigJam", "Framer", "Adobe CC", "Maze", "Lottie"],
    outcomes: [
      { value: "2–4", label: "Weeks to clickable prototype" },
      { value: "1", label: "Source-of-truth design system" },
      { value: "100%", label: "Dev-ready handoff" },
    ],
    faqs: [
      { q: "Do you only design, or also build?", a: "Both. You can hire us for design alone, but most clients have us design and build so nothing gets lost in handoff." },
      { q: "Will we get the source files?", a: "Yes. All Figma files, assets and the design system are yours." },
      { q: "Can you redesign our existing product?", a: "Yes. We start with a UX audit to find the biggest wins, then redesign in phases to avoid disrupting users." },
    ],
  },
  {
    slug: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Scalable infrastructure, CI/CD and 99.9% uptime you can count on.",
    color: "from-emerald-400 to-teal-500",
    tagline: "Infrastructure that scales quietly in the background.",
    overview:
      "We set up and run cloud infrastructure on AWS, Google Cloud and Vercel — automated deployments, monitoring, backups and security hardening — so your team ships faster and sleeps better.",
    deliverables: [
      "Cloud architecture & migration",
      "CI/CD pipelines",
      "Containers & Kubernetes",
      "Monitoring, logging & alerting",
      "Backups & disaster recovery",
      "Security hardening & cost optimisation",
    ],
    stack: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Terraform"],
    outcomes: [
      { value: "99.9%", label: "Uptime target" },
      { value: "10×", label: "Faster deploys" },
      { value: "30%", label: "Typical cloud cost saving" },
    ],
    faqs: [
      { q: "Can you take over our existing infrastructure?", a: "Yes. We start with an audit, document what exists, then improve it step by step without downtime." },
      { q: "Which cloud do you recommend?", a: "It depends on your product and team; we're comfortable on AWS, Google Cloud and managed platforms like Vercel." },
      { q: "Do you offer on-call support?", a: "Yes, as part of our managed support plans." },
    ],
  },
  {
    slug: "digital-marketing",
    icon: ChartBar,
    title: "Digital Marketing",
    desc: "Data-driven growth campaigns that turn traffic into revenue.",
    color: "from-indigo-400 to-violet-500",
    tagline: "Growth you can measure, not just impressions.",
    overview:
      "SEO, performance marketing, content and conversion optimisation — we plan, run and measure campaigns that bring the right people to your product and turn them into customers.",
    deliverables: [
      "SEO strategy & content",
      "Google & Meta ads",
      "Social media management",
      "Email marketing & automation",
      "Conversion-rate optimisation",
      "Analytics & reporting dashboards",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4", "Search Console", "HubSpot", "Looker Studio"],
    outcomes: [
      { value: "3×", label: "Typical ROAS goal" },
      { value: "Monthly", label: "Transparent reports" },
      { value: "0", label: "Long lock-in contracts" },
    ],
    faqs: [
      { q: "How soon will we see results?", a: "Paid campaigns can drive traffic in days; SEO typically shows meaningful results in three to six months." },
      { q: "Do you need access to our ad accounts?", a: "Yes — accounts stay in your name and you keep full ownership; we work as users with access." },
      { q: "What do your reports include?", a: "Spend, leads, revenue, cost per acquisition and clear next steps, in a live dashboard plus a monthly summary." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
