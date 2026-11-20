import type { LucideIcon } from "lucide-react";

export type Theme = "dark" | "light";

export type MarkLayer = { d: string; shade: number; light: boolean; beak: boolean };

// `section` = in-page anchor used on the home page, `href` = page route used everywhere else
export type NavLink = { label: string; href: string; section?: string };

export type LinkItem = NavLink;

export type LinkColumn = { title: string; links: LinkItem[] };

export type Stat = { value: string; label: string };

export type IconCard = { icon: LucideIcon; title: string; desc: string; color: string };

export type FaqItem = { q: string; a: string };

export type Service = IconCard & {
  slug: string;
  tagline: string;
  overview: string;
  deliverables: string[];
  stack: string[];
  outcomes: Stat[];
  faqs: FaqItem[];
};

export type JobOpening = { title: string; team: string; location: string; type: string; summary: string };

export type ValueItem = { icon: LucideIcon; title: string; desc: string };

export type LegalSection = { id: string; heading: string; body: (string | string[])[] };

export type LegalDocument = { title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

export type ContactField = "name" | "email" | "company" | "service" | "budget" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  // submitted values, echoed back so fields survive a failed submit
  values?: Partial<Record<ContactField, string>>;
};

export type ContactOption = IconCard & { href: string };

export type ContactInfo = { icon: LucideIcon; label: string; value: string; href: string };

export type SocialLink = { label: string; href: string; d: string };

export type ProcessStep = { icon: LucideIcon; emoji: string; title: string; desc: string };

export type Testimonial = { name: string; role: string; text: string };

export type OrbitChip = { label: string; icon: LucideIcon; color: string };

// Pointer position normalised to -1..1 inside an element (9 = far away when outside)
export type RelativePointer = { x: number; y: number; inside: boolean };
