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
	var rec_status = state("")

	var mount = async () => {
		var res = await req("/chat/set_status", {status: ""})
		chats(res.chat.msg)
		rec_email(res.rec.email)
		scroll("last")
	}

	react(async () => {
		var pusher = new Pusher(env.VITE_key, {
			cluster: env.VITE_cluster,
		})
		if (msg() === "") {
			var res = await req("/chat/set_status", {status: ""})
			chats(res.chat.msg)
			rec_status(res.rec.status)
			status(res.status)
		}
		pusher.subscribe("chat").bind("event_1", (data) => {
			write(data.chat)
			chats(() => data.chat.msg)
			rec_status(data.rec.status)
			status(data.status)
			scroll("last")
		})
		pusher.subscribe("chat").bind("event_2", (data) => {
			write(data.chat)
			chats(() => data.chat.msg)
			var rec = data.chat.email1.email !== email ? data.chat.email1 : data.chat.email2
			var status =
				data.chat.email1.email === email ? data.chat.email1.status : data.chat.email2.status
			rec_status(rec.status)
			status(status)
			scroll("last")
		})
		return () => pusher.unsubscribe("chat")
	})

	var form_submit = async () => {
		var res = await req("/chat/set", {message: msg()})
		write(res)
		msg("")
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
								name: () => (k === chats().length - 1 ? "last" : ""),
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
				d(
					{style: () => "a_row"},
					d(
						{
							name: () => "last",
							style: () =>
								"ml-2 max-w-[400px] w-fit break-words rounded-t-full rounded-r-full bg-gray-300 text-gray-600 px-2 mb-2",
						},
						t({style: () => "animate-pulse"}, () => (rec_status() === "typing" ? "● ● ●" : "")),
					),
				),
				d(
					{style: () => "a_row ax_right"},
					d(
						{
							name: () => "last",
							style: () =>
								"ml-2 max-w-[400px] w-fit break-words rounded-t-full rounded-l-full bg-gray-300 text-gray-600 px-2 mb-2",
						},
						t({style: () => "animate-pulse"}, () => (status() === "typing" ? "● ● ●" : "")),
					),
				),
			),
			i({
				type: () => "text",
				value: () => msg(),
				input: async (e) => {
					msg(e.target.value)
					var res = await req("/chat/set_status", {status: "typing"})
					chats(res.chat.msg)
					rec_status(res.rec.status)
					status(res.status)
				},
				key: (e) => (e.key === "Enter" ? form_submit() : ""),
				holder: () => "message...",
				style: () =>
					"mx-[.3rem] mb-[.3rem] h-[2rem] px-[.25rem] py-[.2rem] tc_black bw_1 border-gray-500 focus:bc_black r_1",
			}),
		),
	)
}
