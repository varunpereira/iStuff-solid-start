import {
	write,
	db,
	env
} from "~/config/store"
import user_model from "~/config/db/model/user"

export var POST = async ({request}) => {
  var {email} = await request.json()
	db()
	// save token to db for the user
	var set_user = await user_model.updateOne(
		{email},
		{
			$set: {
				token: null,
			},
		},
	)
	// write(set_user.modifiedCount)
	var cookie = {email: null, token: null}
	var age = 0
	return new Response({}, {
		headers: {
			"Set-Cookie": `cookie=${JSON.stringify(
				cookie,
			)}; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}; Domain=${
				process.env.NODE_ENV === "production" ? env.VITE_domain : ""
			}`,
		},
	})
}