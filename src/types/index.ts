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
    baseURL?:string
    url?: string
    method?: Method
    headers?: any
    data?: any
    params?: any | 'opt'
    responseType?: XMLHttpRequestResponseType
    timeout?: number
    transformRequest?: AxiosTransformer | AxiosTransformer[]
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    cancelToken?: CancelToken
    withCredentials?: boolean
    xsrfCookieName?: string
    xsrfHeaderName?: string
    auth?: AxiosBasicCredentials
    validateStatus?: (status: number) => boolean
    onDownloadProgress?: (e: ProgressEvent) => void
    onUploadProgress?: (e: ProgressEvent) => void
    paramsSerializer?: (params?: any) => string

    [prop: string]: any
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

    defaults: AxiosRequestConfig

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse>
    }

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    getUri(config?: AxiosRequestConfig): string
}

// 定义 axios 构造器实例
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosClassStatic {
    new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance

    CancelToken: CancelTokenStatic
    Cancel: CancelStatic
    isCancel: (value: any) => boolean

    all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

    spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

    Axios: AxiosClassStatic
}

// 拦截器 接口
export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, reject?: RejectedFn): number

    eject(id: number): void
}

export interface ResolvedFn<T> {
    (val: T): T | Promise<T>
}

export interface RejectedFn {
    (error: any): any
}


// 转换类型
export interface AxiosTransformer {
    (data: any, headers?: any): any
}

// 取消
export interface CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel

    throwIfRequested(): void
}

// 取消方法
export interface Canceler {
    (message?: string): void
}

export interface CancelExecutor {
    (cancel: Canceler): void
}

export interface CancelTokenSource {
    token: CancelToken
    cancel: Canceler
}

export interface CancelTokenStatic {
    new(executor: CancelExecutor): CancelToken

    source(): CancelTokenSource
}


export interface Cancel {
    message?: string
}

export interface CancelStatic {
    new(message?: string): Cancel
}

// 授权
export interface AxiosBasicCredentials {
    username: string
    password: string
}
