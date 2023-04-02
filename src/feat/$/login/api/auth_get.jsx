import {write, db, env, res} from "~/config/store"
import user_model from "~/config/db/model/user"
import {parseCookie} from "solid-start"

export var POST = async ({request}) => {
	var {email} = await request.json()
	var cookies = () => parseCookie(String(request?.headers?.get("cookie")))
	var cookie = cookies()?.cookie 
	var token = cookie?.token ?? ""
	db()
	var get_user = await user_model.findOne({email, token})
	if (get_user == null) {
		return res({
			error: "Access denied.",
		})
	}
	return res({ok: true})
}
