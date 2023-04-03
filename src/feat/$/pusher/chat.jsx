import {state, react, write, mount, env} from "~/config/store"
import Pusher from "pusher-js"
import axios from "axios"

export default ({sender = "def"}) => {
	var chats = state([])
	var msg = state("")

	react(() => {
    var pusher = new Pusher(env.VITE_key, {
      cluster: env.VITE_cluster,
    })
		pusher.subscribe("chat").bind("chat-event", (data) => {
			write("okie")
			chats((prevState) => [...prevState, {sender: data.sender, message: data.message}])
		})
    return () => pusher.unsubscribe("chat");
	})

	var handleSubmit = async (e) => {
		e.preventDefault()
		var res = await axios.post("/$/pusher/api", {message: msg(), sender})
		write(res.data)
		msg("")
	}

	return (
		<>
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
