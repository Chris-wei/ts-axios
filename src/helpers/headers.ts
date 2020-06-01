import {deepMerge, isPlainObject} from "./utils";
import {Method} from "../types";

// 格式化头部参数
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) return
    // 将 headers 转行成标准格式
    Object.keys(headers).forEach((name) => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}

// 处理请求头
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')

    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }

    return headers
}


// 解析响应头
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null)
    if (!headers) return parsed

    // 根据换行切分
    headers.split('\r\n').forEach(line => {
        let [key, ...values] = line.split(':')

        key = key.trim().toLowerCase()

        if (!key) return
        const val = values.join(':').trim()
        parsed[key] = val
    })
    return parsed
}

//
export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) return headers

    headers = deepMerge(headers.common, headers[method], headers)

    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

    methodsToDelete.forEach(method => {
        delete headers[method]
    })

    return headers
}
