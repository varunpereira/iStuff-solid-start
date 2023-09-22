import {write, env, res, cookie} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {email} = cookie(request?.headers?.get("cookie"))
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
	return res({chat})
}
