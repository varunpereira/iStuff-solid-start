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
	effect,req
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({email: "", password: "", confirm_password:''})

	mount(async () => {
		await auth("pub")
	})

	var form_submit = async () => {
		var res = await req("/login/login_put", form_data())
		if (res?.error != null) {
			return form_error(res.error)
		}
		nav("/")
	}

	// react(() => write(form_data().email))

	return d(
		{style:()=>''},
	title({},()=>"Sign up"),
		d(
			{style: () => "mx_auto mt-[3rem] w-[20rem] p-[3rem] c_white tc_black r_1 a_col "},
			t({style: () => "ts_3 tw_1 mb-[1rem]"}, () => "Sign up"),
			i({
				type: () => "text",
				value: () => form_data().email,
				input: (e) => form_data({...form_data(), email: e.target.value}),
				holder: () => "Email",
				style: () => "mb-[1rem] h-[2rem] px-[.5rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
			i({
				type: () => "password",
				value: () => form_data().password,
				input: (e) => form_data({...form_data(), password: e.target.value}),
				holder: () => "Password",
				style: () => "mb-[1rem] h-[2rem] px-[.5rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
			i({
				type: () => "password",
				value: () => form_data().confirm_password,
				input: (e) => form_data({...form_data(), confirm_password: e.target.value}),
				holder: () => "Confirm Password",
				style: () => "mb-[1rem] h-[2rem] px-[.5rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
			b(
				{click: form_submit, style: () => "mb-[1.5rem] h-[2rem] c_black tc_aqua r_1 "},
				t({}, () => "Sign up"),
			),
			t({style: () => "ts_1 tc_red h-[2rem]"}, () => form_error()),
		),
		d(
			{style: () => "mx_auto w-[20rem] a_row mt-[1rem]"},
			t({style: () => "mr-[.3rem]"}, () => "Already have an account?"),
			b({click: () => nav("/signin"), style: () => "mb-[1rem] hover:tc_grey"}, () => "Sign in"),
		),
	)
}
