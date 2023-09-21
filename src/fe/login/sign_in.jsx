import {
	title,
	state,
	react,
	mount,
	clean,
	write,
	d,
	t,
	i,
	b,
	page,
	route,
	globe,
	req,
	env,
} from "~/fe/config/shop"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({email: "", password: ""})

	var form_submit = async () => {
		var res = await req("/login/auth_put", form_data())
		if (res?.error != null) {
			return form_error(res.error)
		}
		nav("/")
	}

	return page(
		{title: () => "Sign in", status: () => "pub"},
		d(
			{
				key: (e) => (e.key === "Enter" ? form_submit() : ""),
				style: () => "mx_auto w-[20rem] mt-[3rem] p-[3rem] c_white tc_black r_1 a_col ",
			},
			t({style: () => "ts_3 tw_1 mb-[1rem]"}, () => "Sign in"),
			i({
				type: () => "text",
				value: () => form_data()["email"],
				input: (e) => (form_data()["email"] = e.target.value),
				holder: () => "Email",
				style: () => "mb-[1rem] h-[2rem] px-[.25rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
			i({
				type: () => "password",
				value: () => form_data()["password"],
				input: (e) => (form_data()["password"] = e.target.value),
				holder: () => "Password",
				style: () => "mb-[1rem] h-[2rem] px-[.25rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
			b(
				{click: form_submit, style: () => "mb-[1.5rem] h-[2rem] c_black tc_aqua r_1 "},
				t({}, () => "Sign in"),
			),
			t({style: () => "tc_red h-[2rem] ts_1"}, () => form_error()),
		),
		d(
			{style: () => "w-[20rem] mx_auto a_row mt-[1rem]"},
			t({style: () => "mr-[.3rem]"}, () => "Don't have an account?"),
			b({click: () => nav("/signup"), style: () => "mb-[1rem] hover:tc_grey"}, () => "Sign up"),
		),
	)
}
