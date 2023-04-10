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
import {shop_icon, menu_icon} from "~/config/asset/icon.jsx"
import axios from "axios"
import searcher from "~/feat/$/search/searcher"

export default () => {
	var width = state()
	var nav = route()
	var acc_click = state(false)
	var menu_click = state(false)

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

	react(() => {})

	var sign_out = async () => {
		var res = await axios.post("/$/login/api/auth_cut", {email: globe().email})
		globe({email: null})
		nav("/signin")
	}

	return d(
		{style: () => "fit_1 z_fit v1:px-[1rem] v2:px-[5rem] py-[.5rem] a_row ax_equal "},
		b(
			{click: () => nav("/"), style: () => "a_row ax_left tc_aqua_1 tw_1 ts_2 mr-[1rem]"},
			shop_icon({style: () => "w-[1.3rem] h-[1.3rem] mt-[.3rem] mr-[.3rem] tc_aqua_1"}),
			t({}, () => "iStuff"),
		),
		searcher(),
		b(
			{click: () => menu_click(!menu_click())},
			menu_icon({style: () => "v1:see v2:hide w-[1.75rem] h-[1.75rem]"}),
		),
		d(
			{
				style: () =>
					"z_fit v1:z_put v1:c_black v1:a_row v1:ax_left v1:px-[1rem] v1:left-[0rem] v1:top-[2.5rem] v1:w_full v2:z_normal v2:px-[0rem] v2:w_fit",
			},
			() =>
				width() >= 640 || menu_click() === true
					? () =>
							globe().email != null
								? b(
										{
											click: () => acc_click(!acc_click()),
											style: () =>
												"v1:w_full v1:a_col v2:z_fit v2:w_fit v2:pt-[.2rem] v2:r_none" +
												(!acc_click() ? "v1:rb_full" : ""),
										},
										() => globe().email,
										() =>
											acc_click() === true
												? b(
														{
															click: sign_out,
															style: () =>
																"a_row c_black v2:z_put v2:right-[0rem] v2:left-[auto] v2:ax_right v2:px-[1rem] v2:w-[10rem] v2:top-[2.5rem] rb_full",
														},
														() => "Sign out",
												  )
												: "",
								  )
								: b({click: () => nav("/signin"), style: () => "a_null"}, () => "Sign in")
					: "",
		),
	)
}
