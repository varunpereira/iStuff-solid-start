import {state, react, write, mount, env, d, title, req} from "~/fe/config/shop"
import Pusher from "pusher-js"
import {auth} from "~/fe/config/auth"

export default () => {
	var chats = state([])
	var msg = state("")
	var sender = "def"

	mount(async () => {
		await auth("pub")
	})

	react(() => {
		var pusher = new Pusher(env.VITE_key, {
			cluster: env.VITE_cluster,
		})
		pusher.subscribe("chat").bind("event_1", (data) => {
			write("okie")
			chats((prevState) => [...prevState, {sender: data.sender, message: data.message}])
		})
		return () => pusher.unsubscribe("chat")
	})

	var handleSubmit = async (e) => {
		e.preventDefault()
		var res = await req("/chat/pusher", {message: msg(), sender})
		write(res)
		msg("")
	}

	return (
		<>
			{title({}, () => "Chat - iStuff")}
			<p>Hello, {sender}</p>
			<div class="bg-red-800">
				chats:
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
					}}
					placeholder="start typing...."
					class="tc_black"
				/>
				<button type="submit">Send</button>
			</form>
		</>
	)
}
