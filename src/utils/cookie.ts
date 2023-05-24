/*
 * @Description: 
 * @Date: 2023-05-23 10:35:43
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 17:44:00
 * @FilePath: \vite+vue3+ts\src\utils\cookie.ts
 */
import Cookies from 'js-cookie'

export const cookiesStorage = {
  set(key: string, state: any,expires:number=3) {
    return Cookies.set(key, state.accessToken, { expires }) // 设置有效期 3 天，不设置默认同 sessionStorage 有效期一致
  },
  get(key: string) {
    return JSON.stringify({
      accessToken: Cookies.get(key),
    })
  },
}