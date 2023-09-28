import {write, env, res, num, math} from "~/be/config/shop"
import prod_model from "~/be/config/db/model/prod"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	db()
	var size = 8
	var prod = await prod_model.aggregate([
		{
			$match: {
				title: {$regex: "", $options: "i"},
				approve: "true",
			},
		},
		{$sample: {size}},
	])

	return res({
		prod,
	})
}
