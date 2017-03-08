import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SignIn from '@/components/pages/auth/SignIn'
import SignUp from '@/components/pages/auth/SignUp'
import Profile from '@/components/pages/auth/Profile'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  }, {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }]
})
