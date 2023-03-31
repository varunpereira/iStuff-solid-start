import Pusher from "pusher"
import {write, db, env, res,} from "~/config/store"

export var POST = async ({request}) => {
	var {message, sender} = await request.json()
	var response = await pusher.trigger("chat", "chat-event", {
		message,
		sender,
	})
	return res({message: "completed"})
}

export var pusher = new Pusher({
	appId: import.meta.env.VITE_app_id,
	key: import.meta.env.VITE_key,
	secret: import.meta.env.VITE_secret,
	cluster: import.meta.env.VITE_cluster,
	useTLS: true,
})
