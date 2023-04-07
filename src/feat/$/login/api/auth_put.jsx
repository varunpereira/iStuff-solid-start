import {write, db, env, res} from "~/config/store"
import crypt from "bcryptjs"
import jwt from "jsonwebtoken"
import user_model from "~/config/db/model/user"

export var POST = async ({request}) => {
	var {email, password} = await request.json()
	db()
	var get_user = await user_model.findOne({email})
	if (get_user == null) {
		return res({
			error: "This user does not exist.",
		})
	}
	var password_match = crypt.compareSync(password, get_user.password)
	if (password_match === false) {
		return res({
			error: "Password incorrect.",
		})
	}
	var token = jwt.sign({email}, env.VITE_sesh, {
		expiresIn: "1d",
	})
	// save token to db for the user
	var set_user = await user_model.updateOne(
		{email},
		{
			$set: {
				token,
			},
		},
	)
	var value = {email, token}
	var age =  10 * 60 // 10 min
	return res({ok:true}, {cookie: {value, age}})
	// return new Response(JSON.stringify({hi:'hi'}), {
	// 	headers: {
	// 		"Set-Cookie": `cookie=${JSON.stringify(
	// 			data,
	// 		)}; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}; Domain=${
	// 			process.env.NODE_ENV === "!production" ? env.VITE_domain : ""
	// 		}`,
	// 	},
	// })
}
