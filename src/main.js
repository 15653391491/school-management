import {createApp} from 'vue'
import App from './App.vue'
import routes from "@/routes";
import {store} from '@/vuex'
import qs from 'qs'
import utils from './components/elementUtils/lib'
// --- element-plus ---
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// --- utils ---
import iconMixin from "@/components/iconMixin";
import './styles/flax.css'

const app = createApp(App)
app.config.globalProperties.$store = store
app.config.globalProperties.$qs = qs
app.mixin(iconMixin)
app.mixin(utils)
app.use(ElementPlus)
app.use(routes)
app.use(store)

// app.use(ElementPlus)
app.mount('#app')
