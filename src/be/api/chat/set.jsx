import {write, env, res, cookie} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import Pusher from "pusher"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	var {message} = await request.json()
	var status = ""
	db()
	if (message.trim() !== "") {
		status = "typing"
		var chat_set = await chat_model.updateOne(
			{},
			{
				$push: {
					msg: {[email]: message},
				},
			},
		)
		var chat_set2 = await chat_model.updateOne(
			{"email1.email": email},
			{
				"email1.status": "typing",
			},
		)
		var chat_set3 = await chat_model.updateOne(
			{"email2.email": email},
			{
				"email2.status": "typing",
			},
		)
	} else {
		var chat_set4 = await chat_model.updateOne(
			{"email1.email": email},
			{
				"email1.status": "",
			},
		)
		var chat_set5 = await chat_model.updateOne(
			{"email2.email": email},
			{
				"email2.status": "",
			},
		)
	}
	var chat = await chat_model.findOne()
	var res_1 = await pusher.trigger("chat", "event_1", {chat})
	return res({ok: "completed"})
}

export var pusher = new Pusher({
	appId: env.VITE_app_id,
	key: env.VITE_key,
	secret: env.VITE_secret,
	cluster: env.VITE_cluster,
	useTLS: true,
})
