
/*ҳ��������*/
window.onload = function(){
    search();
    banner();
    downTime();
}
/*ͷ����������*/
function search(){
    /**
     * 1.�ڹ�����Ļʱ�����˵������Ļ��ʱ�� ������ɫ�ı仯
     * 2.������Ļ���߻�����Ļ��һ������ʱ��   ��ɫ�������ı�
     * ��ɫ�任�ĳ̶� �� һ�����벻�仯  ���Ǻ͹��������й�
     */

    /* ��ȡ��������*/
    var searchBox = document.querySelector('.jd_header_box');
    /*��ȡ�ֲ�ͼ����*/
    var bannerBox = document.querySelector('.jd_banner');

    /*��ȡ�ֲ�ͼ�ĸ߶�*/
    var height = bannerBox.offsetHeight;

    /*���������¼�*/   /* Ŀ���� ���ϵĹ۲쵱ǰ�����ľ����Ƿ񳬹����ֲ�ͼ�ľ���*/
    window.onscroll = function() {

        /*��ǰ�����ľ��롪�����Ǿඥ���ľ���*/
        var top = document.body.scrollTop;
		console.log(top);

        var opacity = 0;
        /*��������ľ�������ֲ�ͼ�ĸ߶�ʱ ��������һ����ɫ(͸����)���治��*/
        if (top > height) {
            opacity = 0.85;
        }
        /*��������ľ���С���ֲ��߶�ʱ�� ���ݹ����ľ���͸߶ȵı���������������ɫ*/
        else {
            opacity =0.85 * (top/height);
        }
        /*���� �������ӵ�͸����*/
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }

}

/*�ֲ�ͼ*/
function banner(){
    /**
     * ��Ϊ5��
     * 1,�Զ��ֲ�ͼ
     * 2.������ͼƬ���ֲ����ı� ��Ӧ��ǰ��ͼƬλ��
     * 3ͼƬ�����ܻ���
     * 4��������hiʱ�򲻳���һ������ʱ��������ȥ
     * 5���������ľ��볬��һ�������ʱ�� ͼƬ����Ӧ�Ļ��� �����
     * һ���������1/3��ͼƬ����
     */

    /*��һ��*/
    /*��Ҫ������Dom*/
    /*�ֲ�ͼ�����*/
    var banner=document.querySelector('.jd_banner');
    /*��ȡͼƬ�Ŀ�� ����˵ �ֲ�ͼ����ӵĿ��*/
    var width=banner.offsetWidth;
    /*��ȡͼƬ����*/
    var imageBox=banner.querySelector('ul:first-child');
    /*�����*/
    var pointBox=banner.querySelector('ul:last-child');
    /*���еĵ�*/
    var points=pointBox.querySelectorAll('li');

    /*ҳ�����ӡ*/
    /*
     console.log(banner);
     console.log(imageBox);
     console.log( pointBox);
     console.log(points);
     */

    /*���÷���*/
       /*1����ӹ���*/
         var addTransition =function(){
             imageBox.style.webkitTransition ="all .2s";/*���������*/
             imageBox.style.transition="all .2s";

         }
       /*2,ɾ������*/
        var removeTransition =function(){
            imageBox.style.webkitTransition ="none";/*���������*/
            imageBox.style.transition="none";
        }
        /*3,���ö�λ*/
        var setTranslateX=function(x){
            imageBox.style.webkitTransform="translateX("+x+"px)";/*���������*/
            imageBox.style.transform="translateX("+x+"px)";
        }



     /*�ڶ���*/
    /*�Զ��ֲ�ͼ*/
    /*Ĭ������*/
   var  index=1;
    /*��ǰĬ�ϵ�����*/
    var timer=setInterval(function(){
        index ++;
        /*��ͼƬ�����Ĺ���  translateX  transition ��ʵ�ֶ���*/
        /*�� imagBox ��ӹ���*/

            addTransition();
        /*��imagBox����λ��*/

            setTranslateX(-index*width);
    },3000);

    /*������*/
    /*�޷�����ͻ���*/
    /**
     *�������� ���Ƚ���
     * ���������9 ��Ҫ˲�䶨λ��  ��һ��ͼƬ
     * ���������0 ��Ҫ˲�䶨λ�� �ڰ���
     */

     /*����js���{��*/
    /*ÿһ�ι��Ƚ������ᴥ�����  ���Ƚ���ʱ��*/
     itcast.transitionEnd(imageBox,function(){


         if(index >=9){
             index=1;
             /*˲�䶨λ*/
             /*1��ɾ������*/
             removeTransition();
             /*2�����ö�λ*/
             setTranslateX(-index*width);

         }else if(index<=0){
             index=8;
             /*˲�䶨λ*/
             /*1��ɾ������*/
             removeTransition();
             /*2�����ö�λ*/
             setTranslateX(-index*width);
         }
         setPoint();
     });
    /*js�ķ��b����*/
    //imageBox.addEventListener('webkitTransitionEnd',function(){/*���������*/
    //    if(index >=9){
    //        index=1;
    //        /*˲�䶨λ*/
    //          /*1��ɾ������*/
    //           removeTransition();
    //           /*2�����ö�λ*/
    //        setTranslateX(-index*width);
    //
    //    }else if(index<=0){
    //        index=8;
    //        /*˲�䶨λ*/
    //           /*1��ɾ������*/
    //           removeTransition();
    //           /*2�����ö�λ*/
    //            setTranslateX(-index*width);
    //    }
    //
    //});
    //
    //imageBox.addEventListener('transitionEnd',function(){
    //    if(index >=9){
    //        index=1;
    //        /*˲�䶨λ*/
    //        /*1��ɾ������*/
    //        removeTransition();
    //        /*2�����ö�λ*/
    //        setTranslateX(-index*width);
    //
    //    }else if(index<=0){
    //        index=8;
    //        /*˲�䶨λ*/
    //        /*1��ɾ������*/
    //        removeTransition();
    //        /*2�����ö�λ*/
    //        setTranslateX(-index*width);
    //    }
    //});


         /*���Ĳ�*/
      /*��˯����ͼƬ���ֲ����ı�  ��Ӧ��ǰ��ͼƬ��λ��*/

    var setPoint=function(i){
        /*��ȥ��ǰ��ʽ*/
        for(var i=0;i<points.length;i++){
            points[i].className="";

        }
        /*����ֵ 0-9*/
        /*����Ҫ�ж�index ��0 9��ʱ��*/
        /*�����������õ�� ʱ���������ڶ������ʱ������*/
        /*���ǵ�index�ѽ����ù���*/
        /*û��Ҫ�����ù���index 1-8*/
        points[index-1].className="now";
    }


    /*���岽*/
    /*3.ͼƬ�����ܻ���*/
      /*��ʼ��X����*/
    var startX=0;
    /*�ƶ���ʱ���x������*/
    var moveX=0;

    /*�ƶ�����*/
    var distanceX=0;

    /*�ж��Ƿ񻬶���*/
    var isMove=false;

    imageBox.addEventListener('touchstart',function(e){
        /*�����ʱ��*/
        clearInterval(timer);
        startX= e.touches[0].clientX;

    });

    imageBox.addEventListener('touchmove',function(e){
       isMove=true;
        MoveX= e.touches[0].clientX;
        distanceX=moveX - startX;
        console.log(distanceX);
        /*������ʱ�򲻶ϸ�ͼƬ��������λ ���ﵽ������Ч��*/
        /*��λ��λ�� ��ǰ��ͼƬ�Ķ�λ ����  �ƶ��ľ���*/
        /*�������*/
        removeTransition();
        /*���õ�ǰ�Ķ�λ*/
        setTranslateX(-index*width+distanceX);

    });
    //�ڹȸ��ģ��������� һ��������� touchend���ܻᶪʧ�¼���������window
    window.addEventListener('touchend',function(){
        /*������*/
        /**
         * 4��������hiʱ�򲻳���һ������ʱ��������ȥ
         * 5���������ľ��볬��һ�������ʱ�� ͼƬ����Ӧ�Ļ��� �����
         * һ���������1/3��ͼƬ����
         */
        if(Math.abs(distanceX)>(width/3) && isMove){
          /*��ô�ж���һ�Ż�����һ��
          * ��ͨ��distanceX��ֵ�ж�
          *
          * */
            if(distanceX>0){
                index --;
            }else{
                index++;
            }
            /*�����Ķ�λ��ȥ ��ʵ����������ȥ*/
            addTransition();
            setTranslateX(-index*width);

        }else{
            /*�����Ķ�λ��ȥ ��ʵ����������ȥ*/
            addTransition();
            setTranslateX(-index*width);
        }


        /*���ò���  ��ֹ�ڶ�����ʱ��Ӱ�����*/
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;

        /*����֮��  ���϶�ʱ��*/
        clearInterval(timer);
          /*���»���*/
        var timer=setInterval(function(){
            index ++;
            /*��ͼƬ�����Ĺ���  translateX  transition ��ʵ�ֶ���*/
            /*�� imagBox ��ӹ���*/

            addTransition();
            /*��imagBox����λ��*/

            setTranslateX(-index*width);
        },4000);

    });
}

/*����ʱ����*/
 function downTime(){
/*
 * 1.�õ���Ҫ����ʱ��ʱ��  ���ǹ̶������� 5Сʱ 04 59 59
 * 2.ÿ��һ��������   ��ǰ�� ʱ�� ��ʽ
 * 3.��Ⱦ��ҳ�浱��
 */
     /*����ʱ��ʱ��*/
     var time=5*60*60;

     /*��ȡdomԪ��*/
     var skTime=document.querySelector('.sk_time');

     /*��ȡ���Ե�span*/
     var spans=skTime.querySelectorAll('span');

     /*��ʱ��*/
     var timer=setInterval(function(){
         time --;
         if(time<0){

             clearInterval(timer);
             return false;

         }
         /*��ʽ��ʱ�� �õ� ʱ ��  ��*/
         var h =Math.floor(time/3600);
         var m =Math.floor((time%3600)/60);
         var s =time%60;

         /*��Ⱦ����ҳ��ȥ*/

         spans[0].innerHTML=Math.floor(h/10);
         spans[1].innerHTML=h%10;

         spans[3].innerHTML=Math.floor(m/10);
         spans[4].innerHTML=m%10;

         spans[6].innerHTML=Math.floor(s/10);
         spans[7].innerHTML=s%10;

     },1000);


 }