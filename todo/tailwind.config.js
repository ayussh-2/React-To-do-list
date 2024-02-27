/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                pink: "#ebc3c4",
                text: "#f4f4f5",
                darkBg: "#121212",
                darkTxt: "#DDDDDD",
                darkCard: "#1e1e1e",
                darkSubCard: "#232323",
                darkLightBlack: "#2e2e2e",
            },
            height: {
                cont: "40rem",
                contM: "20rem",
                hScreen: "100vh",
            },
            fontSize: {
                mid: "1.15rem",
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
