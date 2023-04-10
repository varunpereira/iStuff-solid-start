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
	db,
} from "~/config/store"
import {search_icon, close_icon} from "~/config/asset/icon.jsx"
import axios from "axios"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({search: ""})
	var suggest = state([])
	var categs = ["All", "Tech"]
	var categ = categs[0]
	var page = "1"

	mount(async () => {})

	var form_submit = async () => {
		var res = await axios.post("/$/search/api/suggest", form_data())
		if (res?.data?.error != null) {
			return form_error(res.data.error)
		}
		nav("/")
	}

	react(async () => {
		suggest([])
		var res = await axios.post("/$/search/api/suggest", {search: form_data().search, categ, page})
		suggest(res.data.products)
	})

	return d(
		{style: () => "c_white w_full h-[2rem] r_full z_fit mr-[1rem]"},
		i({
			type: () => "text",
			value: () => form_data().search,
			input: (e) => form_data({...form_data(), search: e.target.value}),
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
									"z_put c_white right-[2.3rem] top-[.5rem] tc_black w-[.8rem] h-[.8rem]",
							}),
						),
						d({style: () => "z_put c_white tc_black top-[2.5rem] w_full r_1 p-[1rem]"}, () =>
							suggest().map((v, k) => b({}, () => v.title)),
						),
				  )
				: "",
		b(
			{click: form_submit},
			search_icon({
				style: () => "z_put c_white right-[.5rem] top-[.3rem] tc_black w-[1.3rem] h-[1.3rem]",
			}),
		),
	)
}
