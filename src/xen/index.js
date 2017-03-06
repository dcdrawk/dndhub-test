// import Vue from 'vue'
import XenButton from '@/components/xen-components/Button'
import XenCard from '@/components/xen-components/Card'
import XenInput from '@/components/xen-components/Input'

// Vue.use(XenButton)
export default class Xen {
  static components = [{
    selector: 'xen-button',
    name: XenButton
  }, {
    selector: 'xen-card',
    name: XenCard
  }, {
    selector: 'xen-input',
    name: XenInput
  }]

  static test = 'Testing 123'

  static register (Vue) {
    // console.log('register Xen Components')
    // Vue.component('xen-button', XenButton)
    // Vue.component('xen-button', XenButton)
    // console.dir(Vue)
    // return Vue

    this.components.forEach(component => {
      Vue.component(component.selector, component.name)
    })
  }
}
