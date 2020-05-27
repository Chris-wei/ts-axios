import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import {parseHeaders} from "../helpers/headers";
import {createError} from "../helpers/error";
// 请求方法
export default function (config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {url, data = null, method = 'get', headers, responseType, timeout, cancelToken} = config;

        // 请求实例
        const request = new XMLHttpRequest()

        // 设置响应头
        if (responseType) request.responseType = responseType

        // 设置超时(默认 0 ， 不超时)
        if (timeout) request.timeout = timeout

        // 设置请求方法
        request.open(method.toUpperCase(), url!, true)

        // 处理请求状态
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) return;

            // 网络错误
            if (request.status === 0) return;

            // 获取响应头
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            // 获取响应数据
            const responseData = responseType !== 'text' ? request.response : request.responseText
            // 构造响应数据
            const response: AxiosResponse = {
                data: responseData,
                headers: responseHeaders,
                status: request.status,
                statusText: request.statusText,
                request: request,
                config
            }
            // 处理不同状态码
            handleResponse(response)
        }

        // 处理错误
        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
        }

        // 超时处理
        request.ontimeout = function handleTimeout() {
            reject(createError(`Timeout of ${timeout} ms exceeded`, config,
                'ECONNABORTED', request))
        }

        // 设置请求头
        Object.keys(headers).forEach((name) => {
            request.setRequestHeader(name, headers[name])
        })

        // 取消发送
        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            }).catch(
                /* istanbul ignore next */
                () => {
                    // do nothing
                }
            )
        }

        // 发送请求
        request.send(data)

        // 处理不同状态码
        function handleResponse(response: AxiosResponse): void {
            // 响应正常
            if (response.status >= 200 && response.status <= 300) resolve(response)
            // 响应异常
            else reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
        }
    })
}
