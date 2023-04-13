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
	req,
} from "~/config/store"
import {search_icon, close_icon} from "~/config/asset/icon.jsx"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({search: ""})
	var suggest = state([])
	var suggest_on = state(true)
	var categs = ["all", "tech"]
	var categ = categs[0]
	var page = "1"

	mount(async () => {
		await get_suggest()
	})

	var form_submit = async (term) => {
		suggest_on(false)
		nav("/search?term=" + term + "&categ=all&page=1")
	}

	var get_suggest = async () => {
		var res = await req("/$/search/api/suggest", {search: form_data().search, categ, page})
		write(form_data().search)
		write(res.products)
		suggest(res.products)
		suggest_on() === "wait" ? "" : suggest_on(true)
	}

	return d(
		{style: () => "c_white w_full h-[2rem] r_full z_fit mr-[1rem]"},
		i({
			type: () => "text",
			value: () => form_data().search,
			input: async (e) => {
				form_data({...form_data(), search: e.target.value})
				await get_suggest()
			},
			holder: () => "search from millions of products...",
			style: () => "tc_black r_full px-[.8rem] w_full h_full o_null",
		}),
		() =>
			form_data().search.trim() !== ""
				? d(
						{style: () => ""},
						b(
							{click: () => form_data({...form_data(), search: ""})},
							close_icon({
								style: () =>
									"z_put c_white right-[2.3rem] top-[.6rem] tc_black w-[.8rem] h-[.8rem]",
							}),
						),
						() =>
							suggest_on() !== false
								? d({style: () => "z_put c_white tc_black top-[2.5rem] w_full r_1 p-[1rem]"}, () =>
										suggest().map((v, k) =>
											b(
												{
													click: () => {
														suggest_on("wait")
														form_submit(v.title)
													},
												},
												() => v.title,
											),
										),
								  )
								: "",
				  )
				: "",
		b(
			{click: () => form_submit(form_data().search)},
			search_icon({
				style: () => "z_put c_white right-[.5rem] top-[.3rem] tc_black w-[1.3rem] h-[1.3rem]",
			}),
		),
	)
}
