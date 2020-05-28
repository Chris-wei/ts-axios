import {AxiosRequestConfig} from "./types";
import {processHeaders} from "./helpers/headers";
import {transformRequest, transformResponse} from "./helpers/data";
// 默认配置
const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json,text/plain,*/*'
        }
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    transformRequest: [function (data: any, headers?: any): any {
        processHeaders(headers, data)
        return transformRequest(data)
    }],
    transformResponse: [function (data: any): any {
        return transformResponse(data)
    }],

    validateStatus(status: number): boolean {
        return status >= 200 && status < 300
    }
}


const methodWithoutData = ['delete', 'get', 'head', 'options']

methodWithoutData.forEach(method => {
    defaults.headers[method] = {}
})


const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults
