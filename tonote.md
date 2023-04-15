clean() : infinite resources like timer, listener .
everything in feat/ must have a child file starting with $ .
mount is after mounted, before render.
for eg ages()[0], fine in script, but not show, fine since use inside map()
spacing : mx-[0.5rem] , pt-[2rem] , rem is responsive not px
mar (outer) , pad (inner) , bor (edge)
responsiveness : flex + justify-start (x/t+b) + items-center (y/l+r)
layering/positioning : absolute > rel > rel
entry-server.jsx is middleware.
show: ifs ?,:,: . loop: map((elem,index)=>d())
global state in config/state.jsx
struct.jsx: filreoutes after route tag, usenavigate export it to sore.jsx, then use elsewhere
// domain: env.domain, // prod: only this domain
			path: '/', // only starts with
			expires: 1, // Expires in 7 days
			secure: true, // only HTTPS
			sameSite: 'strict', // only first party, not third
			// httpOnly: true, // only server
safe:
sign in server gives you an encrypted random token on every req.
client will store token as a cookie.
using cloud platform like aws is easier + cheaper for (pay,auth+sso,live/notif.,analytics,file storage, db, hosting, email etc,), so current services are temp.
style.scss: 
// @apply tc_white2;
effect/createreource is for detect specific state changes, async, server only?
compression and buffer for assets 
not sure why showing wrong, error line prob code issue.
video dont play mobile, slalom.com dont either.
deploy verce edge, some packs have issues like jsonwebtoken, mongoose, mongodb
prender dont work for form, ssr doesnt work coz solid requires more steps too complex
mw = pass, then to endpoint where can return Res but cant access event.
you can make up endpoints and detect here first eg axios.post('/random')
// for server$() : var json = axios.post('/_m/src/config/home.jsx/0/load', 'only mw gets event')
// if you want event, create api in ~/routes/
get : ui, post : api
route like import state, note dk why but call does work in mount only
polling bad since set timer to 1s all the time. mongodb change streams wont work coz vercel, instead use a specific websocket, most dont on vercel.
pusher is good 100 concur + 200k per day.
no; mongodb cloud stream works although 4 sec vs norm 1 sec on vercel.
they also do file storage (16mb max file) with mongodb gridfs .
if you change live() then close + open server again to see mods.
npm vercel, us clie to build locally same but quicker than cloud!
can also deploy (vercel build, vercel [for deploy])
every piece thats a page, needs a title else error.
api can either be fine or fail/flaw