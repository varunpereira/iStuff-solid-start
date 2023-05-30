import {
	createSignal,
	createEffect,
	onMount,
	onCleanup,
	createResource,
	lazy,
	Suspense,
} from "solid-js"
import {Router, Routes, Route, useNavigate, useSearchParams, useParams} from "@solidjs/router"
import {Title} from 'solid-start'
import {title_def} from "~/fe/config/struct"

export var state = (def) => {
	var [get, set] = createSignal(def)
	return (put) => (put != null ? set(put) : get())
}

export var globe = state()

export var route = useNavigate

export var nav_full = (link) => (window.location.href = link)

export var title = ({}, value = () => "") => <Title>{value() + title_def()}</Title>

export var react = createEffect

export var effect = createResource

export var write = console.log

export var mount = onMount

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
export var list = Array
export var dict = Object

// piece

// var style = props?.style?.replace(/=/g, '-')
export var d = ({style = () => "", custom = () => ""}, ...rest) => (
	<div use:custom class={style()}>
		{...rest}
	</div>
)

export var t = ({style = () => ""}, ...rest) => <p class={style()}>{...rest}</p>

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

export var p = ({style = () => "", value = () => "", def = () => ""}) => (
	<img class={style()} src={value()} alt={def()} />
)

export var v = ({
	style = () => "",
	value = () => "",
	def = () => "",
	type = () => "",
	controls = () => false,
	mute = () => true,
	hover_in = () => "",
	hover_out = () => "",
	click = () => "",
}) => (
	<video
		class={style()}
		poster={def()}
		controls={controls()}
		muted={mute()}
		playsinline
		onMouseOver={hover_in}
		onMouseLeave={hover_out}
		onClick={click}>
		<source src={value()} type={type()} />
		Browser doesn't not support video tag.
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
