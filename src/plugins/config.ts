import { App } from 'vue'
import moment from 'moment'

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupConfig(app: App) {
    app.config.globalProperties.$filters = {
        dateformat(date:string,format : string) {
            if (date) {
                return moment(date).format(format);
            }else{
                return ''
            }
        }
    }
}
