import {defineConfig} from "vite"
import solid from "solid-start/vite"
import vercel from "solid-start-vercel"

export default defineConfig({
	plugins: [
		solid({
			adapter: vercel({edge:true}),
			// appRoot: "./app/",
			// serverEntry: './src/config/server' + (process.env.NODE_ENV === 'production' ? '.jsx' : ''),
			// clientEntry: './src/client' + (process.env.NODE_ENV === 'production' ? '.jsx' : ''),
			// rootEntry: "./root" + (process.env.NODE_ENV === "production" ? ".jsx" : ""),
			// routesDir: './feat',
		}),
	],
})
