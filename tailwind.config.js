/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1b2a4e",    // Original primary navy
                accent: "#ff7c3b",     // Original accent orange
                secondary: "#4a7ba5",  // Original serif blue
                "bg-light": "#e3effa", // Original background light blue
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-montserrat)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
