import {
	title,
	state,
	react,
	mount,
	clean,
	write,
	d,
	t,
	b,
	route,
	v,
	p,
	timer,
	globe
} from "~/fe/config/shop"
import batman_pic from '~/fe/config/asset/batman.jpg'
import {auth} from "~/fe/config/auth"

export default () => {
	var car = state([batman_pic, "/home/2.jpg",])
	var car_index = state(0)
	var car_interv = timer.put(() => {
		car_index((i) => (i + 1) % car().length)
	}, 3000)
	var nav = route()
	var mute = state(true)

	mount(async () => {
		await auth("pub")
	})

	clean(() => {
		timer.cut(car_interv)
	})

	return d(
		{style: () => "fit_2 c_white"},
	title({},()=>"Contact - iStuff")
	)
}
