import render from './render'


const pages = {}

export const rule = (location, page) => {
	if (Array.isArray(location)) {
		location.forEach((item) => {
			pages[`${item}`] = page
		})
	} else {
		pages[`${location}`] = page
	}
}


export const push = (location) => {
	const path = location.substring(1)
	const page = pages[path] || path
	console.log(`move: /${path}`)
	window.history.pushState({}, page, `/${path}`)
	System.import(`../routes/${page}.js`).then((module) => {
		render(module.default)
	}).catch((err) => {
		System.import(`../routes/notfound.js`).then((module) => {
			render(module.default)
		})
	})
	
}

window.push = push

export default {rule, push}

