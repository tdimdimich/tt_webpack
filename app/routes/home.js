import moment from 'moment'
// import lodash from 'lodash'

const build_time = moment().format() //'DD MM YYYY'// moment.format()
const calctime = () => moment(build_time).fromNow()

const HomePage = {
	title: 'Home',
	render: () => {
		return `
			<p>This is home page</p>
			<p>Page loaded: ${calctime()}<p/>
		`
	}
}

export default HomePage






