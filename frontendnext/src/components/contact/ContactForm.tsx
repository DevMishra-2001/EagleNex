"use client";

import { useActionState, type ReactNode } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { submitContact } from "@/actions/contact";
import { BUDGET_OPTIONS, CONTACT_LIMITS as L, SERVICE_OPTIONS } from "@/constants/contact";
import type { ContactField, ContactFormState } from "@/types";
import { cn } from "@/utils/cn";

const INITIAL: ContactFormState = { status: "idle", message: "" };

const INPUT =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-zinc-500 transition focus:border-brand-violet/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.15)] focus:outline-none";

type FieldProps = { name: ContactField; label: string; error?: string; children: ReactNode; optional?: boolean };

// Label + control + inline error
function Field({ name, label, error, children, optional }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-zinc-300">
        {label} {optional && <span className="text-zinc-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-pink-500">
          {error}
        </p>
      )}
    </div>
  );
}

/** Project enquiry form, submitted through a server action */
export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const err = state.errors ?? {};
  const v = state.values ?? {};
  const aria = (f: ContactField) => (err[f] ? { "aria-invalid": true, "aria-describedby": `${f}-error` } : {});

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-8 text-emerald-500">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-400/20">
          <Check className="h-6 w-6" />
        </span>
        <p className="font-display text-2xl font-semibold text-white">Message sent</p>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" error={err.name}>
          <input id="name" name="name" required maxLength={L.name} autoComplete="name" defaultValue={v.name} placeholder="Jane Doe" className={INPUT} {...aria("name")} />
        </Field>
        <Field name="email" label="Work email" error={err.email}>
          <input id="email" name="email" type="email" required maxLength={L.email} autoComplete="email" defaultValue={v.email} placeholder="you@company.com" className={INPUT} {...aria("email")} />
        </Field>
      </div>
      <Field name="company" label="Company" optional>
        <input id="company" name="company" maxLength={L.company} autoComplete="organization" defaultValue={v.company} placeholder="Acme Inc." className={INPUT} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="service" label="What do you need?" optional>
          <select id="service" name="service" defaultValue={v.service ?? ""} className={cn(INPUT, "appearance-none")}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field name="budget" label="Budget" optional>
          <select id="budget" name="budget" defaultValue={v.budget ?? ""} className={cn(INPUT, "appearance-none")}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field name="message" label="Tell us about your project" error={err.message}>
        <textarea id="message" name="message" required rows={6} maxLength={L.message} defaultValue={v.message} placeholder="Goals, timeline, links — anything that helps." className={cn(INPUT, "resize-y")} {...aria("message")} />
      </Field>

      {/* honeypot for bots, hidden from people and screen readers */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />

      {state.status === "error" && (
        <p role="alert" className="text-sm text-pink-500">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 font-semibold text-ink-950 transition hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-white transition-transform group-hover:rotate-45">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
          </span>
        </button>
        <p className="text-sm text-zinc-500">We reply within 24 hours. NDA on request.</p>
      </div>
    </form>
  );
}
