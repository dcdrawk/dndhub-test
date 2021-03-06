import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

// Auth Pages
import SignIn from '@/components/pages/auth/SignIn'
import SignUp from '@/components/pages/auth/SignUp'
import Profile from '@/components/pages/auth/Profile'

// Character Pages
import CharacterList from '@/components/pages/characters/CharacterList'
import NewCharacter from '@/components/pages/characters/NewCharacter'

// Pages
import General from '@/components/pages/general/General'
import Class from '@/components/pages/class/Class'
import Stats from '@/components/pages/stats/Stats'
import Feats from '@/components/pages/feats/Feats'
import Weapons from '@/components/pages/weapons/Weapons'
import Armor from '@/components/pages/armor/Armor'
import Spells from '@/components/pages/spells/Spells'

import Groups from '@/components/pages/groups/Groups'
import Group from '@/components/pages/group/Group'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'SignIn',
    component: SignIn
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
  }, {
    path: '/characters/list',
    name: 'CharacterList',
    component: CharacterList
  }, {
    path: '/characters/new',
    name: 'NewCharacter',
    component: NewCharacter
  }, {
    path: '/general',
    name: 'General',
    component: General
  }, {
    path: '/class',
    name: 'Class',
    component: Class
  }, {
    path: '/stats',
    name: 'Stats',
    component: Stats
  }, {
    path: '/feats',
    name: 'Feats',
    component: Feats
  }, {
    path: '/weapons',
    name: 'Weapons',
    component: Weapons
  }, {
    path: '/armor',
    name: 'Armor',
    component: Armor
  }, {
    path: '/spells',
    name: 'Spells',
    component: Spells
  }, {
    path: '/groups',
    name: 'Groups',
    component: Groups
  }, {
    path: '/group',
    name: 'Group',
    component: Group
  }]
})
