import {write, env, res, cookie} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import Pusher from "pusher"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	var {message} = await request.json()
	db()
	write({[email]: message})
	var chat_set = await chat_model.updateOne(
		{},
		{
			$push: {
				msg: {[email]: message},
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
