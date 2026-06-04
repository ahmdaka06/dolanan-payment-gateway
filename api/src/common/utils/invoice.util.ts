export function generateInvoice(prefix: string = 'INV'): string {
    const date = new Date();
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const h = date.getHours().toString().padStart(2, '0');
    const i = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${prefix}-${y}${m}${d}${h}${i}${s}-${rand}`;
}
