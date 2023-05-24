import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import zhCn from 'dayjs/locale/zh-cn'
// 统一dayjs配置，防止配置不一致出现异常
dayjs.extend(weekOfYear).locale(zhCn)

export default dayjs
