export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const nowISO = () => new Date().toISOString();
export const uid = () => Math.random().toString(36).slice(2, 10);