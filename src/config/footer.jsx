import {state, mount, react, write, d, c, t, b, i, v, env, parse, route} from "~/config/store"
import {shop_icon} from "~/config/asset/icon.jsx"

export default () => {
	var nav = route()

	return d(
		{style: () => "fit_1 v1:px-[1rem] v2:px-[5rem] py-[2rem] "},
		b(
			{click: () => nav("/"), style: () => "a_row ax_start tc_aqua_1 tw_1 ts_2 "},
			shop_icon({style:() => "w-[1.3rem] h-[1.3rem] mt-[.3rem] mr-[.3rem] tc_aqua_1"}),
			t({}, () => "iStuff"),
		),
		t({style: () => "a_row ax_mid"}, () => "© 2023 iStuff - Varun Pereira"),
	)
}
