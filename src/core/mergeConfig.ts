import {AxiosRequestConfig} from "../types";
import {isPlainObject,deepMerge} from "../helpers/utils";
// 定义不同的合并策略类型
const strats = Object.create(null)

const stratKeysFromVal2 = ['url', 'params', 'data']
const starctKeysDeepMerge = ['headers','auth']

stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat;
})

starctKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat;
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) config2 = {}
    // 创建空对象
    const config = Object.create(null)

    for (let key in config2) {
        mergeField(key)
    }

    for (let key in config1) {
        if (!config2[key]) mergeField(key)
    }

    function mergeField(key: string): void {
        const strat = strats[key] || defaultStrat
        config[key] = strat(config1[key], config2![key])
    }

    return config;
}

// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1;
}

// 只取第二个合并策略
function fromVal2Strat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') return val2;
}

// 对于复杂类型的合并
function deepMergeStrat(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}
