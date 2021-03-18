import {request} from "@/network/request";

//获取home页面的数据
export function getMultidata(){
  return request({
    url:'/home/multidata'
  }).then(result =>{
    //返回一整个大的对象
    // console.log(result);
    //现在只返回banner的数据
    return result
  }).catch(error =>{
    console.log(error);
  })
}

//获取商品数据
export function getProductData(type,page){
  return request({
    url:'home/data',
    params:{
      // 这两个参数要写在路由传过去拿数据
      type,
      page
    }
  }).then(result =>{
    return result
  }).catch(error =>{
    console.log(error);
  })
}