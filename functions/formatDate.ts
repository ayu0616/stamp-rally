import formatIndex from "./formatIndex";


export default function formatDate(date: Date | string, format: string) {
    if (typeof date == "string") {
        date = new Date(date);
    }
    const replacer = {
        yyyy: date.getFullYear().toString(),
        MM: formatIndex(date.getMonth() + 1, 2),
        dd: formatIndex(date.getDate(), 2),
        hh: formatIndex(date.getHours(), 2),
        mm: formatIndex(date.getMinutes(), 2),
        ss: formatIndex(date.getSeconds(), 2),
    };
    (Object.keys(replacer) as (keyof typeof replacer)[]).forEach((v) => {
        format = format.replace(v, replacer[v])
    });
    return format
}
