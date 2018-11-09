import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import watermark from '@/pages/watermark'
import abouts from '@/pages/abouts'
import others from '@/pages/others'
import box from '@/pages/box'
import abox from '@/pages/abox'
import bbox from '@/pages/bbox'
import uploads from '@/pages/uploads'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/watermark',
      name: 'watermark',
      component: watermark
    },

    {
      path: '/abouts',
      name: 'abouts',
      component: abouts
    },
    {
      path: '/others',
      name: 'others',
      component: others
    },
    {
      path: '/uploads',
      name: 'uploads',
      component: uploads
    },
    {
      path: '/box',
      name: 'box',
      component:box,
      children:[
        {
          path:'/box',
          component:box,
        },
        {
          path:'/box/abox',
          component:abox,
        },
      {
        path:'/box/bbox',
        name:"bbox",
        component:bbox,
      }
    ]
    //children这是嵌套的部分
    }

  ]
})
