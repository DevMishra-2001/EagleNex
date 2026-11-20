// Pragmatic email check (one @, a dot in the domain, no spaces)
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

// Trimmed string from FormData, capped at `max` chars
export const readField = (form: FormData, name: string, max = 2000) => String(form.get(name) ?? "").trim().slice(0, max);

export const isBlank = (value: string) => value.length === 0;
