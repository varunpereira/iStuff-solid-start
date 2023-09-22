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
	scroll,
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
		scroll("last")
	}

	react(() => {
		var pusher = new Pusher(env.VITE_key, {
			cluster: env.VITE_cluster,
		})
		pusher.subscribe("chat").bind("event_1", (data) => {
			msg().trim() !== "" ? status("typing") : status("")
			write(data)
			chats(() => data.chat.msg)
			scroll("last")
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
				style: () => "mx_auto w-[25rem] h-[25rem] mt-[3rem] py-[.3rem] c_white tc_black r_1 a_col",
			},
			t({style: () => "ts_3 tw_1 border-b-[.1rem] bc_grey a_row ax_mid"}, () => rec_email()),
			d(
				{style: () => "overflow-auto px-[.3rem]"},
				() =>
					chats().map((v, k) =>
						d(
							{
								name: () => (k === chats().length - 1 && status() !== "typing" ? "last" : ""),
								style: () =>
									"a_row tc_white " +
									(dict.keys(v)[0] === globe()?.email ? "ax_right " : "") +
									(k === 0 ? "mt-2" : ""),
							},
							() =>
								dict.keys(v)[0] === globe()?.email
									? d(
											{
												style: () => "bg-blue-500 rounded-t-xl rounded-l-xl mb-2 py-1 px-2 ",
											},
											() => v[globe().email],
									  )
									: d(
											{
												style: () => "bg-green-500 rounded-t-xl rounded-r-xl mb-2 py-1 px-2",
											},
											() => v[rec_email()],
									  ),
						),
					),
				d({style: () => "a_row ax_right"}, () =>
					status() === "typing"
						? d(
								{
									name: () => "last",
									style: () =>
										"flex justify-start ml-2 max-w-[400px] w-fit break-words rounded-t-full rounded-l-full bg-gray-300 text-gray-600 px-2 mb-2",
								},
								t({style: () => "animate-pulse"}, () => "● ● ●"),
						  )
						: "",
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
				style: () =>
					"mx-[.3rem] mb-[.3rem] h-[2rem] px-[.25rem] py-[.2rem] tc_black bw_1 border-gray-500 focus:bc_black r_1",
			}),
		),
	)
}
