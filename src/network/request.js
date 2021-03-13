//todo 别人调用这里的request就能发出请求

import axios from "axios";

//3、最终方案
export function request(config) {
  return new Promise((resolve, reject) => {
    //todo 1、创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000,
    })

    //todo 2、axios的拦截器

    //请求拦截
    // instance.interceptors.request.use(config => {
    //   //请求拦截到要进行返回
    //   return config
    // }, error => {
    //   console.log(error);
    // })
    //
    // //响应拦截
    // instance.interceptors.response.use(result => {
    //   return result
    // }, error => {
    //   console.log(error);
    // })

    //todo 3、真正发送网络请求，会返回一个promise对象
    instance(config)
        .then(result => {
          resolve(result)
        })
        .catch(result => {
          reject(result)
        })
  })
}

