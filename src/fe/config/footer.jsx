import {state, mount, react, write, d, t, b, i, v, env, route} from "~/fe/config/shop"
import {shop_icon} from "~/fe/config/asset/icon"

export default () => {
	var nav = route()

	return d(
		{style: () => "fit_2 v2:px-[1rem] v3:px-[5rem] py-[2rem] "},
		b(
			{click: () => nav("/"), style: () => "a_row ay_mid tc_aqua tw_1 ts_3 mr-[1rem]"},
			shop_icon({style: () => "w-[2rem] h-[1.5rem] tc_aqua mt-[.15rem]"}),
			t({style: () => ""}, () => "iStuff"),
		),
		t({style: () => "a_row ax_mid"}, () => "© 2023 iStuff - Varun Pereira"),
	)
}
