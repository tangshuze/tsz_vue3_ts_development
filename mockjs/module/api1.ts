/*
 * @Description: 
 * @Date: 2023-05-24 16:29:34
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 16:35:17
 * @FilePath: \vite+vue3+ts\mock\module\api1.ts
 */
/*
 * @Description: 
 * @Date: 2023-05-24 16:29:34
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 16:29:46
 * @FilePath: \vite+vue3+ts\mock\module\api1.ts
 */
import Mock from "mockjs";
export default [
  // GetUserInfo
  {
    url: "/upms/user/info",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          name: "testName",
        },
      };
    },
  },
  // GetToken
  {
    url: "/auth/oauth/token",
    type: "post",
    response: (option: any) => {
      return Mock.mock({
        code: 200,
        message: "成功",
        data: {
          name: "testToken",
        },
      });
    },
  },
];