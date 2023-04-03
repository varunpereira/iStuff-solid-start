// @refresh reload
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
	FileRoutes,useNavigate
} from "solid-start"
import "~/config/style.scss"
import def from "~/config/def"
import Navbar from "~/config/navbar"
import Footer from "~/config/footer"
import home from "~/config/home/home"
import sign_in from "~/feat/$/login/sign_in"
import chat from "~/feat/$/pusher/chat"

export default () => {
	return (
		<Html lang="en">
			<Head>
				<Title>Flixter</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Link rel="icon" type="image/x-icon" href="/favicon.gif"></Link>
				{/* <script src="https://js.pusher.com/7.0/pusher.min.js"></script> */}
			</Head>
			<Body class="c_black tc_white ts_1 tf_1">
				<Suspense>
					<ErrorBoundary>
						<Navbar />
						<Routes>
							<Route path="/" component={home} />
							<Route path="/signin" component={sign_in} />
							<Route path="/chat" component={chat} />
							<Route path="*" component={def} />
							<FileRoutes />
						</Routes>
						<Footer />
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}

