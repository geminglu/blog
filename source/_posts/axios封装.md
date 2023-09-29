---
title: axios封装
date: 2023-09-29 11:07:38
categories: javascipt
tags: [js库 前端]
---
```javascript
import axios from 'axios';
import Toast from "zarm/lib/toast"
import "zarm/lib/toast/style/css"
let appId = "sdjhb-jdhoo-f265-djbhfj-iui"   //应用识别码，会在每一个url地址上拼接这个属性
let stayTime = 3000 //设置zarmUI库Toast（轻提示）组件的停留时间
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000; //10秒
axios.defaults.withCredentials = true;
/**
 * 设置post请求头
 * application/json;charset=UTF-8   JSON格式
 * application/x-www-form-urlencoded;charset=UTF-8  Form表单格式
 */
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
var CancelToken = axios.CancelToken;
let sources = []  // 定义数组用于存储每个ajax请求的取消函数及对应标识
/**
 * 请求防抖当一个url地址被请求多次就会取消前一次请求
 */
let removeSource = (config) => {
    for (let source in sources) {
        // 当多次请求相同时，取消之前的请求
        if (sources[source].umet === config.url + '&' + config.method) {
            sources[source].cancel("取消请求")
            sources.splice(source, 1)
        }
    }
}
/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    removeSource(config)
    config.cancelToken = new CancelToken((c) => {
        // 将取消函数存起来
        sources.push({ umet: config.url + '&' + config.method, cancel: c })
    })
    return config;
}, error => {
    return Promise.reject(error)
}
)
// 响应拦截器
axios.interceptors.response.use(config => {
    if (config.data.statusCode >= 3000) {
        Toast.show({ content: config.data.msg, stayTime })
    }
    removeSource(config.config)
    return config.data;
}, error => {
    if (!error.response) return
    switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
            if (window.location.hostname === "localhost") {
                axios.post("/api/v1/login?client_name=form", {
                    "userName": "lixiaoyao4_vendor",
                    "password": 123456
                })
            } else {
                window.location = error.response.headers.locationurl;
            }
            break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面                
        case 403:
            Toast.show({ content: "登录过期，请重新登录", stayTime })
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
            if (window.location.hostname === "localhost") {
                axios.post("/api/v1/login?client_name=form", {
                    "userName": "lixiaoyao4_vendor",
                    "password": 123456
                })
            } else {
                window.location = error.response.headers.locationurl;
            }
            break;
        // 404请求不存在
        case 404:
            Toast.show({ content: "访问资源不存在", stayTime })
            break;
        // 其他错误，直接抛出错误提示
        default:
            Toast.show({ content: error.response.data.message, stayTime })
    }
    return Promise.reject(error.response)
}
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: {
                ...params,
                appId
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
    if (url.indexOf("?") === -1) {
        url += `?appId=${appId}`
    } else {
        url += `&appId=${appId}`
    }
    return new Promise((resolve, reject) => {
        axios.post(`${url}`, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}
// 对外暴露
export { post, get }

```
```javascript


import axios from 'axios';
import Toast from "zarm/lib/toast"
import "zarm/lib/toast/style/css"
// var appId = "ww39bb02654ddd65fd"
var appId = "sdjhb-jdhoo-f265-djbhfj-iui"
var stayTime = 3000;
const codeMessage = {
    400: "请求参数错误",
    401: "权限不足, 请重新登录",
    403: "服务器拒绝本次访问",
    404: "请求资源未找到",
    500: "内部服务器错误",
    501: "服务器不支持该请求中使用的方法",
    502: "网关错误",
    504: "网关超时",
};
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
// axios.defaults.timeout = 10000; //10秒
// axios.defaults.withCredentials = true;
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
const request = axios.create({
    timeout: 1000,
    withCredentials: true,
})
var CancelToken = axios.CancelToken;
let sources = []  // 定义数组用于存储每个ajax请求的取消函数及对应标识
// 定义取消操作
/*let removeSource = (config) => {
    for (let source in sources) {
        // 当多次请求相同时，取消之前的请求
        if (sources[source].umet === config.url + '&' + config.method) {
            sources[source].cancel("取消请求")
            sources.splice(source, 1)
        }
    }
}*/
/**
 * 请求拦截器
 */
/*axios.interceptors.request.use(config => {
        removeSource(config)
        config.cancelToken = new CancelToken((c) => {
            // 将取消函数存起来
            sources.push({umet: config.url + '&' + config.method, cancel: c})
        })
        return config;
    }, error => {
        return Promise.reject(error)
    }
)*/
// 响应拦截器
request.interceptors.response.use(config => {
    if (config.data.statusCode >= 3000) {
        Toast.show({ content: config.data.msg, stayTime, })
    }
    // localStorage.setItem('isLogin',false);
    // 请求结束后将对应存储的取消函数删除
    //removeSource(config.config)
    return config.data;
}, error => {
    if (!error.response) return
    if (401 === error.response.status) {
        if (window.location.hostname === "localhost" || window.location.hostname === "10.151.107.6") {
            axios.post("/api/v1/login?client_name=form", {
                "userName": "lixiaoyao4_vendor",
                "password": 123456
            })
        } else {
            window.location = error.response.headers.locationurl;
        }
        return Promise.reject(error.response)
    } else {
        Toast.show({ content: error.response.data.message, stayTime, })
        return Promise.reject(error)
    }
}
)
// 响应拦截器
axios.interceptors.response.use(config => {
    if (config.data.statusCode >= 3000) {
        Toast.show({ content: config.data.msg, stayTime, })
    }
    // localStorage.setItem('isLogin',false);
    // 请求结束后将对应存储的取消函数删除
    //removeSource(config.config)
    return config.data;
}, error => {
    if (!error.response) return
    if (401 === error.response.status) {
        if (window.location.hostname === "localhost" || window.location.hostname === "10.151.107.6") {
            axios.post("/api/v1/login?client_name=form", {
                "userName": "lixiaoyao4_vendor",
                "password": 123456
            })
        } else {
            window.location = error.response.headers.locationurl;
        }
        return Promise.reject(error.response)
    } else {
        errorHandler(error)
        return Promise.reject(error)
    }
}
)
// 异常处理
function errorHandler(error) {
    if (codeMessage[error.response.status]) {
        Toast.show({ content: error.response.status + "：" + codeMessage[error.response.status], stayTime, })
    } else {
        Toast.show({ content: error.response.status + "：" + error.response.statusText, stayTime, })
    }
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: {
                ...params,
                appId
            },
            //CancelToken:source1.token
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
    if (url.indexOf("?") === -1) {
        url += `?appId=${appId}`
    } else {
        url += `&appId=${appId}`
    }
    return new Promise((resolve, reject) => {
        axios.post(`${url}`, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}
// 对外暴露
export {
    post,
    get
}

```
