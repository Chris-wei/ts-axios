import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import xhr from './xhr'
import {buildURL, combineURL, isAbsoluteURL} from "../helpers/url";
import {transformRequest} from "../helpers/data";
import {flattenHeaders, processHeaders} from "../helpers/headers";
import {transform} from "./transform";

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config)
    // 处理参数
    processConfig(config)
    // 发送请求
    return xhr(config).then(res => {
        return transformResponseData(res)
    })
}


// 请求前处理
function processConfig(config: AxiosRequestConfig): void {
    // 处理请求 url 参数
    config.url = transformURL(config)
    // 处理请求头 headers
    // config.headers = transformHeaders(config)
    // 处理请求 body 参数
    // config.data = transformRequestData(config)
    config.data = transform(config.data, config.headers, config.transformRequest)
    // 合并headers配置
    config.headers = flattenHeaders(config.headers, config.method!)
}


// url 转换
function transformURL(config: AxiosRequestConfig): string {
    let {baseURL, url, params, paramsSerializer} = config;
    if (baseURL && !isAbsoluteURL(url!)) url = combineURL(baseURL, url)
    // 处理url参数
    return buildURL(url!, params, paramsSerializer)
}

// body 参数
function transformRequestData(config: AxiosRequestConfig): any {
    // 处理 body 参数
    return transformRequest(config.data)
}


// headers 处理
function transformHeaders(config: AxiosRequestConfig): any {
    const {headers = {}, data} = config
    // 处理 headers 参数
    return processHeaders(headers, data)
}

// 处理响应的 data
function transformResponseData(res: AxiosResponse): AxiosResponse {
    // res.data = transformResponse(res.data)
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested()
    }
}
