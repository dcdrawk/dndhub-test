// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import
import Xen from './xen'

// Vue validation
// https://github.com/logaretm/vee-validate
import VeeValidate from 'vee-validate'
import FirebaseSetup from './firebase'

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'en',
  messages: null,
  strict: true
}

Vue.use(VeeValidate, config)

Vue.config.productionTip = false
Xen.register(Vue)

FirebaseSetup.init()
console.dir(Vue)

// Set up an event bus
var bus = new Vue({})
Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return bus
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
