/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                pink: "#ebc3c4",
                text: "#f4f4f5",
            },
        },
        fontFamily: {
            nav: ["Poppins"],
            main: ["Montserrat"],
            title: ['"Grape Nuts"'],
            date: ["Dosis"],
        },
    },
    plugins: [],
};
