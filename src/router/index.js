import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Apt from '@/components/Apt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Apt',
      name: 'Apt',
      component: Apt
    }
  ]
})
