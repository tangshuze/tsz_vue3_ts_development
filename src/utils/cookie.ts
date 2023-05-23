import Cookies from 'js-cookie'

export const cookiesStorage = {
  setItem(key: string, state: any) {
    return Cookies.set(key, state.accessToken, { expires: 3 }) // 设置有效期 3 天，不设置默认同 sessionStorage 有效期一致
  },
  getItem(key: string) {
    return JSON.stringify({
      accessToken: Cookies.get(key),
    })
  },
}