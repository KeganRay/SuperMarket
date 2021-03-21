//防抖动（例如刚输入完，就发送一次网络请求，这样性能会很差，可以设置一个防抖函数，在一定的延迟之内再输入东西不会执行）
export function debounce(func,delay){
  let timer = null
  return function (...args){//...的作用是可以传多个参数,如果只写一个args就只能传一个参数
    if (timer){
      clearTimeout(timer)//前面有timer就取消了再等等
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

