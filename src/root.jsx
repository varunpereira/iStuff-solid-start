// @refresh reload
import {
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
	FileRoutes,
	useNavigate,
} from "solid-start"
import struct from "~/fe/config/struct"
import '~/fe/config/style.scss'

export default () => (
	<Html lang="en">
		<Head>
			<Title>{struct?.title()}</Title>
			<Meta charset="utf-8" />
			<Meta name="viewport" content="width=device-width, initial-scale=1" />
			<Link rel="icon" type="image/x-icon" href={struct.logo}></Link>
		</Head>
		<Body class={struct?.style()}>
			<Suspense>
				<ErrorBoundary>
					<Routes>
						{struct?.page()?.map((route) => (
							<Route path={route[0]} component={route[1]} />
						))}
					</Routes>
					{struct?.header()}
					<FileRoutes/>
					{struct?.footer()}
				</ErrorBoundary>
			</Suspense>
			<Scripts />
		</Body>
	</Html>
)