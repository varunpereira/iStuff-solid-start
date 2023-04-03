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
import {tv_icon} from "~/config/asset/icon.jsx"
import cookie from "js-cookie"
import server$ from "solid-start/server"
import user_model from "~/config/db/model/user"
import axios from 'axios'

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
		var res = await axios.post('/$/login/api/auth_cut',{email: globe().email})
		globe({email: null})
		cookie.remove("email")
		window.location.href = "/signin"
	}

	return d(
		{style: () => "f_1 px-[1rem] py-[.5rem] a_row ax_between"},
		b(
			{click: () => nav("/"), style: () => "a_row ax_start tc_orange tw_1 ts_2 "},
			tv_icon("w-[1.8rem] h-[1.8rem] tc_orange mr-[.4rem]"),
			t({}, () => "iStuff"),
		),
	()=>JSON.stringify(globe() ) + JSON.stringify(cookie.get('email')),
		globe().email != null
			? b({click: () => nav("/signin"), style: () => "a_row ax_end"}, () => globe().email)
			: b({click: () => nav("/signin"), style: () => "a_row ax_end"}, () => "Sign in"),
		b({click: sign_out, style: () => "a_row ax_end"}, () => "sign out"),
	)
}
