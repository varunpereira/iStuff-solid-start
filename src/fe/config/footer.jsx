import {state, react, write, d, t, b, i, v, env, route} from "~/fe/config/shop"
import {ShopIcon} from "~/fe/config/asset/icon"

export default () => {
	var nav = route()

	return d(
		{style: () => "fit_2 v2:px-[1rem] v3:px-[5rem] py-[2rem] "},
		d(
			{style: () => "a_row ay_mid tc_aqua tw_1 ts_3 mr-[1rem]"},
			b(
				{
					click: () => nav("/"),
					style: () =>
						"tc_black c_aqua_1 tw_1 rounded-md pr-[.6rem] pl-[.1rem] a_row h-[1.8rem] mt-[.1rem]",
				},
				<ShopIcon class={`w-[2rem] h-[1.5rem] mt-[.2rem] tc_black fill-transparent stroke-2`} />,
				t({style: () => ""}, "iStuff"),
			),
		),
		t({style: () => "a_row ax_mid"}, () => "© 2023 iStuff - Varun Pereira"),
	)
}
