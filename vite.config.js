import {defineConfig} from "vite"
import solid from "solid-start/vite"
import vercel from "solid-start-vercel"

export default defineConfig({
	plugins: [
		solid({
			adapter: vercel(),
			// appRoot: "./app/",
			// clientEntry: './client.jsx' + (process.env.NODE_ENV === 'production' ? '.jsx' : ''),
			// serverEntry: './src/config/mw' + (process.env.NODE_ENV === 'production' ? '.jsx' : ''),
			rootEntry: "./src/config/struct" + (process.env.NODE_ENV === "production" ? ".jsx" : ""),
			routesDir: './feat',
		}),
	],
})
