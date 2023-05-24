/*
 * @Description: 
 * @Date: 2023-05-24 16:28:56
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 17:25:13
 * @FilePath: \vite+vue3+ts\mockjs\index.ts
 */
import Mock from "mockjs";
import { MockParams } from "./typing";
import apis1 from "./module/api1";
import apis2 from "./module/api2";
const mocks = [...apis1, ...apis2];
//设置延时时间
Mock.setup({
    timeout: "300",
})
 
export function mockXHR() {
    let i: MockParams;
    for (i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || "get", i.response);
    }
}