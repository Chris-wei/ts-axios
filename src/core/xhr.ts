import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import {parseHeaders} from "../helpers/headers";
import {createError} from "../helpers/error";
import {isURLSameOrigin} from "../helpers/url";
import cookie from "../helpers/cookie";
import {isFormData} from "../helpers/utils";

// 请求方法
export default function (config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            url, data = null, method = 'get', headers, responseType,
            timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName,
            auth, onDownloadProgress, onUploadProgress, validateStatus
        } = config;

        // 请求实例
        const request = new XMLHttpRequest()
        // 设置请求方法
        request.open(method.toUpperCase(), url!, true)

        configRequest()

        addRequestEvent()

        processHeaders()

        processCancel()

        // 发送请求
        request.send(data)

        // 配置请求
        function configRequest(): void {
            // 设置响应头
            if (responseType) request.responseType = responseType

            // 设置超时(默认 0 ， 不超时)
            if (timeout) request.timeout = timeout

            // 跨域
            if (withCredentials) request.withCredentials = withCredentials
        }

        // 添加事件
        function addRequestEvent(): void {

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

            // 下载进度
            if (onDownloadProgress) request.onprogress = onDownloadProgress

            // 上传进度
            if (onUploadProgress) request.upload.onprogress = onUploadProgress

            // 处理错误
            request.onerror = function handleError() {
                reject(createError('Network Error', config, null, request))
            }

            // 超时处理
            request.ontimeout = function handleTimeout() {
                reject(createError(`Timeout of ${timeout} ms exceeded`, config,
                    'ECONNABORTED', request))
            }
        }

        // 处理headers
        function processHeaders(): void {

            // 如果是formData类型，删除content-type
            if (isFormData(data)) delete headers['Content-Type']

            // xsrf
            if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
                const xsrfValue = cookie.read(xsrfCookieName)
                // 设置 xsrf 的值
                if (xsrfValue && xsrfHeaderName) headers[xsrfHeaderName] = xsrfValue
            }

            // 授权
            if (auth) headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)

            // 设置请求头
            Object.keys(headers).forEach((name) => {
                request.setRequestHeader(name, headers[name])
            })
        }

        // 处理取消
        function processCancel(): void {
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
        }

        // 处理不同状态码
        function handleResponse(response: AxiosResponse): void {
            // 响应正常
            if (!validateStatus || validateStatus(response.status)) resolve(response)
            // 响应异常
            else reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
        }
    })
}
