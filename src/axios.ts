import {AxiosStatic, AxiosRequestConfig} from "./types";
import Axios from './core/Axios'
import {extend} from "./helpers/utils";
import Defaults from './defaults'
import mergeConfig from "./core/mergeConfig";
import CancelToken from './cancel/CancelToken'
import Cancel, {isCancel} from "./cancel/Cancel";

// 创建实例
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config)
    const instance = Axios.prototype.request.bind(context)
    // 合并对象
    extend(instance, context)
    return instance as AxiosStatic
}

const axios = createInstance(Defaults)

axios.create = function create(config) {
    return createInstance(mergeConfig(Defaults,config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

//
axios.all = function all(promises) {
    return Promise.all(promises)
}

axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr)
    }
}

axios.Axios = Axios

export default axios
