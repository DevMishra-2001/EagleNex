import {
  Brain,
  Calendar,
  ChartBar,
  Cloud,
  Code,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  PenTool,
  Phone,
  Smartphone,
  Target,
} from "lucide-react";
import type {
  ContactInfo,
  ContactOption,
  LinkColumn,
  NavLink,
  OrbitChip,
  ProcessStep,
  SocialLink,
  Stat,
  Testimonial,
} from "@/types";
import { ROUTES as R, SECTION_IDS as S, SITE } from "./site";
import { toMailto, toTel } from "@/utils/links";

// All site copy lives here, edit these arrays to change the content

// On the home page these scroll to `section`; on other pages they open `href`
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: R.home, section: S.home },
  { label: "Services", href: R.services, section: S.services },
  { label: "About", href: R.about, section: S.about },
  { label: "Process", href: `/#${S.process}`, section: S.process },
  { label: "Reviews", href: `/#${S.testimonials}`, section: S.testimonials },
];

export const HERO_STATS: Stat[] = [
  { value: "150+", label: "Products shipped" },
  { value: "12", label: "Countries" },
  { value: "4.9★", label: "Client rating" },
];

export const BRANDS = ["Nova", "Quantum", "Skyline", "Vertex", "Pulse", "Orbit", "Zenith", "Apex"];

export const ABOUT_STATS: Stat[] = [
  { value: "150+", label: "Projects Delivered" },
  { value: "100+", label: "Happy Clients" },
  { value: "12", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
];

export const PERKS = ["Dedicated project manager", "Transparent weekly updates", "Post-launch support", "On-time delivery guarantee"];

// Services orbiting the EagleNex core in the About scene
export const ORBIT_CHIPS: OrbitChip[] = [
  { label: "Web", icon: Code, color: "#8b5cf6" },
  { label: "Mobile", icon: Smartphone, color: "#22d3ee" },
  { label: "AI", icon: Brain, color: "#ec4899" },
  { label: "Design", icon: Palette, color: "#f59e0b" },
  { label: "Cloud", icon: Cloud, color: "#10b981" },
  { label: "Growth", icon: ChartBar, color: "#6366f1" },
];

// emoji = particle shape shown for that step
export const PROCESS_STEPS: ProcessStep[] = [
  { icon: Lightbulb, emoji: "💡", title: "Discover", desc: "We dive deep into your goals, users and market." },
  { icon: PenTool, emoji: "✏️", title: "Design", desc: "Wireframes and stunning UI that tell your story." },
  { icon: Code, emoji: "💻", title: "Develop", desc: "Clean, scalable code with weekly demos." },
  { icon: Target, emoji: "🎯", title: "Launch & Grow", desc: "Go live, measure, optimize — and scale." },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Aarav Sharma", role: "Founder, Skyline Tech", text: "EagleNex rebuilt our platform in record time. Conversions jumped 3x in the first month. Absolute pros." },
  { name: "Priya Verma", role: "CMO, Nova Retail", text: "The design quality is world-class. Our customers keep complimenting the new app experience." },
  { name: "Rohan Mehta", role: "CTO, Pulse Health", text: "Reliable, transparent and technically brilliant. They feel like an extension of our own team." },
];

// Contact options in the CTA card, change links here
export const CONTACT_OPTIONS: ContactOption[] = [
  { icon: Calendar, title: "Book a 30-min call", desc: "Pick a slot that suits you", href: "#", color: "from-violet-500 to-fuchsia-500" },
  { icon: MessageCircle, title: "Chat on WhatsApp", desc: "Quick questions, quick answers", href: "#", color: "from-emerald-400 to-cyan-500" },
  { icon: Mail, title: SITE.email, desc: "For detailed briefs & RFPs", href: toMailto(SITE.email), color: "from-cyan-400 to-blue-500" },
];

export const CTA_PROMISES = ["Free consultation", "Reply within 24h", "NDA on request"];

export const SOCIAL_PROOF_GRADIENTS = ["from-violet-500 to-fuchsia-500", "from-cyan-400 to-blue-500", "from-pink-500 to-orange-400"];

export const FOOTER_COLUMNS: LinkColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: R.home, section: S.home },
      { label: "About us", href: R.about, section: S.about },
      { label: "Careers", href: R.careers },
    ],
  },
  {
    title: "How It Works",
    links: [
      { label: "Our Process", href: `/#${S.process}`, section: S.process },
      { label: "Contact us", href: R.contact },
      { label: "FAQ", href: R.faq },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Services", href: R.services, section: S.services },
      { label: "Testimonials", href: `/#${S.testimonials}`, section: S.testimonials },
      { label: "Get a quote", href: R.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: R.privacy },
      { label: "Terms & Conditions", href: R.terms },
      { label: "Cookie Policy", href: R.cookies },
    ],
  },
]

export const CONTACTS: ContactInfo[] = [
  { icon: Phone, label: "Phone Number", value: SITE.phone, href: toTel(SITE.phone) },
  { icon: Mail, label: "Email Address", value: SITE.email, href: toMailto(SITE.email) },
  { icon: MapPin, label: "Location", value: SITE.address, href: "#" },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "Facebook",
    href: "#",
    d: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07",
  },
  {
    label: "Instagram",
    href: "#",
    d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    label: "X",
    href: "#",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "YouTube",
    href: "#",
    d: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  },
];
