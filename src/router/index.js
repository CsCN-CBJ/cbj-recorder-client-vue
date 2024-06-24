import {createRouter, createWebHistory} from 'vue-router';

import home from '@/views/home.vue'
import about from '@/views/about.vue'
import login from '@/views/login.vue'
import ledger from '@/views/ledger.vue'
import time from '@/views/time.vue'

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {path: '/', redirect: '/home'},
            {path: '/home', component: home},
            {path: '/login', component: login},
            {path: '/about', component: about},
            {path: '/ledger', component: ledger},
            {path: '/time', component: time}
        ]
    }
)
export default router;