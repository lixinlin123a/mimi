
/*页面加载完成*/
window.onload = function(){
    search();
    banner();
    downTime();
}
/*头部搜索功能*/
function search(){
    /**
     * 1.在滚动屏幕时候或者说滑动屏幕的时候 背景颜色的变化
     * 2.滚动屏幕或者滑动屏幕到一定距离时候   颜色不发生改变
     * 颜色变换的程度 和 一定距离不变化  都是和滚动距离有关
     */

    /* 获取搜索盒子*/
    var searchBox = document.querySelector('.jd_header_box');
    /*获取轮播图盒子*/
    var bannerBox = document.querySelector('.jd_banner');

    /*获取轮播图的高度*/
    var height = bannerBox.offsetHeight;

    /*监听滚动事件*/   /* 目的是 不断的观察当前滚动的距离是否超过了轮播图的距离*/
    window.onscroll = function() {

        /*当前滚动的距离——就是距顶部的距离*/
        var top = document.body.scrollTop;
		console.log(top);

        var opacity = 0;
        /*如果滚动的距离大于轮播图的高度时 搜索框以一种颜色(透明度)保存不变*/
        if (top > height) {
            opacity = 0.85;
        }
        /*如果滚动的距离小于轮播高度时候 根据滚动的距离和高度的比来计算搜索框颜色*/
        else {
            opacity =0.85 * (top/height);
        }
        /*设置 搜索盒子的透明度*/
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }

}

/*轮播图*/
function banner(){
    /**
     * 分为5步
     * 1,自动轮播图
     * 2.点随着图片的轮播做改变 对应当前的图片位置
     * 3图片盒子能滑动
     * 4当滑动的hi时候不超过一定距离时，吸附回去
     * 5，当滑动的距离超过一定距离的时候 图片做相应的滑动 左或右
     * 一定距离就是1/3的图片距离
     */

    /*第一步*/
    /*需要操作的Dom*/
    /*轮播图大盒子*/
    var banner=document.querySelector('.jd_banner');
    /*获取图片的宽度 或者说 轮播图大盒子的宽度*/
    var width=banner.offsetWidth;
    /*获取图片盒子*/
    var imageBox=banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox=banner.querySelector('ul:last-child');
    /*所有的点*/
    var points=pointBox.querySelectorAll('li');

    /*页面检查打印*/
    /*
     console.log(banner);
     console.log(imageBox);
     console.log( pointBox);
     console.log(points);
     */

    /*公用方法*/
       /*1，添加过度*/
         var addTransition =function(){
             imageBox.style.webkitTransition ="all .2s";/*兼容浏览器*/
             imageBox.style.transition="all .2s";

         }
       /*2,删除过度*/
        var removeTransition =function(){
            imageBox.style.webkitTransition ="none";/*兼容浏览器*/
            imageBox.style.transition="none";
        }
        /*3,设置定位*/
        var setTranslateX=function(x){
            imageBox.style.webkitTransform="translateX("+x+"px)";/*兼容浏览器*/
            imageBox.style.transform="translateX("+x+"px)";
        }



     /*第二步*/
    /*自动轮播图*/
    /*默认索引*/
   var  index=1;
    /*当前默认的索引*/
    var timer=setInterval(function(){
        index ++;
        /*让图片动画的滚动  translateX  transition 来实现动画*/
        /*给 imagBox 添加过度*/

            addTransition();
        /*给imagBox设置位置*/

            setTranslateX(-index*width);
    },3000);

    /*第三步*/
    /*无缝滚动和滑动*/
    /**
     *动画结束 过度结束
     * 如果索引是9 需要瞬间定位到  第一张图片
     * 如果索引是0 需要瞬间定位到 第八张
     */

     /*公共js的調入*/
    /*每一次过度结束都会触发这个  过度结束时间*/
     itcast.transitionEnd(imageBox,function(){


         if(index >=9){
             index=1;
             /*瞬间定位*/
             /*1，删除过度*/
             removeTransition();
             /*2，设置定位*/
             setTranslateX(-index*width);

         }else if(index<=0){
             index=8;
             /*瞬间定位*/
             /*1，删除过度*/
             removeTransition();
             /*2，设置定位*/
             setTranslateX(-index*width);
         }
         setPoint();
     });
    /*js的封裝上面*/
    //imageBox.addEventListener('webkitTransitionEnd',function(){/*兼容浏览器*/
    //    if(index >=9){
    //        index=1;
    //        /*瞬间定位*/
    //          /*1，删除过度*/
    //           removeTransition();
    //           /*2，设置定位*/
    //        setTranslateX(-index*width);
    //
    //    }else if(index<=0){
    //        index=8;
    //        /*瞬间定位*/
    //           /*1，删除过度*/
    //           removeTransition();
    //           /*2，设置定位*/
    //            setTranslateX(-index*width);
    //    }
    //
    //});
    //
    //imageBox.addEventListener('transitionEnd',function(){
    //    if(index >=9){
    //        index=1;
    //        /*瞬间定位*/
    //        /*1，删除过度*/
    //        removeTransition();
    //        /*2，设置定位*/
    //        setTranslateX(-index*width);
    //
    //    }else if(index<=0){
    //        index=8;
    //        /*瞬间定位*/
    //        /*1，删除过度*/
    //        removeTransition();
    //        /*2，设置定位*/
    //        setTranslateX(-index*width);
    //    }
    //});


         /*第四步*/
      /*点睡随着图片的轮播做改变  对应当前的图片的位子*/

    var setPoint=function(i){
        /*出去当前样式*/
        for(var i=0;i<points.length;i++){
            points[i].className="";

        }
        /*索引值 0-9*/
        /*又需要判断index 是0 9的时候*/
        /*但是我们设置点的 时候我们是在动画结的时候设置*/
        /*我们的index已近设置过了*/
        /*没必要被重置过的index 1-8*/
        points[index-1].className="now";
    }


    /*第五步*/
    /*3.图片盒子能滑动*/
      /*开始的X坐标*/
    var startX=0;
    /*移动是时候的x的坐标*/
    var moveX=0;

    /*移动距离*/
    var distanceX=0;

    /*判断是否滑动过*/
    var isMove=false;

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        startX= e.touches[0].clientX;

    });

    imageBox.addEventListener('touchmove',function(e){
       isMove=true;
        MoveX= e.touches[0].clientX;
        distanceX=moveX - startX;
        console.log(distanceX);
        /*滑动的时候不断给图片盒子做定位 来达到滑动的效果*/
        /*定位的位置 当前的图片的定位 加上  移动的距离*/
        /*清除过度*/
        removeTransition();
        /*设置当前的定位*/
        setTranslateX(-index*width+distanceX);

    });
    //在谷歌的模拟器会出现 一个问题就是 touchend可能会丢失事件，所以用window
    window.addEventListener('touchend',function(){
        /*第六部*/
        /**
         * 4当滑动的hi时候不超过一定距离时，吸附回去
         * 5，当滑动的距离超过一定距离的时候 图片做相应的滑动 左或右
         * 一定距离就是1/3的图片距离
         */
        if(Math.abs(distanceX)>(width/3) && isMove){
          /*怎么判断上一张还是下一张
          * 是通过distanceX的值判断
          *
          * */
            if(distanceX>0){
                index --;
            }else{
                index++;
            }
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);

        }else{
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }


        /*重置参数  防止第二次是时候影响计算*/
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;

        /*结束之后  加上定时器*/
        clearInterval(timer);
          /*重新滑动*/
        var timer=setInterval(function(){
            index ++;
            /*让图片动画的滚动  translateX  transition 来实现动画*/
            /*给 imagBox 添加过度*/

            addTransition();
            /*给imagBox设置位置*/

            setTranslateX(-index*width);
        },4000);

    });
}

/*倒计时计算*/
 function downTime(){
/*
 * 1.得到需要倒计时的时间  这是固定定死的 5小时 04 59 59
 * 2.每隔一秒来计算   当前的 时间 格式
 * 3.渲染在页面当中
 */
     /*倒计时的时间*/
     var time=5*60*60;

     /*获取dom元素*/
     var skTime=document.querySelector('.sk_time');

     /*获取所以的span*/
     var spans=skTime.querySelectorAll('span');

     /*定时器*/
     var timer=setInterval(function(){
         time --;
         if(time<0){

             clearInterval(timer);
             return false;

         }
         /*格式化时间 得到 时 分  秒*/
         var h =Math.floor(time/3600);
         var m =Math.floor((time%3600)/60);
         var s =time%60;

         /*渲染到网页上去*/

         spans[0].innerHTML=Math.floor(h/10);
         spans[1].innerHTML=h%10;

         spans[3].innerHTML=Math.floor(m/10);
         spans[4].innerHTML=m%10;

         spans[6].innerHTML=Math.floor(s/10);
         spans[7].innerHTML=s%10;

     },1000);


 }