import {state, react, write, mount, env, d, title, req} from "~/fe/config/shop"
import Pusher from "pusher-js"
import {auth} from "~/fe/config/auth"

export default () => {
	var chats = state([])
	var msg = state("")
	var status = state("")
	var sender = "def"

	mount(async () => {
		await auth("pub")
	})

	react(() => {
		var pusher = new Pusher(env.VITE_key, {
			cluster: env.VITE_cluster,
		})
		pusher.subscribe("chat").bind("event_1", (data) => {
			msg().trim() !== "" ? status("typing") : status("")
			write("ok")
			chats((prevState) => [...prevState, {sender: data.sender, message: data.message}])
		})
		return () => pusher.unsubscribe("chat")
	})

	var handleSubmit = async () => {
		var res = await req("/chat/pusher", {message: msg(), sender})
		write(res)
		msg("")
		status("")
	}

	return (
		<>
			{title({}, () => "Chat - iStuff")}
			<p>Hello, {sender}</p>
			<div class="bg-red-800">
				chats: {status()}
				{chats().map((chat, id) => (
					<>
						<p>{chat.message}</p>
						<small>{chat.sender}</small>
					</>
				))}
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={msg()}
					onInput={(e) => {
						e.preventDefault()
						msg(e.target.value)
						msg().trim() !== "" ? status("typing") : status("")
					}}
					placeholder="start typing...."
					class="tc_black"
				/>
				<button type="submit">Send</button>
			</form>
		</>
	)
}
