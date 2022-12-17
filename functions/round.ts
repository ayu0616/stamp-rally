export default (n: number, base: number = 0) => {
    const roundedString =
        (Math.round(n / base) * base).toString() +
        "0".repeat(Math.abs(Math.log10(base)));
    return roundedString.slice(
        0,
        roundedString.indexOf(".") + Math.abs(Math.log10(base)) + 1
    );
};
