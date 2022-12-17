/**@type {import("prettier").Config}*/
module.exports = {
    plugins: [require("prettier-plugin-tailwindcss")],
    tabWidth: 4,
    tailwindConfig: "./tailwind.config.js",
};
