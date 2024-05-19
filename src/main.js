import {createApp} from 'vue'
import VueCookies from "vue-cookies";
import App from './App.vue'
import router from './router'
import '@vant/touch-emulator' // 电脑端模拟

import vant from 'vant';
import 'vant/lib/index.css';
import globalUtils from './globalUtils.js'

const app = createApp(App)
    .use(router)
    .use(vant)
    .use(VueCookies)

app.mixin({
    methods: {
        ...globalUtils
    }
})
app.mount('#app')
