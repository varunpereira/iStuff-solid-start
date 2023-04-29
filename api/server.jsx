import {StartServer, createHandler, renderAsync} from "solid-start/entry-server"
import {write, nav, cookie, res} from "~/config/shop"

export default createHandler(
	({forward}) => {
		return async (event) => {
			var link = new URL(event.request.url).pathname
			// route tag cant override /priv* so:
			if (event.request.method === "GET" && link?.startsWith('/priv')) {
				return nav('/404')
			}
			else if (event.request.method === "POST" && link?.startsWith('/priv')) {
				// get cookie, validate token and email to db.
				// return nav('/404')
			}
			return forward(event)
		}
	},
	renderAsync((event) => <StartServer event={event} />),
)
