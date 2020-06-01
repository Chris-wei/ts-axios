import {isDate, isPlainObject, isURLSearchParams} from "./utils";

interface URLOrigin {
    protocol: string
    host: string
}

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
export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
    if (!params) return url;
    let serializedParams

    if (paramsSerializer) serializedParams = paramsSerializer(params)
    else if (isURLSearchParams(params)) {
        serializedParams = params.toString()
    } else {
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

        serializedParams = parts.join('&')
    }

    if (serializedParams) {
        const marIndex = url.indexOf('#')
        // 去掉hash
        if (marIndex !== -1) url = url.slice(0, marIndex)
        // 拼接参数
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url;
}

// 判断是否同源
export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURL(requestURL)
    return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

// 根据a标签的方式
function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const {protocol, host} = urlParsingNode
    return {
        protocol,
        host
    }
}

// 判断url是否是绝对地址
export function isAbsoluteURL(url: string): boolean {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

// 合并url
export function combineURL(baseURL: string, relativeURL?: string): string {
    return relativeURL ? (baseURL.replace(/\/+$/, '') +
        '/' + relativeURL.replace(/^\/+/, '')) : baseURL
}
