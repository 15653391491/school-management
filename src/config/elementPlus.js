import lang from 'element-plus/lib/locale/lang/zh-cn'
import {use as localeUse} from 'element-plus/lib/locale'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default (app) => {
    app.use(ElementPlus)
    localeUse(lang)
}