import {write, env, res, cookie} from "~/be/config/shop"
import user_model from "~/be/config/db/model/user"
import {db} from '~/be/config/db/join'

export var POST = async ({request}) => {
	var cookies = cookie(request?.headers?.get("cookie"))
	var {email} = await request.json()
	db()
	// save token to db for the user
	var set_user = await user_model.updateOne(
		{email},
		{
			$set: {
				token: null,
				pub_email: null,
			},
		},
	)
	var value = {email: cookies?.email, token: null}
	var age = 0
	return res({},{cookie: {value,age}})
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
