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
} from "~/fe/config/shop"
import prod_short from "~/fe/prod/short"
import {auth} from "~/fe/config/auth"
import pager from "~/fe/config/piece/pager"

export default () => {
	var nav = route()
	var path_var = path.var()
	var prod = state([])
	var pages = state()

	mount(async () => {
		await auth("pub")
	})

	react(async () => {
		var res = await req("/search/result", {
			search: path_var?.term,
			theme: path_var?.theme,
			page: path_var?.page,
		})
		prod(res.prod)
		write(res)
		pages(res.pages)
	})

	return d(
		{style: () => "fit_1"},
		title({}, () => "Search Results"),
		d({style: () => ""}, () =>
			prod().length === 0
				? t({}, () => "No results for " + decodeURIComponent(path_var?.term))
				: 
				d({},
						d(
							{style: () => "a_row_auto gap-[1rem] mb-[1rem]"},
							prod().map((v, k) => prod_short({prod: v})),
						),
						pager({
							cur: () => path_var?.page,
							size: () => pages(),
							link: () => "/search/all/" + path_var?.term,
						}),
				  ),
		),
	)
}
