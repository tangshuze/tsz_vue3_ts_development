import { MockMethod } from "vite-plugin-mock"
 
const mock: Array<MockMethod> = [
    {
        // 接口路径
        url: '/api/test',
        // 接口方法
        method: 'get',
        // 返回数据
        response: () => {
            return {
                status: 200,
                message: 'success',
                data: 'mock模拟数据请求成功！'
            }
        }
    }
]
 
export default mock