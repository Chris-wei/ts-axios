import {AxiosRequestConfig, AxiosResponse} from "../types";

// 错误类
export class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse

    /* istanbul ignore next */
    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse
    ) {
        super(message)
        // 初始化
        this.isAxiosError = true
        this.config = config
        this.code = code
        this.request = request
        this.response = response

        // ts bug
        Object.setPrototypeOf(this, AxiosError.prototype)
    }

}

// 创建 Axios 实例
export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
): AxiosError {
    return new AxiosError(message, config, code, request, response)
}
