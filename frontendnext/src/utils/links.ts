// "#id" anchor for an in-page section
export const toHref = (id: string) => `#${id}`;

export const toMailto = (email: string) => `mailto:${email}`;

// "+91 00000 00000" -> "tel:+910000000000"
export const toTel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// mailto with an encoded subject line
export const toMailtoWithSubject = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;
