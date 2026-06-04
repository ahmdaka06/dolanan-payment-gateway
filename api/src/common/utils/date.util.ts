export function now(): Date {
    return new Date();
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}

export function addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
}

export function isExpired(date: Date): boolean {
    return new Date() > date;
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const h = date.getHours().toString().padStart(2, '0');
    const i = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');

    return format
        .replace('YYYY', y)
        .replace('MM', m)
        .replace('DD', d)
        .replace('HH', h)
        .replace('mm', i)
        .replace('ss', s);
}
