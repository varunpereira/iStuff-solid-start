import {StartServer, createHandler, renderAsync} from "solid-start/entry-server"
import {db, write, nav, parse_cookie, res} from "~/config/store"

export default createHandler(
	({forward}) => {
		return async (event) => {
			var link = new URL(event.request.url).pathname
			// route tag cant override /$* so:
			if (event.request.method === "GET" && link?.startsWith('/$')) {
				return nav('/404')
			}
			return forward(event)
		}
	},
	renderAsync((event) => <StartServer event={event} />),
)
