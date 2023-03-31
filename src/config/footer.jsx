import {state, mount, react, write, d, c, t, b, i, v, env, parse, route} from "~/config/store"
import {tv_icon} from "~/config/icon/globe.jsx"

export default () => {
	var nav = route()

	return d(
		{style: () => "f_1 px-[1rem] py-[2rem]"},
		b(
			{click: () => nav("/"), style: () => "a_row ax_start tc_orange tw_1 ts_2 "},
			tv_icon("w-[1.8rem] h-[1.8rem] tc_orange mr-[.4rem]"),
			t({}, () => "Flixter"),
		),
		t({style: () => "a_row ax_centre"}, () => "© 2023 Flixter - A Denify Company"),
	)
}
