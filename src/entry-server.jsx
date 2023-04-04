import {StartServer, createHandler, renderAsync} from "solid-start/entry-server"
import {json} from "solid-start/api"
import {parseCookie} from "solid-start"
import {db, write} from "~/config/store"
import {redirect} from "solid-start/server"
import user_model from "~/config/db/model/user"
import axios from "axios"

export default createHandler(
	({forward}) => {
		return async (event) => {
			var link = new URL(event.request.url).pathname
			// route tag cant override /$* so:
			if (event.request.method === "GET" && link.startsWith('/$')) {
				return redirect('/404')
			}
			var cookies = () => parseCookie(String(event.request?.headers?.get("cookie"))) 
			write("cookies:\n"+JSON.stringify(cookies().cookie))
			return forward(event)
		}
	},
	renderAsync((event) => <StartServer event={event} />),
)
