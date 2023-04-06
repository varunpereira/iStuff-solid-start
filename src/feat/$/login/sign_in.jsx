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
	route,
	globe,
	auth,
	effect,
} from "~/config/store"
import axios from "axios"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({email: "", password: ""})

	mount(async () => {
		await auth("pub")
	})

	var form_submit = async () => {
		var res = await axios.post("/$/login/api/auth_put", form_data())
		if (res?.data?.error != null) {
			form_error(res.data.error)
			return
		}
		nav("/")
	}

	// react(() => write(form_data().email))

	return d(
		{},
		title({}, () => "Sign in - iStuff"),
		d(
			{style: () => "w-[20rem] mx-[auto] p-[3rem] c_white tc_black r1 a_col "},
			t({style: () => "ts_1 tw_1 mb-[1rem]"}, () => "Sign in"),
			i({
				type: () => "text",
				value: () => form_data().email,
				input: (e) => form_data({...form_data(), email: e.target.value}),
				holder: () => "Email",
				style: () => "mb-[1rem] h-[2rem] px-[.5rem] tc_black bw_1 bc_black r1",
			}),
			i({
				type: () => "password",
				value: () => form_data().password,
				input: (e) => form_data({...form_data(), password: e.target.value}),
				holder: () => "Password",
				style: () => "mb-[2rem] h-[2rem] px-[.5rem] tc_black bw_1 bc_black r1",
			}),
			b(
				{click: form_submit, style: () => "mb-[1.5rem] h-[2rem] c_aqua bw_1 bc_black r1 "},
				t({}, () => "Sign in"),
			),
			t({style: () => "tc_red h-[2rem]"}, () => form_error()),
		),
		d(
			{style: () => "w-[20rem] mx-[auto] a_row ax_start mt-[1rem]"},
			t({style: () => "mr-[.3rem]"}, () => "Don't have an account?"),
			b({click: () => nav("/signup"), style: () => "mb-[1rem] hover:underline"}, () => "Sign up"),
		),
	)
}
