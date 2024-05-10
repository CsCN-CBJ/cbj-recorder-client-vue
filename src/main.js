import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@vant/touch-emulator' // 电脑端模拟

import vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(vant).mount('#app')
