/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
	theme: {
		extend: {
			colors: {
				primary: "#E63946",
				secondary: "#E63946",
				danger: "#e3342f",
			},
		},
	},
	plugins: [],
};

