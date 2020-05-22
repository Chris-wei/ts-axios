import {Axios as AxiosInterface, AxiosPromise, AxiosRequestConfig, Method} from "../types";
import dispatchRequest from './dispatchRequest'

export default class Axios implements AxiosInterface {
    // 函数重载 request(config) 或者 request(url,config)
    request(url:any , config?: any): AxiosPromise {
        if( typeof url === 'string' ){
            if(!config) config = {}
            config.url = url
        }else{
            config = url
        }
        return dispatchRequest(config)
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    // 统一封装类似 get 的请求
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            url
        }))
    }

    // 统一封装类似 post 的请求
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            data,
            url
        }))
    }
}
