import request from "@/utils/http/request";

// namespace User {
//   // login
//   export interface LoginForm {
//     userName: string,
//     password: string
//   }

// }
export namespace Test {
  export function test() {
    return request.get(
      '/filmList'
    )
  }
}