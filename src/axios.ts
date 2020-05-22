import {AxiosInstance} from "./types";
import Axios from './core/Axios'
import {extend} from "./helpers/utils";

// 创建实例
function createInstance(): AxiosInstance {
    const context = new Axios()
    const instance = Axios.prototype.request.bind(context)
    // 合并对象
    extend(instance,context)

    return instance as AxiosInstance
}

const axios = createInstance()

export default axios
