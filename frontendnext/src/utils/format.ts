// First character of a name, for avatar placeholders
export const initial = (name: string) => name.charAt(0);

// 1 -> "01", for "STEP 01" style counters
export const pad2 = (n: number) => String(n).padStart(2, "0");
