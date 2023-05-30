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
	route,
	req,
	globe,
} from "~/fe/config/shop"
import {search_icon, close_icon, mic_icon} from "~/fe/config/asset/icon"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({search: ""})
	var suggest = state([])
	var suggest_picked = state(null)
	var suggest_on = state(true)
	var mic_on = state(false)
	var themes = ["all", "tech"]
	var theme = themes[0]
	var page = "1"

	mount(async () => {
		// await get_suggest()
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
		var res = await req("/search/suggest", {search: form_data().search, theme, page})
		suggest(res.prod)
		suggest_on() === "wait" ? "" : suggest_on(true)
		suggest_picked(null)
	}

	var key = (e) => {
		if (e.key === "Enter") {
			form_submit(form_data().search)
		} else if (e.key === "Escape") {
			form_data({...form_data(), search: ""})
		} else if (e.key === "ArrowDown") {
			suggest_picked() == null
				? suggest_picked(0)
				: suggest_picked((suggest_picked() + 1) % suggest().length)
			form_data({...form_data(), search: suggest()[suggest_picked()].title})
		} else if (e.key === "ArrowUp") {
			suggest_picked((suggest_picked() - 1 + suggest().length) % suggest().length)
			form_data({...form_data(), search: suggest()[suggest_picked()].title})
		}
	}

	var put_mic = () => {
		if (window.hasOwnProperty("webkitSpeechRecognition")) {
			var recognition = new webkitSpeechRecognition()
			recognition.continuous = false
			recognition.interimResults = false
			recognition.lang = "en-US"
			mic_on(true)
			recognition.start()
			recognition.onresult = (e) => {
				suggest_on(false)
				form_data({...form_data(), search: e.results[0][0].transcript})
				recognition.stop()
				mic_on(false)
				nav("/search?term=" + form_data().search + "&theme=all&page=1")
			}
			recognition.onerror = (e) => {
				recognition.stop()
				mic_on(false)
			}
		}
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
			key,
			holder: () => "search millions of products...",
			style: () => "tc_black r_full px-[.8rem] w_full h_full o_null",
		}),
		() =>
			form_data().search.trim() !== "" &&
			d(
				{style: () => ""},
				b(
					{click: () => form_data({...form_data(), search: ""})},
					close_icon({
						style: () => "z_put c_white right-[3.75rem] top-[.6rem] tc_black w-[.8rem] h-[.8rem]",
					}),
				),
				() =>
					suggest_on() === true && suggest().length >= 1
						? d(
								{
									custom: (e) => click_outside(e, () => suggest_on(false)),
									style: () => "z_put z-[2] a_col c_white tc_black top-[2.5rem] w_full r_1 p-[1rem]",
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
												style: () => "a_row hover:bg-gray-400 " + (suggest_picked() === k && "bg-gray-400"),
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
			),
		b(
			{click: put_mic},
			mic_icon({
				style: () => "z_put c_white right-[2.25rem] top-[.5rem] tc_black w-[1rem] h-[1rem]",
			}),
		),
		b(
			{click: () => form_submit(form_data().search)},
			search_icon({
				style: () => "z_put c_white right-[.5rem] top-[.3rem] tc_black w-[1.3rem] h-[1.3rem]",
			}),
		),
	)
}
