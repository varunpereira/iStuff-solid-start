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
import {shop_icon} from "~/config/asset/icon.jsx"
import axios from "axios"

export default () => {
	var width = state()
	var nav = route()

	mount(async () => {
		width(view().width())
		view().put_listen("resize", handler)
	})

	var handler = () => {
		width(view().width())
	}

	clean(() => {
		view().cut_listen("resize", handler)
	})

	var sign_out = async () => {
		var res = await axios.post("/$/login/api/auth_cut", {email: globe().email})
		globe({email: null})
		nav("/signin")
	}

	return d(
		{style: () => "f_1 px-[1rem] py-[.5rem] a_row ax_between"},
		b(
			{click: () => nav("/"), style: () => "a_row ax_start tc_aqua tw_1 ts_2 "},
			shop_icon({style: () => "w-[1.2rem] h-[1.2rem] mt-[.3rem] mr-[.4rem] tc_aqua"}),
			t({}, () => "iStuff"),
		),
		() => JSON.stringify(globe().email),
		globe().email != null
			? b({click: () => nav("/signin"), style: () => "a_row ax_end"}, () => globe().email)
			: b({click: () => nav("/signin"), style: () => "a_row ax_end"}, () => "Sign in"),
		b({click: sign_out, style: () => "a_row ax_end"}, () => "sign out"),
	)
}
