
/*����js������*/
/*����һ������ ���������Ƿ�װ������*/
window.itcast={};
  //��װһ��transitionEnd �����¼�����
itcast.transitionEnd=function(dom,callback){
    /*��Ҫ���¼���dom ��֮�� �������� �¼���ʱ�� ִ��  callback*/
    if(dom && typeof dom =='object'){

        dom.addEventListener('webkitTransitionEnd',function(){/*���������*/
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

