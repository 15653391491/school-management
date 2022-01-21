import {createApp} from 'vue'
import App from './App.vue'
import routes from "@/routes";
import {store} from '@/vuex'
import qs from 'qs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.$store = store
app.config.globalProperties.$qs = qs
app.use(routes)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
