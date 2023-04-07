import {
	state,
	mount,
	react,
	write,
	d,
	clean,
	t,
	b,
	i,
	v,
	view,
	parse,
	route,
	globe,
	db,
} from "~/config/store"
import {search_icon,} from "~/config/asset/icon.jsx"
import axios from "axios"

export default () => {
	var nav = route()
  var form_error = state()
	var form_data = state({search: "",})

	mount(async () => {
	})

  var form_submit = async () => {
		var res = await axios.post("/$/search/api/result", form_data())
		if (res?.data?.error != null) {
			return form_error(res.data.error)
		}
		nav("/")
	}

	react(() => {})

	return d(
		{style: () => "c_white w_full r1 mr-[1rem] z_fit"},
    i({
      type: () => "text",
      value: () => form_data().search,
      input: (e) => form_data({...form_data(), search: e.target.value}),
      holder: () => "search from millions of products...",
      style: () => "tc_black r1 px-[.5rem] w_full h_full o_none",
    }),
   b({click:form_submit}, search_icon({style:()=>'z_put c_white right-[.4rem] top-[.2rem] tc_black w-[1.5rem] h-[1.5rem]'}))
	)
}
