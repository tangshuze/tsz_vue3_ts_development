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