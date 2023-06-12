import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import ErrorCode from '@/utils/http/error_code'
interface Result {
  code: number,
  success: boolean,
  msg: string
}
interface ResultData<T = any> extends Result {
  data?: T
}
enum RequestEnums {
  TIMEOUT = 5000, // 请求超时 request timeout
  FAIL = 500, // 服务器异常 server error
  LOGINTIMEOUT = 401, // 登录超时 login timeout
  SUCCESS = 200, // 请求成功 request successfully
}

// axios 基础配置
const config = {
  baseURL: import.meta.env.VITE_PROXY_API as string,
  timeout: RequestEnums.TIMEOUT as number, 
  withCredentials: true, 
}

class Request {
  service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 实例化 serice
    this.service = axios.create(config);

    /**
     * 请求拦截器
     * @request -> { 请求拦截器 } -> server
     * 使用时修改对应令牌匹配字段
     */
    this.service.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token') ?? '';
        return {
          ...config,
          headers: {
            'customToken': "customBearer " + token
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    );


    /**
     * 响应拦截器
     * @response -> { 响应拦截器 } -> client
     * 响应体字段应进行更行
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        if (data.code === RequestEnums.LOGINTIMEOUT) {
          // 表示登录过期，需要重定向至登录页面
          ElMessageBox.alert("Session expired", "System info", {
            confirmButtonText: 'Relogin',
            type: 'warning'
          }).then(() => {
            // 或者调用 logout 方法去处理
            localStorage.setItem('token', '');
            location.href = '/'
          })
        }
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          ElMessage.error(data);
          return Promise.reject(data);
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          (ErrorCode as any)[response.status];
        }
        if (!window.navigator.onLine) {
          ElMessage.error("网络连接失败，请检查网络");
          // 可以重定向至404页面
        }
      }

    )
  }

  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

export default new Request(config)