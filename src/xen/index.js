// import Vue from 'vue'
import XenButton from '@/components/xen-components/Button'
import XenCard from '@/components/xen-components/Card'
import XenCardHeader from '@/components/xen-components/CardHeader'
import XenCardContent from '@/components/xen-components/CardContent'
import XenCardActions from '@/components/xen-components/CardActions'
import XenInput from '@/components/xen-components/Input'
import XenPageToolbar from '@/components/xen-components/PageToolbar'
import XenSidebar from '@/components/xen-components/Sidebar'
import XenList from '@/components/xen-components/List'
import XenListItem from '@/components/xen-components/ListItem'
import XenListItemCustom from '@/components/xen-components/ListItemCustom'
import XenDivider from '@/components/xen-components/Divider'
import XenLoadingSpinner from '@/components/xen-components/LoadingSpinner'
import XenCheckbox from '@/components/xen-components/Checkbox'
import XenSelect from '@/components/xen-components/Select'

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
  }, {
    selector: 'xen-sidebar',
    name: XenSidebar
  }, {
    selector: 'xen-list',
    name: XenList
  }, {
    selector: 'xen-list-item',
    name: XenListItem
  }, {
    selector: 'xen-list-item-custom',
    name: XenListItemCustom
  }, {
    selector: 'xen-divider',
    name: XenDivider
  }, {
    selector: 'xen-loading-spinner',
    name: XenLoadingSpinner
  }, {
    selector: 'xen-checkbox',
    name: XenCheckbox
  }, {
    selector: 'xen-select',
    name: XenSelect
  }]

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
