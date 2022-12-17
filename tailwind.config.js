/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
        safelist: [/^bg-/, /^text-/],
    },
    theme: {
        extend: {},
        listStyleType: {
            none: "none",
            disc: "disc",
            decimal: "decimal",
            square: "square",
            roman: "upper-roman",
            "decimal-leading-zero": "decimal-leading-zero",
        },
    },
    plugins: [],
};
