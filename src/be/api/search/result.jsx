import {write, env, res, num, math, link, path_decode} from "~/be/config/shop"
import prod_model from "~/be/config/db/model/prod"
import {db} from '~/be/config/db/join'

export var POST = async ({request}) => {
	var {search, theme, page} = await request.json()
	page = num(page)
	search = path_decode(search).trim()
	var prod = []
	db()
	if (theme === "all") {
		prod = await prod_model.find({
			title: {$regex: search, $options: "i"},
			approve: "true",
		})
	} else if (theme === "tech") {
		prod = await prod_model.find({
			title: {$regex: search, $options: "i"},
			theme: "tech",
			approve: "true",
		})
	}
	var prod_per_page = 8
	var pages = math.ceil(prod.length / prod_per_page)
	var lower = prod_per_page * (page - 1)
	var upper = prod_per_page * page
	prod = prod.slice(lower, upper)

	return res({
		pages,
		prod,
	})
}
