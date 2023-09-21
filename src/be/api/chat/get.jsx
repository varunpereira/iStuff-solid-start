import {write, env, res,} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {email, token} = await request.json()
	db()
	var chat = await chat_model.findOne()
	return res({chat})
}
