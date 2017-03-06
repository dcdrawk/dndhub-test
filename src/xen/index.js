// import Vue from 'vue'
import XenButton from '@/components/xen-components/Button'
import XenCard from '@/components/xen-components/Card'
import XenCardHeader from '@/components/xen-components/CardHeader'
import XenCardContent from '@/components/xen-components/CardContent'
import XenCardActions from '@/components/xen-components/CardActions'
import XenInput from '@/components/xen-components/Input'
import XenPageToolbar from '@/components/xen-components/PageToolbar'

// Vue.use(XenButton)
export default class Xen {
  static components = [{
    selector: 'xen-button',
    name: XenButton
  }, {
    selector: 'xen-card',
    name: XenCard
  }, {
    selector: 'xen-card-header',
    name: XenCardHeader
  }, {
    selector: 'xen-card-content',
    name: XenCardContent
  }, {
    selector: 'xen-card-actions',
    name: XenCardActions
  }, {
    selector: 'xen-input',
    name: XenInput
  }, {
    selector: 'xen-page-toolbar',
    name: XenPageToolbar
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
