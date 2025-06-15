import {createRouter,createWebHistory} from 'vue-router'
import Home from "../view/Home.vue";
import Login from "../view/Login.vue";
import Register from "../view/Register.vue";
import Blog from "../view/Blog.vue";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import User from "../view/User.vue";
import HelloView from "../view/HelloView.vue";
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path:'/login',
        name:'Login',
        component:Login,
    },
    {
        path:'/home',
        name:'Home',
        component:Home,
        meta: {requiresAuth: true},
    },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/blog/:id',
        name:'Blog',
        component: Blog,
        meta: {requiresAuth: true}
    },
    {
        path:'/user/:id',
        name:'User',
        component:User,
        meta: {requiresAuth: true}
    },
    {
        path: '/hello',
        name: 'Hello',
        component: HelloView
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token){
        alert('没有登录,请先登录');
        console.log('未检测到令牌，跳转登录');
        return next('/login');
    }
    console.log('切换页面');
    next();
})
router.afterEach((to, from, next) => {
    NProgress.done();
})

export default router;