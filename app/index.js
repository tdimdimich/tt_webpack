import router from './lib/router'


router.rule(['', 'index'] , 'home')
// router.rule('*', 'notfound')

router.push(window.location.pathname)



