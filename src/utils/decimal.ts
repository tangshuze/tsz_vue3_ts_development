/*
 * @Description: 高精度数值计算
 * @Date: 2023-05-24 11:15:50
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 11:26:18
 * @FilePath: \vite+vue3+ts\src\utils\decimal.ts
 */

import { Decimal } from 'decimal.js'
let _seed: any = null
class mathUtils {
  // 自动Id
  static uid() {
    _seed = _seed || new Date().valueOf()
    _seed++
    return _seed
  }
  /*
   * 功能：加
   * 参数：a，b
   */
  static add(a: number | undefined, b: number | undefined) {
    if (!a && !b) return 0
    const addAmount = new Decimal(a || 0).add(b || 0).toNumber()
    return addAmount
  }
  /*
   * 功能：减
   * 参数：a，b，
   */
  static sub(a: number | undefined, b: number | undefined) {
    if (!a && !b) return 0
    const subAmount = new Decimal(a || 0).sub(b || 0).toNumber()
    return subAmount
  }
  /*
   * 功能：乘
   * 参数：a；因数
   */
  static mul(a: number | undefined, factor: number | undefined) {
    if (a === 0) return 0
    if (!a || (!factor && typeof factor !== 'number')) return null
    const mulAmount = new Decimal(a || 0).mul(factor || 0).toNumber()
    return mulAmount
  }
  /*
   * 功能：除
   * 参数：a除数；b被除数
   */
  static div(a: number | undefined, b: number | undefined) {
    if (!b) return 0
    const divRate = new Decimal(a || 0).div(b).toNumber()
    return divRate
  }
}
export default mathUtils
