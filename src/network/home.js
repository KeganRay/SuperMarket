import {request} from "@/network/request";

export function getMultidata(){
  return request({
    url:'/home/multidata'
  }).then(result =>{
    //返回一整个大的对象
    console.log(result);
    //现在只返回banner的数据
    return result
  }).catch(error =>{

  })
}

export function getProductData(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}