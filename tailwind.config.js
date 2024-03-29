/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      archivo: ["Archivo", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    extend: {
      colors: {
        sviolet: "#4b2b64",
        sigma: "#1183ea",
        background: "#ededed",
        alert: "#aa1530",
        stransparent: "rgba(0, 0, 0, 0.4)",
        solive: {
          100: "#edf5d4",
          200: "#c2d199",
          300: "#8cb059",
          400: "#30590a",
        },
        sgreen: {
          100: "#ccede9",
          200: "#82c9c9",
          300: "#2eab9e",
          400: "#005454",
        },
        sblue: {
          100: "#bae0fa",
          200: "#73baeb",
          300: "#0d66a8",
          400: "#003d75",
          500: "#011b33",
        },
        scopper: {
          100: "#f7dec4",
          200: "#f09c40",
          300: "#bf6b0d",
          400: "#914a05",
        },
        sgray: {
          100: "#dcdcdc",
          200: "#959595",
          300: "#595959",
          400: "#333333",
        },
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
