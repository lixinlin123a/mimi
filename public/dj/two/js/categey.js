

window.onload=function(){

	/**左则滑动**/ 
	 // leftSwipe();

    icrollLeft();
	/**右则滑动**/ 

	rightSwipe();


}
/**左则滑动-上下滑动**/ 
var  leftSwipe=function(){
	/*
	*上下滑动- （touch-事件相关，位移）
	*
	*
	*/
	var parentBox=document.querySelector(".cate_left");
	var childBox=parentBox.querySelector("ul");

    var startY=0;
    var distanceY=0;

    /*核心程序*/
    var currentY=0;//记录当前定位

    var isMove=0;
	childBox.addEventListener("touchstart",function (e){
		  startY=e.touches[0].clientY;
		  // console.log(startY)
          
	})
	childBox.addEventListener("touchmove",function (e){
		  var moveY=e.touches[0].clientY;

		   distanceY=moveY-startY;
		   // console.log(distanceY)
		   ;
		   /*位移需要的值*/
		   var translateY=currentY + distanceY;

		   childBox.style.transform="translateY("+translateY+"px)";
		   childBox.style.webkitTransform="translateY("+translateY+"px)";


	})
	childBox.addEventListener("touchend",function (e){

        /*滑动完后的记录的位置*/
		currentY=currentY+distanceY;

	})

}

 var icrollLeft=function(){

    var parentBox=document.querySelector(".cate_left");
	var childBox=parentBox.querySelector("ul");

     var lis=childBox.children;
     // console.log(lis);


		  for(var i=0;i<lis.length;i++){
		  	  //给每个标签设置索引号
              lis[i].index= i;

		  	lis[i].addEventListener("touchstart",function (e){
		  		 
		  		   for(var j=0;j<lis.length;j++){
                        lis[j].classList.remove("now");//移除类
                         
                  }
                     //只留自己
                     this.classList.add("now");//添加类      
	
              })
 

     }



 	 /*使用icroll插件 上下滚动*/
 	 new IScroll(document.querySelector(".cate_left"));//父容器
 }

/**右则滑动**/ 
var rightSwipe=function(){
  
  /*使用icroll插件 左右滚动*/
  /**默认是上下滑动**/
   //怎么设置参数让左右滑动 
 	 new IScroll(document.querySelector(".cate_right"),{
 	 	//scrollX:true,
 	 	//scrollY:false,
		scrollY:true,
		scrollX:false,
 	 });//父容器
}
