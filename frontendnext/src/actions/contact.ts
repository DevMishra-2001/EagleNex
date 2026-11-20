"use server";

import { CONTACT_LIMITS as L } from "@/constants/contact";
import type { ContactFormState } from "@/types";
import { isBlank, isEmail, readField } from "@/utils/validation";

type ContactMessage = { name: string; email: string; company: string; service: string; budget: string; message: string };

// Forwards the enquiry to CONTACT_WEBHOOK_URL (Slack, Zapier, Make, n8n, CRM...); logs it when unset
async function deliver(msg: ContactMessage) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    console.info("[contact] CONTACT_WEBHOOK_URL not set, enquiry not forwarded:", msg.email);
    return;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...msg, text: `New enquiry from ${msg.name} <${msg.email}>\n${msg.message}`, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/** Validates the contact form and forwards it; used with useActionState */
export async function submitContact(_prev: ContactFormState, form: FormData): Promise<ContactFormState> {
  // honeypot: real users never fill this hidden field
  if (readField(form, "website")) return { status: "success", message: "Thanks! We'll be in touch within 24 hours." };

  const msg: ContactMessage = {
    name: readField(form, "name", L.name),
    email: readField(form, "email", L.email),
    company: readField(form, "company", L.company),
    service: readField(form, "service", 100),
    budget: readField(form, "budget", 100),
    message: readField(form, "message", L.message),
  };

  const errors: ContactFormState["errors"] = {};
  if (isBlank(msg.name)) errors.name = "Please tell us your name.";
  if (!isEmail(msg.email)) errors.email = "Please enter a valid email address.";
  if (msg.message.length < L.minMessage) errors.message = `Please add a few more details (at least ${L.minMessage} characters).`;
  if (Object.keys(errors).length) return { status: "error", message: "Please fix the highlighted fields.", errors, values: msg };

  try {
    await deliver(msg);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { status: "error", message: "Something went wrong sending your message. Please email us directly.", values: msg };
  }
  return { status: "success", message: "Thanks! We'll be in touch within 24 hours." };
}
