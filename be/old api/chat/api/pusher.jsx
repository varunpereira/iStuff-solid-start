import Pusher from "pusher"
import {write, env, res,} from "~/fe/config/shop"
import {db} from '~/fe/config/db/join'

export var POST = async ({request}) => {
	var {message, sender} = await request.json()
	var response = await pusher.trigger("chat", "chat-event", {
		message,
		sender,
	})
	return res({message: "completed"})
}

export var pusher = new Pusher({
	appId: env.VITE_app_id,
	key: env.VITE_key,
	secret: env.VITE_secret,
	cluster: env.VITE_cluster,
	useTLS: true,
})
