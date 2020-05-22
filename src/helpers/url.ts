import {isDate, isPlainObject} from "./utils";

// 特殊字符 url 编码
function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}

// 处理url参数
export function buildURL(url: string, params?: any): string {
    if (!params) return url;
    // 键值对数组
    const parts: string[] = []

    Object.keys(params).forEach((key) => {
        const val = params[key]
        // null 的情况
        if (val === null || typeof val === 'undefined') return;
        // 处理数组
        let values = []

        // foo : [1,2,3]
        if (Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            // 非数组，统一处理成数组
            values = [val]
        }
        // 拼接字符
        values.forEach((val) => {
            // 日期类型
            if (isDate(val)) {
                val = val.toISOString()
            } else if (isPlainObject(val)) {
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })

    let serializedParams = parts.join('&')

    if (serializedParams) {
        const marIndex = url.indexOf('#')
        // 去掉hash
        if (marIndex !== -1) url = url.slice(0, marIndex)
        // 拼接参数
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url;
}
