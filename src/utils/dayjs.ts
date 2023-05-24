/*
 * @Description: dayjs的二次封装
 * @Date: 2023-05-24 10:16:33
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 14:47:35
 * @FilePath: \vite+vue3+ts\src\utils\dayjs.ts
 */
import Dayjs from "@/dayjs"


class DayUtils {
  /**
 * @param v string | number | Date | Dayjs.Dayjs | null | undefined
 * @param format format template
 * @returns dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
 */

  static forMateTime = (v: Dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => Dayjs(v).format(format)


  /**
   * 昨日
   * @returns 
   */
  static lastDay = () => Dayjs().subtract(1, 'day').format('YYYY-MM-DD')


  /**
   * 今日
   */
  static today = () => {
    return Dayjs().format('YYYY-MM-DD')
  }

  /**
   * 明日
   **/
  static tomorrow = () => Dayjs().add(1, 'day').format('YYYY-MM-DD')

  /**
   * 时间m是否在n之前
   * @return {boolean}
   */
  static isBefore = (m = Dayjs(), n = Dayjs()) => { return Dayjs(m).isBefore(Dayjs(n)) }

  /**
   * 时间m是否在n之后
   * @return {boolean}
   */
  static isAfter = (m = Dayjs(), n = Dayjs()) => { return Dayjs(m).isAfter(Dayjs(n)) }

  /**
   * 时间m是否在同一天
   * @return {boolean}
   */
  static isSame = (m = Dayjs(), n = Dayjs()) => { return Dayjs(m).isSame(Dayjs(n)) }
}
export default DayUtils;