/**@type {import("eslint/lib/shared/types").ConfigData} */
module.exports = {
    extends: "next/core-web-vitals",
    plugins: ["prettier"],
    rules: {
        "react/display-name": "off",
        "import/no-anonymous-default-export": "off",
    },
};
