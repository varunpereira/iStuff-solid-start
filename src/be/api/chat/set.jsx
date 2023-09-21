import Pusher from "pusher"
import {write, env, res} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {message, email, token} = await request.json()
	db()
	var chat_set = await chat_model.updateOne(
		{},
		{
			$push: {
				msg: {"1@x.x": message},
			},
		},
	)
	var chat = await chat_model.findOne()
	var res_1 = await pusher.trigger("chat", "event_1", {chat})

	return res({message: "completed"})
}

export var pusher = new Pusher({
	appId: env.VITE_app_id,
	key: env.VITE_key,
	secret: env.VITE_secret,
	cluster: env.VITE_cluster,
	useTLS: true,
})
