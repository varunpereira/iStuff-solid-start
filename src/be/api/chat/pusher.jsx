import Pusher from "pusher"
import {write, env, res,} from "~/be/config/shop"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	var {message, sender, email, token} = await request.json()
	var res_1 = await pusher.trigger("chat", "event_1", {
		message,
		sender,
	})
	write(response)
	return res({message: "completed"})
}

export var pusher = new Pusher({
	appId: env.VITE_app_id,
	key: env.VITE_key,
	secret: env.VITE_secret,
	cluster: env.VITE_cluster,
	useTLS: true,
})
