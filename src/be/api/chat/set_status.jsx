import {write, env, res, cookie} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import chat_model from "~/be/config/db/model/chat"
import Pusher from "pusher"

export var POST = async ({request}) => {
	var {email} = cookie(request.headers)
	var {status} = await request.json()
	db()
	if (status === "typing") {
		var chat_set = await chat_model.updateOne(
			{"email1.email": email},
			{
				"email1.status": "typing",
			},
		)
		var chat_set2 = await chat_model.updateOne(
			{"email2.email": email},
			{
				"email2.status": "typing",
			},
		)
	} else {
		var chat_set3 = await chat_model.updateOne(
			{"email1.email": email},
			{
				"email1.status": "",
			},
		)
		var chat_set4 = await chat_model.updateOne(
			{"email2.email": email},
			{
				"email2.status": "",
			},
		)
	}
	var chat = await chat_model.findOne()
	var rec = chat.email1.email !== email ? chat.email1 : chat.email2
	var status = chat.email1.email === email ? chat.email1.status : chat.email2.status
	// write(email)
	// write(rec.status)
	// write(status)
	var res_2 = await pusher.trigger("chat", "event_2", {chat, })
	return res({chat, rec, status})
}

export var pusher = new Pusher({
	appId: env.VITE_app_id,
	key: env.VITE_key,
	secret: env.VITE_secret,
	cluster: env.VITE_cluster,
	useTLS: true,
})
