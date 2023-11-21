

/*****/
window.onload=function(){
  // console.log(1)

	//页面初始化,如果写在一起，可能影响，所以用方法分开

	/*搜索*/
	 search();

	/*轮播图*/
	banner();

	/*倒计时*/
	downTime();



}
/*******搜索模块***************/
var search=function(){

	/*
	* 页面初始化是，距离顶部距离是0时，透明底是0
	*
	*当页面滚动的时候，距离原大  透明度就原大
	*当 滚动的距离 超过 了轮播图的距离的时候，透明度不变了
	*/
      //搜索框元素
	var search=document.querySelector(".jd_search_box");

      //轮播框元素
	var  banner=document.querySelector(".js_banner");

	// 轮播图框在页面中自身的高度-
	var height=banner.offsetHeight;

	/*监听滚动事件*/
	window.onscroll=function(){
		
		/*当前页面距离顶部的距离-当前页面的滚动距离*/
		var top=document.body.scrollTop;/*谷歌的写法*/
		// var top=document.documentElement.scrollTop;/*ie是写法*/
		//移动端不用考虑ie
		// console.log(top);
          var opacity=0;

		if(top>height){
			// 当页面滚动的距离 大于轮播图高度
			

			opacity=0.85;

		}else{
			 //当页面滚动的距离越来越大 透明度变大

                opacity=0.85*(top/height)

		}

		/*设置透明度给搜索盒子*/
		search.style.background="rgba(216,80,90,"+opacity+")"



	}


}
/*************轮播图***********/
var banner=function(){

	
	/***要点：
	* 1，自动滚动(无缝)--（定时器，过渡，位移）
	* 2，点盒子对应的改变(改变样式)
	* 3，滑动          （touch事件，距离的变化，在改变位移）
	* 4，当滑动距离不够时，弹回去-吸附回去（过渡，位移）
	* 5，当滑动距离够了，就跳转 上一张  下一张(判断滑动的方向，过渡，位移)
	***/

    // 自动滚动； pc端 定时器 + 定位改变(div.style.left=div.offsetLeft+px)  
    // 自动滚动； 移动端 定时器 + 位移改变
  
   /***获dom元素****/

   /*大容器*/
   var banner=document.querySelector(".js_banner");
   /*轮播图宽度*/
   var width=banner.offsetWidth;/*容器在页面中实际宽度*/
   // console.log(width);//640
   /*图片容器*/
   var  imgBox=banner.querySelector("ul:first-child");//ul:first-child 伪类选择器
     // console.log(imgBox)
   /*点容器*/
   var  pointBox=banner.querySelector("div:last-child");//div:last-child  伪类选择器
    

 /*所有点*/
  // var  allpoint=pointBox.children;//伪数组
  var  points=pointBox.querySelectorAll("span");//是一个元素集合，要遍历
  // console.log(allpoint[1]);//<span></span>



  // 把经常用 提取出来 封装成一个函数

  var  addTransition=function(dom){ //添加过渡
      /*添加过渡*/

  	    dom.style.transition="all 0.2";//切换一张需要0.2秒
  	    dom.style.webkitTransition="all 0.2";/*兼容谷歌*/
  }


   var  removeTransition=function(dom){ //清除过渡
      /*清除过渡*/

  	    dom.style.transition="none";//切换一张需要0.2秒
  	    dom.style.webkitTransition="none";/*兼容谷歌*/
  }


  var  addTransform=function(dom,translateX){ // /**位移**/

  	 /**位移**/
  	    dom.style.transform="translateX("+translateX+"px)";/*轮播图效果*/
  	    dom.style.webkitTransform="translateX("+translateX+"px)";

  }





  
  /********1自动滚动（无缝）-（定时器  过渡 位移)*********/

   var timer=null;
   var index=1;
     clearInterval(timer);

   
   timer=setInterval(autoplay,1000);
    function autoplay(){
    	 index++;
  	    /*过渡*/

  	    imgBox.style.transition="all 0.2";//切换一张需要0.2秒
  	    imgBox.style.webkitTransition="all 0.2";/*兼容谷歌*/


  	    


  	    if(index>=9){

  	    	index=1;
           
  	    }

        /**位移**/
        imgBox.style.transform="translateX("+(-index*width)+"px)";/*轮播图效果*/
        imgBox.style.webkitTransform="translateX("+(-index*width)+"px)";
  	    
     setpont();

  	       
    }
   


  //怎么监听 过渡 结束这个时间点，，用过渡结束事件
    //这里监听不到 不知道是什么原因？，看看后面 是什么原因。
    imgBox.addEventListener('transitionend',function (){
          // console.log('transitionend');

          //自动滑动-第8张到第1张
          if(index>=9){
          	/*瞬间到第一张*/
          	index=1;

          	/*清除过渡*/
            imgBox.style.transition="none";//
  	        imgBox.style.webkitTransition="none";/*兼容谷歌*/
          	/*位移*/
          	 /**位移**/
  	    imgBox.style.transform="translateX("+(-index*width)+"px)";/*轮播图效果*/
  	    imgBox.style.webkitTransform="translateX("+(-index*width)+"px)";

          }

          //自动滑动-第0张到第8张
     else if(index<=0){
     	/*瞬间点位到第8张*/
     	index=8;
     	/*清过渡*/
         removeTransition(imgBox)

     	/*定位-位移*/
     	addTransform(imgBox,-index*width);

     }
	  /*index-1-8*/
	  setpont();
    });



    /*********2.图片自动滑动-小盒子对应的变化（改变小圆的样式*******/

    var setpont=function(){
           
    	for(var i=0;i<points.length;i++){

             points[i].classList.remove("now");//移除所有的类       

    	}
       
    	points[index-1].classList.add("now");//添加类
    }


     // 移动端的 手滑动 效果做法
  
    /******手指可滑动  touch-事件-监听触摸点的坐标改变距离 位移*****/

       var  startX=0;//记录开始的x坐标
       var distanceX=0;//记录坐标的改变的值

       /*为了严谨判断一下*/

       var isMove=false;

       imgBox.addEventListener("touchstart",function (e){//手指触摸事件

               startX=e.touches[0].clientX;
              // console.log(startX)

              //清除定时器
              clearInterval(timer);

       })



        imgBox.addEventListener("touchmove",function (e){//手指滑动事件
        	var moveX=e.touches[0].clientX;
        	// console.log(moveX)
        	// console.log(moveX-startX);
        	 distanceX=moveX-startX;//滑动后-滑动前 =移动的距离
        	/*大于0，右滑动*/
        	/*小于0，左滑动*/
        	// 滑动基于当前的位置移动-定位
        	//计算要做定位的 改变值
        	var translateX=-index*width+distanceX;

     
        	 //记得每次要清除过渡
        	 removeTransition(imgBox)

            //移动-设置定位*/
        	 addTransform(imgBox,translateX);


        	 isMove=true;
           

       })


     imgBox.addEventListener("touchend",function (){//手指离开事件

          /*滑动实事件结束之后来判断当前滑动的距离*/
          /*有一个范围，大于三分之一，切换图片，反之吸附-就是定位回去*/

                // console.log(distanceX);

             if(isMove){

             	 // 4，当滑动距离不够时，弹回去-吸附回去（过渡，位移）
             	if(Math.abs(distanceX)<width/3){

             	  //添加过渡
             	    addTransition(imgBox);
             	  //位移	

                   addTransform(imgBox,-index*width);
             	}else{
             	// 5，当滑动距离够了，就跳转 上一张  下一张(判断滑动的方向，过渡，位移)
             		
             		if(distanceX>0){//右滑-上一张 
             	       index--;

             		}else{//<0;左滑-下一张

             		   index++;

             		}

             	  //添加过渡
             	    addTransition(imgBox);
             	  //位移	

                   addTransform(imgBox,(-index)*width);
             	}
             }   


          //起动定时器
          timer=setInterval(autoplay,1000);

          //每次滑动离开后，重置参数-清理
		          startX=0;//记录开始的x坐标
		          distanceX=0;//记录坐标的改变的值
		          isMove=false;
       })



}




/*到计时*/
var downTime=function(){

	/*
     *模拟倒计时 11 个小时
     *在利用定时器 1秒 一次 重新展示
     *
	*/

	var time=10;//11 个小时  转为秒
	var sktime=document.querySelector(".skl");
	var spans=sktime.querySelectorAll("span");

    
    
	var timer=setInterval(fn,1000);

	function fn(){
		 time--;
		 /*格式化时间*/

		 var h= Math.floor(time/3600);//小时 下取整
		 var m=Math.floor(time%3600/60);//分钟
		
		 var s=time%60;//秒

		 // 设置时间
		 spans[0].innerHTML=Math.floor(h/10);//小时的十位数  如10小时 10/10=1
		 spans[1].innerHTML=h%10;//

		 spans[3].innerHTML=Math.floor(m/10);//分钟的十位数  如9/10=0.9
		 spans[4].innerHTML=m%10;                            //9%10=9
         

		 spans[6].innerHTML=Math.floor(s/10);//秒的十位数  如9/10=0.9
		 spans[7].innerHTML=s%10;

       if(time<=0){
		
		clearInterval(timer);
	}

	}


}