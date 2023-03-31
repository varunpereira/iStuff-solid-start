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
	var token = jwt.sign({email}, env.sesh_key, {
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
	var data = {email, token}
	var age = 30 * 24 * 1 * 60 * 60 // 30 days
	return res({}, {cookie: {data, age}})
}
