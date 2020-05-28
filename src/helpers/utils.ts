const toString = Object.prototype.toString;

// 判断日期类型
export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]';
}

// // 判断对象
// export function isObject(val: any): val is Object {
//     return val !== null && typeof val === 'object';
// }

// 普通对象
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]'
}

// 拷贝函数
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}


// 深拷贝
export function deepMerge(...objs: any[]): any {
    const result = Object.create(null)
    objs.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key]
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val)
                    } else {
                        result[key] = deepMerge(val)
                    }
                } else result[key] = val
            })
        }
    })
    return result
}


// 判断是不是form-data
export function isFormData(val: any): val is FormData {
    return typeof val !== 'undefined' && val instanceof FormData
}

// 判断是否是 urlSearchParams
export function isURLSearchParams(params: any): params is URLSearchParams {
    return typeof params !== 'undefined' && params instanceof URLSearchParams
}
