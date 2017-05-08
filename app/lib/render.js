

const render = (Page) => {
	System.import('../layout/header').then((module) => {
		const Header = module.default
		document.title = Page.title
		document.getElementById('app').innerHTML = `
			${Header}
			<h1>${Page.title}</h1>
			<p>${Page.message}</p>
		`
	})
}
	

export default render;
