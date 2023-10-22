import {createSignal, createEffect, onMount, onCleanup, createResource} from "solid-js"
import {useNavigate, useSearchParams, useParams} from "@solidjs/router"
import {Title} from "solid-start"
import struct from "~/fe/config/struct"

export var state = (def) => {
	var [get, set] = createSignal(def)
	return (put) => (put != null ? set(put) : get())
}

export var globe = state()

export var route = useNavigate

export var nav_full = (link) => (window.location.href = link)

export var react = createEffect

export var effect = createResource

export var write = console.log

export var clean = onCleanup

export var timer = {
	put: (fn, time) => setInterval(fn, time),
	cut: (fn) => clearInterval(fn),
}

export var view = {
	width: () => window.innerWidth,
	height: () => window.innerHeight,
	put_listen: (id, fn) => window.addEventListener(id, fn),
	cut_listen: (id, fn) => () => window.removeEventListener(id, fn),
}

export var path = {
	get: () => window.location.pathname,
	var: useParams,
	par: () => useSearchParams()[0],
}

export var scroll = (id) => document.getElementById(id).scrollIntoView({behavior: "smooth"})

// parse
export var str = JSON.stringify
export var num = Number
export var cookie = (req_cookie) => {
	if (req_cookie == null) return {}
	var cookies = () => parseCookie(req_cookie)
	if (cookies()?.cookie != null) return any(cookies()?.cookie)
}
export var any = JSON.parse // eg bool

// more innate globe
export var math = Math
export var date = Date
export var dir = Array
export var dic = Object

// piece
export var title_set = ({}, value = () => "") => <Title>{value() + struct()?.title()}</Title>

export var auth = async (link) => {
	try {
		var res = await req("/login/auth_get")
		// write(res?.user?.email)
		var path_get = path.get()
		link !== "pub" && path_get !== "/signin" && res?.user?.email?.startsWith("@")
			? nav_full("/signin")
			: ""
		return globe({
			email: !res?.user?.email?.startsWith("@") ? res?.user?.email : null,
			cart_size: res?.cart_size,
		})
	} catch (flaw) {
		write(flaw)
	}
}

export var page = (
	{
		title = () => "",
		mount = async () => "",
		status = () => "priv",
		style = () => "",
		custom = () => "",
	},
	...rest
) => {
	onMount(async () => {
		await auth(status())
		await mount()
	})
	title_set({}, title)
	return (
		<div use:custom class={style()}>
			{...rest}
		</div>
	)
}

// var style = props?.style?.replace(/=/g, '-')
export var d = (
	{mount = async () => "", style = () => "", key = () => "", name = () => "", custom = () => ""},
	...rest
) => {
	onMount(async () => await mount())
	return (
		<div onKeyDown={key} id={name()} use:custom class={style()}>
			{...rest}
		</div>
	)
}

export var t = ({style = () => "", name = () => ""}, ...rest) => (
	<p class={style()} id={name()}>
		{...rest}
	</p>
)

export var b = ({style = () => "", click = () => ""}, ...rest) => (
	<button onClick={click} class={style() + " o_null"} type="button">
		{...rest}
	</button>
)

export var i = ({
	style = () => "",
	type = () => "text",
	value = () => "",
	input = () => "",
	click = () => "",
	holder = () => "",
	key = () => "",
}) => (
	<input
		class={style() + " o_null"}
		type={type()}
		value={value()}
		onInput={input}
		onClick={click}
		onKeyDown={key}
		placeholder={holder()}
	/>
)

export var p = ({
	style = () => "",
	value = () => "",
	def = () => "",
	hover_in = () => "",
	hover_out = () => "",
	click = () => "",
}) => (
	<img
		class={style()}
		src={value()}
		alt={def()}
		onMouseOver={hover_in}
		onMouseLeave={hover_out}
		onClick={click}
	/>
)

export var v = ({
	style = () => "",
	value = () => "",
	def = () => "",
	type = () => "",
	controls = () => false,
	mute = () => true,
	rep = () => false,
	hover_in = () => "",
	hover_out = () => "",
	click = () => "",
}) => (
	<video
		class={style()}
		poster={def()}
		controls={controls()}
		muted={mute()}
		loop={rep()}
		playsinline
		onMouseOver={hover_in}
		onMouseLeave={hover_out}
		onClick={click}>
		<source src={value()} type={type()} />
		Browser doesn't support video tag.
	</video>
)

export var req = async (link = "", value = {}) => {
	var response = await fetch(link, {
		method: "POST",
		body: JSON.stringify(value),
	})
	return response.json()
}

export var env = import.meta.env
