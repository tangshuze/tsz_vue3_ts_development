/*
 * @Description: 
 * @Date: 2023-05-24 14:30:15
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 14:30:45
 * @FilePath: \vite+vue3+ts\src\utils\file\blobfile.ts
 */
/**
 * 把文件按照二进制进行读取
 * @param file 
 * @returns 
 */
export function readFile(file:File) {
  return new Promise(resolve=>{
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = ev =>{
          resolve(ev.target?.result);
      }
  });
}