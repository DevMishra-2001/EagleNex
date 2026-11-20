import type { LegalDocument } from "@/types";
import { SITE } from "./site";

// Template legal copy, have it reviewed by a lawyer before going live. A string[] in `body` renders as a bullet list.

export const LEGAL_UPDATED = "20 November 2026";

const { name, legalName, email, address, jurisdiction } = SITE;

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${name} collects, uses and protects your personal data.`,
  updated: LEGAL_UPDATED,
  intro: `This Privacy Policy explains how ${legalName} ("${name}", "we", "us") collects, uses, shares and protects personal data when you visit our website or work with us. It is written to meet the Digital Personal Data Protection Act, 2023 (India) and, where it applies to you, the EU/UK GDPR.`,
  sections: [
    {
      id: "data-we-collect",
      heading: "Data we collect",
      body: [
        "We only collect what we need:",
        [
          "Contact details you give us — name, email, phone number, company and the contents of messages or forms you send.",
          "Project information you share with us during sales and delivery.",
          "Technical data — IP address, browser type, device, pages visited and referring site, collected through server logs and, if you consent, analytics cookies.",
          "Job applications — CV, portfolio and any details you include when applying for a role.",
        ],
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use your data",
      body: [
        [
          "To reply to enquiries, prepare proposals and deliver the services you hire us for.",
          "To send invoices, manage contracts and meet legal, tax and accounting obligations.",
          "To improve our website and understand how visitors use it.",
          "To evaluate job applications.",
          "To send occasional updates, only where you have opted in. You can unsubscribe at any time.",
        ],
        "We do not sell your personal data, and we do not use it for automated decisions that have legal effects on you.",
      ],
    },
    {
      id: "legal-basis",
      heading: "Legal basis",
      body: [
        "We process personal data on the basis of your consent (for example, when you submit a form or accept analytics cookies), to perform a contract with you, to comply with legal obligations, or for our legitimate interests in running and improving our business, balanced against your rights.",
      ],
    },
    {
      id: "sharing",
      heading: "Sharing your data",
      body: [
        "We share data only with trusted service providers who help us run our business — for example hosting, email, analytics, CRM, payment and accounting tools — under contracts that require them to protect it. We may also disclose data when required by law or to protect our rights.",
      ],
    },
    {
      id: "international-transfers",
      heading: "International transfers",
      body: [
        "Some of our providers store data outside India. Where we transfer personal data internationally, we use providers with appropriate safeguards and only to countries not restricted under applicable law.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      body: [
        "We keep enquiry data for up to 24 months after our last contact, client and billing records for as long as tax and accounting laws require, and job applications for up to 12 months unless you ask us to delete them sooner.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      body: [
        "We use encryption in transit, access controls, strong authentication and regular reviews to protect your data. No method of transmission or storage is completely secure, but we work hard to keep your information safe and will notify you and the authorities of a breach where the law requires.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      body: [
        "Depending on where you live, you may have the right to:",
        [
          "Access the personal data we hold about you.",
          "Correct inaccurate or incomplete data.",
          "Ask us to delete your data.",
          "Withdraw consent at any time, without affecting earlier processing.",
          "Object to or restrict certain processing, and request a copy of your data in a portable format.",
          "Nominate another person to exercise your rights, and raise a grievance with us or with the Data Protection Board of India or your local authority.",
        ],
        `To exercise any of these rights, email ${email}. We respond within 30 days.`,
      ],
    },
    {
      id: "cookies",
      heading: "Cookies",
      body: ["We use a small number of cookies and similar technologies. See our Cookie Policy for details and choices."],
    },
    {
      id: "children",
      heading: "Children",
      body: ["Our website and services are not directed at children under 18, and we do not knowingly collect their personal data."],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: ["We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated."],
    },
    {
      id: "contact",
      heading: "Contact & grievance officer",
      body: [`Questions or complaints about privacy can be sent to our Grievance Officer at ${email} or by post to ${legalName}, ${address}.`],
    },
  ],
};

export const TERMS: LegalDocument = {
  title: "Terms & Conditions",
  description: `The terms that govern use of the ${name} website and our services.`,
  updated: LEGAL_UPDATED,
  intro: `These Terms & Conditions ("Terms") govern your use of this website and any services provided by ${legalName} ("${name}", "we", "us"). By using the website or engaging our services, you agree to these Terms. A signed proposal, statement of work or master services agreement takes precedence over these Terms where they conflict.`,
  sections: [
    {
      id: "use-of-website",
      heading: "Use of the website",
      body: [
        "You may use this website for lawful purposes only. You must not:",
        [
          "Attempt to gain unauthorised access to the website, its servers or related systems.",
          "Introduce malware or interfere with the website's operation.",
          "Scrape, copy or republish content without our written permission, except as allowed by law.",
          "Submit false information or impersonate another person through our forms.",
        ],
      ],
    },
    {
      id: "services",
      heading: "Our services",
      body: [
        "The scope, deliverables, timelines and fees for each engagement are set out in a written proposal or statement of work. Work outside the agreed scope is handled through a change request and may change timelines and fees.",
      ],
    },
    {
      id: "client-responsibilities",
      heading: "Client responsibilities",
      body: [
        "You agree to provide timely feedback, content, access and approvals, and to ensure that any materials you give us do not infringe anyone else's rights. Delays in these items may affect delivery dates.",
      ],
    },
    {
      id: "fees-payment",
      heading: "Fees & payment",
      body: [
        "Fees are as stated in the proposal. Unless agreed otherwise, invoices are payable within 15 days. Fixed-scope projects are billed by milestone and dedicated-team or retainer work is billed monthly in advance. Fees exclude applicable taxes such as GST. We may pause work on overdue accounts.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      body: [
        "On full payment, ownership of the final deliverables created specifically for you transfers to you. We keep ownership of our pre-existing tools, libraries and know-how, and grant you a perpetual licence to use them as part of the deliverables. Third-party and open-source components remain under their own licences. Unless you ask us not to, we may mention you as a client and show non-confidential work in our portfolio.",
      ],
    },
    {
      id: "confidentiality",
      heading: "Confidentiality",
      body: ["Both parties will keep each other's confidential information private and use it only for the engagement. We are happy to sign a separate NDA on request."],
    },
    {
      id: "warranties",
      heading: "Warranties & support",
      body: [
        "We perform our services with reasonable skill and care. Defects reported within the free support period stated in your proposal are fixed at no cost. Except as expressly stated, the website and services are provided \"as is\" without other warranties.",
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, we are not liable for indirect, incidental or consequential losses, including lost profits or data. Our total liability for any claim relating to an engagement is limited to the fees paid to us for that engagement in the 12 months before the claim.",
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        "Either party may end an engagement with 30 days' written notice, or immediately if the other party materially breaches these Terms and does not fix the breach within 15 days. You pay for work completed up to the termination date.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      body: ["This website may link to third-party sites. We are not responsible for their content or privacy practices."],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      body: [`These Terms are governed by the laws of ${jurisdiction}. Disputes will first be discussed in good faith, and otherwise fall under the exclusive jurisdiction of the courts in the city of our registered office.`],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      body: ["We may update these Terms from time to time. Continued use of the website after changes means you accept the updated Terms."],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [`Questions about these Terms? Email ${email}.`],
    },
  ],
};

export const COOKIE_POLICY: LegalDocument = {
  title: "Cookie Policy",
  description: `What cookies and similar technologies ${name} uses and how to control them.`,
  updated: LEGAL_UPDATED,
  intro: `This Cookie Policy explains how ${name} uses cookies and similar technologies such as local storage on this website.`,
  sections: [
    {
      id: "what-are-cookies",
      heading: "What are cookies?",
      body: ["Cookies are small text files stored on your device by your browser. Local storage works in a similar way. They help websites remember your preferences and understand how they are used."],
    },
    {
      id: "what-we-use",
      heading: "What we use",
      body: [
        [
          "Strictly necessary — required for security and for the website to work. These cannot be turned off.",
          "Preferences — we store your light/dark theme choice in your browser's local storage (key \"eaglenex-theme\"). It never leaves your device.",
          "Analytics (optional) — if enabled, privacy-friendly analytics help us understand which pages are useful. These are only set with your consent where the law requires it.",
        ],
        "We do not use advertising or cross-site tracking cookies.",
      ],
    },
    {
      id: "managing",
      heading: "Managing cookies",
      body: [
        "You can block or delete cookies and local storage in your browser settings at any time. Blocking strictly necessary cookies may stop parts of the website from working; clearing local storage simply resets your theme to dark.",
      ],
    },
    {
      id: "changes",
      heading: "Changes",
      body: ["If we add new cookies we will update this page and, where required, ask for your consent."],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [`Questions about cookies? Email ${email}. See also our Privacy Policy.`],
    },
  ],
};
