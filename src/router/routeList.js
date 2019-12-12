// import Menu from '@/views/menu/menu'
import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'
import InfoInput from '@/views/infoManage/infoInput'

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirectPage/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'infoManage/infoInput',
    hidden: true,
    children: [
      {
        path: 'infoManage/infoInput',
        component: InfoInput,
        name: 'InfoInput',
        meta: {
          title: '信息录入',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    hidden: true,
    name: 'Login'
  }
]

export default routes;
