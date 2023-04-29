import {
	createSignal,
	createEffect,
	onMount,
	onCleanup,
	createResource,
	lazy,
	Suspense,
} from "solid-js"
import {
	Body,
	ErrorBoundary,
	Head,
	Html,
	Meta,
	Routes,
	Route,
	Scripts,
	Title,
	Link,
	useNavigate,
} from "solid-start"
import "~/config/style.scss"
import {redirect} from "solid-start/server"

// generic

export var state = (def) => {
	var [get, set] = createSignal(def)
	return (put) => (put != null ? set(put) : get())
}

export var globe = state()

export var route = useNavigate

export var route2 = (route) => {
	var nav = useNavigate
	return nav(route)
}

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
}) => (
	<input
		class={style()}
		type={type()}
		value={value()}
		onInput={input}
		onClick={click}
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

export var title = ({}, value = () => "") => <Title>{value()}</Title>

export var struct = ({
	title = () => "",
	style = () => "",
	header = () => "",
	logo = () => "",
	footer = () => "",
	page = () => "",
}) => (
	<Html lang="en">
		<Head>
			<Title>{title() + " "}</Title>
			<Meta charset="utf-8" />
			<Meta name="viewport" content="width=device-width, initial-scale=1" />
			<Link rel="icon" type="image/x-icon" href={logo}></Link>
		</Head>
		<Body class={style()}>
			<Suspense>
				<ErrorBoundary>
					{header()}
					<Routes>
						{page().map((route) => (
							<Route path={route[0]} component={route[1]} />
						))}
					</Routes>
					{footer()}
				</ErrorBoundary>
			</Suspense>
			<Scripts />
		</Body>
	</Html>
)

export var req = async (link = "", value = {}) => {
	var response = await fetch(link, {
		method: "POST",
		body: JSON.stringify(value),
	})
	return response.json()
}

//  server

export var env = import.meta.env

export var res = (body = {}, head = null) =>
	new Response(
		JSON.stringify(body),
		head != null
			? {
					headers: {
						"Set-Cookie": `cookie=${JSON.stringify(
							head?.cookie?.value,
						)}; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=${head?.cookie?.age}; Domain=${
							process.env.NODE_ENV === "production2" ? env.VITE_domain : ""
						}`,
					},
			  }
			: {},
	)

export var nav = redirect
