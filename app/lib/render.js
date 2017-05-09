import Header from '../layout/header'

const render = (Page) => {
	document.title = Page.title
	document.getElementById('app').innerHTML = `
		${Header}
		<h1>${Page.title}</h1>
		${Page.render()}
	`
}
	

export default render;
