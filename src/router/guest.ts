import Landing from '@/pages/landing.vue'

const Error404 = () => import('../pages/error.vue')
const Login = () => import('../pages/login.vue')
const Contact = () => import('../pages/contact.vue')
const About = () => import('../pages/about.vue')
const ForgotPassword = () => import('../pages/forgot-password.vue')
const ResetPassword = () => import('../pages/reset-password.vue')
const ResetCode = () => import('../pages/reset-code.vue')
const ConfirmEmail = () => import('../pages/confirm-email.vue')
const Register = () => import('../pages/register.vue')

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error404,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: {
      permission: 'guest',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      permission: 'guest',
    },
  },
  {
    path: '/reset-code',
    name: 'reset-code',
    component: ResetCode,
    meta: {
      permission: 'guest',
    },
  },
  {
    path: '/confirm-email/:email',
    name: 'confirm-email',
    component: ConfirmEmail,
    meta: {
      permission: 'guest',
    },
  },
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      permission: 'guest',
      layout: 'AppLayoutDefault',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      permission: 'guest',
      layout: 'AppLayoutDefault',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: {
      permission: 'guest',
      layout: 'AppLayoutDefault',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      permission: 'guest',
      layout: 'AuthLayout',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      permission: 'guest',
      layout: 'AuthLayout',
    },
  },
  {
    path: '/auth/google/callback',
    name: 'googleLogin',
    component: Login,
    meta: {
      permission: 'guest',
      layout: 'AuthLayout',
    },
  },
]

export default routes
