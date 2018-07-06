import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AptMain from '@/components/apt/AptMain'
import RxJsTest from '@/components/test/RxJsTest'

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
      name: 'AptMain',
      component: AptMain
    },
    {
      path: '/test',
      name: 'RxJsTest',
      component: RxJsTest
    }
  ]
})
