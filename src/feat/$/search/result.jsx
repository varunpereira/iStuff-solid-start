import {
	state,
	mount,
	react,
	write,
	d,
	clean,
	t,
	b,
	i,
	v,
	view,
	parse,
	route,
	globe,
	title,
	req,
	path,
} from "~/config/store"
import {shop_icon, menu_icon} from "~/config/asset/icon.jsx"

export default () => {
	var nav = route()
	var path_var = path().var()
	var path_par = path().par()
	var prod = state([])

	react(async () => {
		var res = await req("/$/search/api/result", {
			search: path_par.term,
			categ: path_par.categ,
			page: path_par.page,
		})
		prod(res.products)
	})

	react(() => {})

	return d(
		{style: () => "fit_2 "},
		title({}, () => "Search Results - iStuff"),
		() => prod().map((v, k) => t({}, () => v.title)),
	)
}
