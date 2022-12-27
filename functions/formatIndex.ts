export default (i: number | string, digit: number) => {
    if (typeof i === "string") {
        i = Number(i);
    }
    if (digit === Infinity || digit === -Infinity) {
        return i.toString();
    } else {
        return `${"0".repeat(digit)}${i}`.slice(-digit);
    }
};
