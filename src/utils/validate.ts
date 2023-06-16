/*
 * @Description: 验证工具
 * @Date: 2023-05-23 11:04:59
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 10:45:44
 * @FilePath: \vite+vue3+ts\src\utils\validate.ts
 */
/**
 * 判断是否为外部资源
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * 获取url中的token
 * @param url 
 * @param paramName 
 * @returns 
 */
export const GetUrlParamValue = (url: string, paramName: string): string | undefined=>{
  if (paramName) {
    const regExp = new RegExp(`${paramName}=(?<${paramName}>[^&]+)&*`)
    const regExpMatchs = url.match(regExp)
    if (regExpMatchs) {
      if (regExpMatchs.groups) {
        const temp = regExpMatchs.groups[paramName]
        if (temp) {
          return temp
        }
      }
    }
  }
  return undefined
}