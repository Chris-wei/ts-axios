import {isPlainObject} from "./utils";

// 处理请求body数据
export function transformRequest(data: any): any {
    if (isPlainObject(data)) return JSON.stringify(data)
    return data
}

// 处理响应data
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch (e) {
            // do something
        }
    }
    return data
}
