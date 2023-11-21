
/*公共js的引用*/
/*定义一个对象 来承载我们封装的事情*/
window.itcast={};
  //封装一个transitionEnd 过度事件事情
itcast.transitionEnd=function(dom,callback){
    /*需要绑定事件的dom 绑定之后 当触发了 事件的时候 执行  callback*/
    if(dom && typeof dom =='object'){

        dom.addEventListener('webkitTransitionEnd',function(){/*浏览器兼容*/
             /*if(callback){
                  callback()
                }*/
          callback && callback();

        });
        dom.addEventListener('transitionEnd',function(){

            callback && callback();
        });

    }
}

