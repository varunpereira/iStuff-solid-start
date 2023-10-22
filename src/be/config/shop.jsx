import {redirect} from "solid-start/server"
import {parseCookie} from "solid-start"

// generic

export var write = console.log

export var timer = {
	put: (fn, time) => setInterval(fn, time),
	cut: (fn) => clearInterval(fn),
}

// parse
export var str = JSON.stringify
export var num = Number
export var cookie = (headers) => {
	var req_cookie = headers?.get("cookie")
	if (req_cookie == null) return {}
	var cookies = () => parseCookie(req_cookie)
	if (cookies()?.cookie != null) return any(cookies()?.cookie)
}
export var any = JSON.parse // eg bool

// more innate globe
export var math = Math
export var date = Date
export var dir = Array
export var dic = Object

export var req = async (link = "", value = {}) => {
	var response = await fetch(link, {
		method: "POST",
		body: JSON.stringify(value),
	})
	return response.json()
}

export var env = import.meta.env

/*
"Domain=" +
				(process.env.NODE_ENV === "production"
					? import.meta.env.VITE_domain
					: import.meta.env.VITE_domain_dev) +
				";"
*/

export var res = (body = {}, head) =>
	new Response(JSON.stringify(body), {
		headers: {
			[head?.cookie != null ? "Set-Cookie" : "!Set-Cookie"]:
				"cookie=" +
				JSON.stringify(head?.cookie?.value) +
				"; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=" +
				head?.cookie?.age +
				";",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":
				process.env.NODE_ENV === "production"
					? "https://" + import.meta.env.VITE_domain
					: "http://" + import.meta.env.VITE_domain_dev,
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Max-Age": "86400",
		},
	})

export var nav = redirect
