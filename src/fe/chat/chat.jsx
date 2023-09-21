import {
	state,
	react,
	write,
	env,
	page,
	d,
	t,
	b,
	title,
	req,
	str,
	globe,
	i,
	dict,
} from "~/fe/config/shop"
import Pusher from "pusher-js"

export default () => {
	var chats = state([])
	var msg = state("")
	var status = state("")
	var rec_email = state("")

	var mount = async () => {
		var res = await req("/chat/get")
		chats(res.chat.msg)
		var rec = res.chat?.email1 !== globe()?.email ? res.chat?.email1 : res.chat?.email2
		rec_email(rec)
	}

	react(() => {
		var pusher = new Pusher(env.VITE_key, {
			cluster: env.VITE_cluster,
		})
		pusher.subscribe("chat").bind("event_1", (data) => {
			msg().trim() !== "" ? status("typing") : status("")
			chats(() => data.chat.msg)
		})
		return () => pusher.unsubscribe("chat")
	})

	var form_submit = async () => {
		var res = await req("/chat/set", {message: msg()})
		write(res)
		msg("")
		status("")
	}

	return page(
		{title: () => "Chat", mount},
		d(
			{
				style: () =>
					"mx_auto w-[30rem] h-[30] mt-[3rem] px-[.3rem] py-[.3rem] c_white tc_black r_1 a_col overflow-auto",
			},
			t({style: () => "ts_3 tw_1 border-b-[.1rem] bc_grey a_row ax_mid"}, () => rec_email()),
			() =>
				chats().map((v) =>
					d(
						{
							style: () =>
								"a_row tc_white " + (dict.keys(v)[0] === globe()?.email ? "ax_right " : ""),
						},
						() =>
							dict.keys(v)[0] === globe()?.email
								? d(
										{
											style: () => "bg-blue-500 rounded-t-lg rounded-l-lg mb-2 py-1 px-2",
										},
										() => v[globe().email],
								  )
								: d(
										{style: () => "bg-green-500 rounded-t-lg rounded-r-lg mb-2 py-1 px-2"},
										() => v[rec_email()],
								  ),
					),
				),
			i({
				type: () => "text",
				value: () => msg(),
				input: (e) => {
					msg(e.target.value)
					msg().trim() !== "" ? status("typing") : status("")
				},
				key: (e) => (e.key === "Enter" ? form_submit() : ""),
				holder: () => "message...",
				style: () => "mb-[.3rem] h-[2rem] px-[.25rem] tc_black bw_1 focus:bw_2 bc_black r_1",
			}),
		),
	)
}
