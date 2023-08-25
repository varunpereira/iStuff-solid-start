import {write, env, res, cookie} from "~/be/config/shop"
import user_model from "~/be/config/db/model/user"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	if (user == null) {
		return res({
			flaw: "Error signing out.",
		})
	}
	// save token to db for the user
	var set_user = await user_model.updateOne(
		{email},
		{
			$set: {
				token: null,
			},
		},
	)
	write(user?.pub)
	// setup for public user
	var value = {email: user?.pub}
	var age = 0
	return res({}, {cookie: {value, age}})
	// return new Response(JSON.stringify({}), {
	// 	headers: {
	// 		"Set-Cookie": `cookie=${JSON.stringify(
	// 			data,
	// 		)}; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}; Domain=${
	// 			process.env.NODE_ENV === "!production" ? env.VITE_domain : ""
	// 		}`,
	// 	},
	// })
}
