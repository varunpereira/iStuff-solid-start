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
	req,
	globe
} from "~/fe/config/shop"
import {search_icon, close_icon} from "~/fe/config/asset/icon"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({search: ""})
	var suggest = state([])
	var suggest_on = state(true)
	var themes = ["all", "tech"]
	var theme = themes[0]
	var page = "1"

	mount(async () => {
		await get_suggest()
	})

	var click_outside = (el, accessor = () => "") => {
		var on_click = (e) => !el.contains(e.target) && accessor()
		view.put_listen("click", on_click)
		clean(() => view.cut_listen("click", on_click))
	}

	var form_submit = async (term) => {
		suggest_on(false)
		nav("/search?term=" + term + "&theme=all&page=1")
	}

	var get_suggest = async () => {
		suggest([]) // loading
		var res = await req("/priv/search/api/suggest", {search: form_data().search, theme, page})
		suggest(res.prod)
		suggest_on() === "wait" ? "" : suggest_on(true)
	}

	return d(
		{style: () => "c_white w_full h-[2rem] r_full z_fit mr-[1rem]"},
		i({
			click: async () => await get_suggest(),
			type: () => "text",
			value: () => form_data().search,
			input: async (e) => {
				form_data({...form_data(), search: e.target.value})
				await get_suggest()
			},
			holder: () => "search millions of products...",
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
							suggest_on() === true && suggest().length >= 1
								? d(
										{
											custom: (e) => click_outside(e, () => suggest_on(false)),
											style: () => "z_put a_col c_white tc_black top-[2.5rem] w_full r_1 p-[1rem]",
										},
										() =>
											suggest().map((v, k) =>
												b(
													{
														click: () => {
															suggest_on("wait")
															form_data({...form_data(), search: v.title})
															form_submit(v.title)
														},
														style: () => "a_row",
													},
													() => v.title,
												),
											),
								  )
								: suggest_on() === true && suggest().length === 0
								? d(
										{style: () => "z_put c_white tc_black top-[2.5rem] w_full r_1 p-[1rem]"},
										() => "Loading...",
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
