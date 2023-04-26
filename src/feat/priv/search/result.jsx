import {
	state,
	mount,
	react,
	write,
	d,
	t,
	b,
	i,
	v,
	route,
	globe,
	title,
	req,
	path,
} from "~/config/shop"
import prod_short from "~/feat/priv/prod/short"
import {auth} from "~/config/auth"

export default () => {
	var nav = route()
	var path_par = path.par()
	var prod = state([])

	mount(async () => {
		await auth("pub")
	})

	react(async () => {
		var res = await req("/priv/search/api/result", {
			search: path_par.term,
			theme: path_par.theme,
			page: path_par.page,
		})
		prod(res.prod)
	})

	return d(
		{style: () => "fit_2 "},
		title({}, () => "Search Results - iStuff"),
		() =>
			prod().length === 0
				? t({}, () => "No results for " + path_par.term)
				: () =>
						d(
							{style: () => "a_row_auto gap-[1rem]"},
							prod().map((v, k) => prod_short({prod: v})),
						),
	)
}
