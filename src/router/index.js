import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home,children:[
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users.vue'),
      },
      {
        path: '/article/add',
        name: 'BlogAdd',
        component: () => import('../views/blog/BlogAdd.vue'),
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../views/user/Role.vue'),
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../views/user/Role.vue'),
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/message/Comments.vue'),
      },
      {
        path: '/setting-menu',
        name: 'setting',
        component: () => import('../views/setting/Setting.vue'),
      },
      {
        path: '/home/index',
        name: 'index',
        component: () => import('../views/index.vue'),
      },
    ] }
    
  ]
})

router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //next() 放行 next('/login') 强行跳转
  if(to.path === '/login') return next()
  //h获取token
  const usernametoken = window.sessionStorage.getItem('username')
  //没有token 强制跳转登录页
  if(!usernametoken) return next('/login')
  next()


  
})

export default router;