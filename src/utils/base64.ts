/*
 * @Description: 
 * @Date: 2023-05-24 11:51:52
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 11:51:57
 * @FilePath: \vite+vue3+ts\src\utils\base64.ts
 */
/*
支持Unicode字符串转码
*/

export function base64Encode(str: string) {
  return window.btoa(window.encodeURIComponent(str))
}

export function decodeBase64(str: string) {
  return window.decodeURIComponent(window.atob(str))
}
