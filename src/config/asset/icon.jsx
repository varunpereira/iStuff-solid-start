var def_style = ""

export var shop_icon = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3.41,7.23H20.59a0,0,0,0,1,0,0v12a3.23,3.23,0,0,1-3.23,3.23H6.64a3.23,3.23,0,0,1-3.23-3.23v-12A0,0,0,0,1,3.41,7.23Z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M8.18,10.09V5.32A3.82,3.82,0,0,1,12,1.5h0a3.82,3.82,0,0,1,3.82,3.82v4.77"
		/>
	</svg>
	// <svg
	// 	xmlns="http://www.w3.org/2000/svg"
	// 	viewBox="0 0 24 24"
	// 	stroke-width="1.5"
	// 	stroke="currentColor"
	// 	class={def_style + ' ' + style }>
	// 	<path
	// 		stroke-linecap="round"
	// 		stroke-linejoin="round"
	// 		d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
	// 	/>
	// </svg>
)

export var menu = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
		/>
	</svg>
)
export var fav = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
		/>
	</svg>
)
export var user = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
		/>
	</svg>
)
export var down = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
	</svg>
)
export var sign_in = (style = () => "") => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={def_style + " " + style()}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
		/>
	</svg>
)
