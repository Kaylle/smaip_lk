import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

let manualState = 'no-auth'

if (store.getters.IS_ACTIVE) manualState = 'main'
else manualState = 'no-auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/v-login.vue')
  },
  {
    path: '/bills',
    name: 'Bills',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-bills.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-home.vue')
  },
  {
    path: '/contract',
    name: 'Сontract',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-contract.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-profile.vue')
  },
  {
    path: '/attorney',
    name: 'Attorney',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-attorney.vue')
  },
  {
    path: '/shipments',
    name: 'Shipments',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-shipments.vue')
  },
  {
    path: '/manual',
    name: 'Manual',
    meta: {
      layout: manualState,
      requiresAuth: false
    },
    component: () => import('../views/v-manual.vue')
  },
  {
    path: '/lf',
    name: 'Lf',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-lf.vue')
  },
  {
    path: '/loyalty',
    name: 'Loyalty',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-loyalty.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-about.vue')
  },
  {
    path: '/info',
    name: 'Info',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-info.vue')
  },
  {
    path: '/info-admin',
    name: 'InfoForAdministrators',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-info-admin.vue')
  },
  {
    path: '/discount',
    name: 'Discount',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-discount.vue')
  },
  {
    path: '/receipt',
    name: 'Receipt',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-receipt.vue')
  },
  {
    path: '/return-document',
    name: 'Return',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-return-document.vue')
  },
  {
    path: '/farm_certificate',
    name: 'Farm_certificate',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-farm_certificate.vue')
  },
  {
    path: '/photo',
    name: 'Photo',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-photo.vue')
  },
  {
    path: '/invoice',
    name: 'Invoice',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-invoice.vue')
  },
  {
    path: '/add_contract',
    name: 'Add_contract',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('../views/v-add_contract.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.IS_ACTIVE) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
