import {write, env, res,cookie} from "~/be/config/shop"
import {db} from "~/be/config/db/join"
import chat_model from "~/be/config/db/model/chat"

export var POST = async ({request}) => {
	var {email, token} = cookie(request.headers)
	db()
	var chat = await chat_model.findOne()
	return res({chat})
}
