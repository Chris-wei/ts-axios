// 请求类型约束
export type Method = 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

// axios config 接口约束
export interface AxiosRequestConfig {
    url?: string
    method?: Method
    headers?: any
    data?: any
    params?: any | 'opt'
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

// 定义返回值类型
export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}


// 定义axios 返回 promise 类型
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

// 定义错误类型
export interface AxiosError {
    isAxiosError: boolean
    message: string
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse
}

// 定义axois接口
export interface Axios {
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义 axios 构造器实例
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
