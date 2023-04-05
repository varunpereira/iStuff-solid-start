import {createSignal, createEffect, onMount, onCleanup, createResource} from "solid-js"
import server$ from "solid-start/server"
import {parseCookie, useServerContext} from "solid-start"
import {to} from "~/config/struct"
import mongoose from "mongoose"
import {isServer} from "solid-js/web"
import axios from "axios"
import user_model from "~/config/db/model/user"
import {Suspense} from "solid-js"
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
	FileRoutes,
	useNavigate,
} from "solid-start"
import "~/config/style.scss"
import favicon from "~/config/asset/favicon.gif"
import {lazy} from "solid-js"

// generic

export var state = (init) => {
	const [value, setValue] = createSignal(init)
	return (newValue) => {
		if (newValue != null) setValue(newValue)
		else return value()
	}
}

// globe state
export var globe = state({email: null})

export var auth = async (link) => {
	var auth = await axios.post("/$/login/api/auth_get")
	if (auth.data?.ok === true) {
		globe({email: auth.data?.user?.email})
		return
	}
	globe({email: null})
	link !== "pub" && window.location.pathname !== "/signin" ? (window.location.href = "/signin") : ""
}

export var route2 = (route) => {
	var nav = useNavigate
	return nav(route)
}

export var route = useNavigate

export var react = (init) => {
	return createEffect(init)
}

export var effect = (state, fn) => {
	return createResource(state, fn)
}

export var write = (props) => {
	console.log(props)
}

export var mount = onMount

export var clean = onCleanup

export var timer = () => {
	return {
		put: (fn, time) => setInterval(fn, time),
		cut: (vari) => clearInterval(vari),
	}
}

export var view = () => {
	return {
		width: () => window.innerWidth,
		height: () => window.innerHeight,
		put_listen: (id, fn) => window.addEventListener(id, fn),
		cut_listen: (id, fn) => () => window.removeEventListener(id, fn),
	}
}

export var parse = () => {
	return {
		event: (e) => {
			return {value: e.target.value, key: e.key}
		},
		str: (props) => JSON.stringify(props),
		dict: (props) => JSON.parse(props),
	}
}

export var math = Math
export var date = Date
export var str = String
export var num = Number
export var list = Array
export var dict = Object
// export var json = JSON

// pieces

// // var style = props?.style?.replace(/=/g, '-')
export var d = (fn, ...rest) => {
	return <div class={fn().style}>{...rest}</div>
}

export var t = ({style = () => ""}, ...rest) => {
	return <p class={style()}>{...rest}</p>
}

export var b = ({style = () => "", click = () => ""}, ...rest) => {
	return (
		<button onClick={click} class={style()} type="button">
			{...rest}
		</button>
	)
}

export var i = ({
	style = () => "",
	type = () => "text",
	value = () => "",
	input = () => "",
	holder = () => "",
}) => {
	return (
		<input class={style()} type={type()} value={value()} onInput={input} placeholder={holder()} />
	)
}

export var p = ({style = () => "", value = () => "", def = () => ""}) => {
	return <img class={style} src={value} alt={def} />
}

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
}) => {
	return (
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
}

export var title = ({}, ...rest) => {
	return <Title>{...rest}</Title>
}

export var struct = ({
	title = () => "",
	style = () => "",
	header = () => "",
	footer = () => "",
	def = () => "",
	route = () => "",
}) => {
	return (
		<Html lang="en">
			<Head>
				<Title>{title()}</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Link rel="icon" type="image/x-icon" href={favicon}></Link>
			</Head>
			<Body class={style()}>
				<Suspense>
					<ErrorBoundary>
						{header()}
						<Routes>
							{route().map((route) => (
								<Route path={route[0]} component={route[1]} />
							))}
							<Route path="*" component={def} />
							<FileRoutes />
						</Routes>
						{footer()}
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}

//  server

export var env = import.meta.env

// export var db = () =>
// 	mongoose.connections[0].readyState
// 		? () => write("mongodb already connected.")
// 		: mongoose.connect(env.VITE_db).then(() => write("mongodb connected."))

export var db = () => {
	if (mongoose.connections && mongoose?.connections[0]?.readyState) {
		write("mongodb already connected.")
	} else {
		mongoose?.connect(env.VITE_db).then(() => {
			write("mongodb connected.")
		})
	}
}

export var res = (body = {}, head = null) => {
	return new Response(
		JSON.stringify(body),
		head != null
			? {
					headers: {
						"Set-Cookie": `cookie=${JSON.stringify(
							head?.cookie?.data,
						)}; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=${JSON.stringify(
							head?.cookie?.age,
						)}; Domain=${process.env.NODE_ENV === "!production" ? env.VITE_domain : ""}`,
					},
			  }
			: {},
	)
}