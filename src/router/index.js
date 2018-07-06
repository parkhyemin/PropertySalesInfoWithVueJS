import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Apt from '@/components/Apt'
import RxJsTest from '@/components/RxJsTest'

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
    },
    {
      path: '/test',
      name: 'RxJsTest',
      component: RxJsTest
    }
  ]
})
