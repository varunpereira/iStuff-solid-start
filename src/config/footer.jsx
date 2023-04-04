import {state, mount, react, write, d, c, t, b, i, v, env, parse, route} from "~/config/store"
import {shop_icon} from "~/config/asset/icon.jsx"

export default () => {
	var nav = route()

	return d(
		{style: () => "f_1 px-[1rem] py-[2rem]"},
		b(
			{click: () => nav("/"), style: () => "a_row ax_start tc_aqua tw_1 ts_2 "},
			shop_icon("w-[1.2rem] h-[1.2rem] mt-[.3rem] mr-[.4rem] tc_aqua"),
			t({}, () => "iStuff"),
		),
		t({style: () => "a_row ax_centre"}, () => "© 2023 Flixter - A Denify Company"),
	)
}
