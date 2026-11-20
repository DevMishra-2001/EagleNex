import { SERVICES } from "./services";

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Something else"];

export const BUDGET_OPTIONS = ["Under ₹2 lakh", "₹2 – 5 lakh", "₹5 – 15 lakh", "₹15 lakh+", "Not sure yet"];

export const CONTACT_LIMITS = { name: 100, email: 200, company: 150, message: 5000, minMessage: 10 } as const;
