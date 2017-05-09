import router from './lib/router'


router.rule(['', 'index'] , 'home')

router.push(window.location.pathname)



