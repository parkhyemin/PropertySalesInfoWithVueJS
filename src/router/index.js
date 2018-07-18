import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/page/Main'
import AptMain from '@/components/page/AptMain'
import MultiMain from '@/components/page/MultiMain'
import DetachMain from '@/components/page/DetachMain'
import OfficetelMain from '@/components/page/OfficetelMain'
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
      path: '/Multi',
      name: 'MultiMain',
      component: MultiMain
    },
    {
      path: '/Detach',
      name: 'DetachMain',
      component: DetachMain
    },{
      path: '/Officetel',
      name: 'OfficetelMain',
      component: OfficetelMain
    },
    {
      path: '/test',
      name: 'RxJsTest',
      component: RxJsTest
    }
  ]
})
