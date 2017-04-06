var app = angular.module('kfl', ['ionic']);
//自定义服务：对$http的封装，
// 目的是为了每次发请求时显示一个加载中的遮盖层，请求完成隐藏遮盖层
app.service('$kflHttp', ['$http', '$ionicLoading',
  function ($http, $ionicLoading) {
   //有两个参数：
   //url:请求的地址以及对应的参数
    //successCallback：成功的处理函数
    this.sendRequest = function (url, successCallback) {
      $ionicLoading.show({
        template: 'loading...'
      })
      $http.get(url).success(function (data) {
        $ionicLoading.hide();
        successCallback(data);
      });
    }
  }])
app.config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  //设置tabs显示在底部
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('start', {
      url: '/bl_start',
      templateUrl: 'tpl/start.html',
      controller:'startCtrl'
    })
    .state('detail', {
      url: '/bl_detail/:id',
      templateUrl: 'tpl/detail.html',
      controller: 'detailCtrl'
    })
    .state('more', {
      url: '/bl_main',
      templateUrl: 'tpl/more.html',
      controller: 'moreCtrl'
    })
    .state('mymsg', {
      url: '/bl_mymsg',
      templateUrl: 'tpl/mymsg.html',
      controller: 'mymsgCtrl'
    })
    .state('order', {
      url: '/bl_order:id',
      templateUrl: 'tpl/order.html',
      controller: 'orderCtrl'
    })
  $urlRouterProvider.otherwise('bl_start');
})
//最原始的控制器
app.controller('parentCtrl', ['$scope', '$state','$ionicPopup','$ionicModal','$kflHttp',
  function ($scope, $state,$ionicPopup,$ionicModal,$kflHttp) {
    //跳转方法
    $scope.jump = function (desState, args) {
      $state.go(desState, args);
    }
    //弹窗方法
    $scope.showAlert=function(aler){
      $ionicPopup.alert({
        title:aler
      })
    }
    //加上图标颜色方法
    $scope.clame=['fts','','','']
    $scope.showColor=function(sum){
      $scope.clame=['','','',''];
      $scope.clame[sum]='fts';
    }
    //注册的的模态框 设置成公共的方法
    //注册1界面的摸态框
    $ionicModal.fromTemplateUrl('tpl/order/zhuce1.html',{scope:$scope})
      .then(function(modal){$scope.modalz1=modal})
    $scope.openzhuce1=function(){
      $scope.modalz1.show();
    }
    $scope.closezhuce1=function(){
      $scope.modalz1.hide();
    }
    //注册2界面的摸态框
    $ionicModal.fromTemplateUrl('tpl/order/zhuce2.html',{scope:$scope})
      .then(function(modal){$scope.modalz2=modal})
    $scope.openzhuce2=function(){
      $scope.modalz2.show();
    }
    $scope.closezhuce2=function(){
      $scope.modalz2.hide();
    }
    //注册3界面的摸态框
    $ionicModal.fromTemplateUrl('tpl/order/zhuce3.html',{scope:$scope})
      .then(function(modal){$scope.modalz3=modal})
    $scope.openzhuce3=function(){
      $scope.modalz3.show();
    }
    $scope.closezhuce3=function(){
      $scope.modalz3.hide();
    }
    //设置注册框的手机号和密码
    $scope.usermsg={userphone:'',userpwd:'',useryz:false};
    //点击获取下一步的方法
    $scope.zcbtn=function(zc){
      if(zc==1){
        var u=$scope.usermsg.userphone;
        if(!u){
          $scope.showAlert('手机号不能为空！');
          return;
        }else{
          var reg=/^(\+86|0086)?\s*1[34578]\d{9}$/;
          if(reg.test(u)){
            //自定义查询数据库不能重复输入手机号部分
            $kflHttp.sendRequest(
              'data/bl_userSelect.php?phone='+u,
              function (data) {
                if(!(data.msg=='succ')){
                  console.log(data);
                  $scope.openzhuce2();
                }else{
                  console.log(data);
                  $ionicPopup.alert({
                    title:'手机号已经存在,请重新输入'
                  })
                }
              }
            )
          }else{
            $scope.showAlert('手机号格式不正确！');
          }
        }
      }else if(zc==2){
        var u=$scope.usermsg.userpwd;
        if(!u){
          $scope.showAlert('密码不能为空！');
          return;
        }else{
          var reg=/^[a-zA-Z0-9]{6,10}$/;
          if(reg.test(u)){
            $scope.openzhuce3();
          }else{
            $scope.showAlert('密码格式不正确！');
          }
        }
      }else if(zc==3){
        //自定义请求方式 实现正常的数据库加载
        $kflHttp.sendRequest(
          'data/bl_adduser.php?phone='+$scope.usermsg.userphone+'&pwd='+$scope.usermsg.userpwd,
          function (data) {
            if(data.msg=='succ'){
              $ionicPopup.alert({
                title:'注册成功 去登录吧！'
              }).then(function(){
                $scope.closezhuce1();//关闭1界面
                $scope.closezhuce2();//关闭2界面
                $scope.closezhuce3();//关闭3界面
                $scope.opendenglu();
              })
            }
          }
        )
      }
    }
    //验证码发送提示
    $scope.fsyz=function(){
      $scope.usermsg.useryz=true;
    }
    //登录界面的摸态框
    $ionicModal.fromTemplateUrl('tpl/order/denglu.html',{scope:$scope})
      .then(function(modal){$scope.modald=modal})
    $scope.opendenglu=function(){
      if($scope.dlmsg.sfdl){
        $scope.dlmsg.sfdl=false;
        $scope.dlmsg.dlimg='denglu.png';
        return;
      }else{
        $scope.modald.show();
      }
    }
    $scope.closedenglu=function(){
      $scope.modald.hide();
      //此处查寻提示小图标的数值
    }
    //登录界面的请求方法
    //用户账号密码保存在dlmsg中  另外加上userid
    $scope.dlmsg={userphone:'',userpwd:'',sfdl:false,dlimg:'denglu.png',userid:0};
    $scope.dlbtn=function(){
      //console.log($scope.dlmsg);
      var p=$scope.dlmsg.userphone;
      var n=$scope.dlmsg.userpwd;
      if(!p){
        console.log(p);
        $scope.showAlert('账号不能为空！');
        return;
      }else if(!n){
        $scope.showAlert('密码不能为空！');
        return;
      }else{
        $kflHttp.sendRequest(
          'data/bl_userSelect.php?phone='+p, function (date) {
            if(date.msg=='succ'){
              if(date.data[0].pwd==n){
                //操作更改登录成功后的界面
                var userid=date.data[0].userid;
                $scope.dlmsg={userphone:'',userpwd:'',sfdl:true,dlimg:'ydl.png',userid:userid};
                $ionicPopup.alert({
                  title:'登录成功！'
                }).then(function(){
                  $scope.closedenglu();
                })
              }else{
                $scope.showAlert('密码输入有误 请确认！')
              }
            }else{
              $scope.showAlert('用户名不存在！')
            }
          }
        )
      }
    }
  }])
//start的控制器
app.controller('startCtrl', ['$scope', '$kflHttp',
  function ($scope, $kflHttp) {
    $scope.showColor(0);//开始界面的图标颜色
    //$scope.sliderimg=['img/lb1.png','img/lb1.png','img/lb1.png'];//盛放轮播的图片 不能这样写
    $scope.hasMore = true;
    $scope.info = {kw: '',sousuo:false};
    $scope.dishList = [];
    $kflHttp.sendRequest('data/dish_getbypage.php',
      function (data) {
        $scope.dishList = data;
      }
    )
    $scope.loadMore = function () {
      if($scope.hasMore) {
        $kflHttp.sendRequest(
          'data/dish_getbypage.php?start='
          +$scope.dishList.length,
          function (data) {
            if (data.length < 5) {
              $scope.hasMore = false;
            }
            $scope.dishList = $scope.dishList.concat(data);
            $scope.$broadcast('scroll.infiniteScrollComplete')
          });
      }
    }
    $scope.$watch('info.kw', function () {
      if ($scope.info.kw) {
        $scope.info.sousuo=true;
        $kflHttp.sendRequest(
          'data/dish_getbykw.php?kw=' + $scope.info.kw,
          function (data) {
            if (data.length > 0) {
              $scope.dishList = data;
            }
          }
        )
        $scope.hasMore=false;
      }else if($scope.info.sousuo){
        $scope.hasMore=true;
        $scope.dishList = [];
        $scope.loadMore();
    }
    })
  }])
//更多的控制器
app.controller('moreCtrl', ['$scope', '$ionicModal',
  function ($scope, $ionicModal) {
    $scope.showColor(3);//开始界面的图标颜色
    $ionicModal.fromTemplateUrl('tpl/more/settings.html',{scope:$scope})
      .then(function(modal){$scope.modal=modal})
    $scope.open=function(){
      $scope.modal.show();
    }
    $scope.close=function(){
      $scope.modal.hide();
    }
    $ionicModal.fromTemplateUrl('tpl/more/request.html',{scope:$scope})
      .then(function(modal){$scope.requ=modal})
    $scope.openrequ=function(){
      $scope.requ.show();
    }
    $scope.closerequ=function(){
      $scope.requ.hide();
    }
    //$kflHttp.sendRequest(
    //  'data/order_getbyuserid.php?userid=1',
    //  function (serverData) {
    //
    //    $scope.orderList = serverData.data;
    //  }
    //)
}])
//mymsg的控制器
app.controller('mymsgCtrl', ['$scope', '$ionicModal','$ionicPopup',
  function ($scope, $ionicModal,$ionicPopup) {
    $scope.showColor(2);//开始界面的图标颜色
    //定义统一的界面跳转摸态框
    $ionicModal.fromTemplateUrl('tpl/mymsg/mymsguser.html',{scope:$scope})
      .then(function(modal){$scope.modalmy=modal})
    $scope.openmymsguser=function(){
      $scope.modalmy.show();
    }
    $scope.closemymsguser=function(){
      $scope.modalmy.hide();
    }
    $scope.showPopup=function(){
      //定义一个提示登录的方法
      $ionicPopup.show({
        title:'温馨提示：您还没有登录！',
        buttons:[
          {text:'去登陆',onTap:function(){return true;}},
          {text:'忽略',onTap:function(){return false;}}
        ]
      }).then(function(result){
        if(result){
          $scope.opendenglu();
        }
      });
    }
    $scope.mymsgtitle={title:''};
    $scope.mymsgdl=function(val){
      if(!$scope.dlmsg.sfdl){
        if(val==1){
          $scope.showPopup();
        }else{
          $scope.opendenglu();
        }
      }else if($scope.dlmsg.sfdl){
        if(val==1){
          $scope.mymsgtitle.title='我的联票';
        }else if(val==2){
          $scope.mymsgtitle.title='我的消息';
        }else if(val==3){
          $scope.mymsgtitle.title='我的收藏';
        }else if(val==4){
          $scope.mymsgtitle.title='我的点评';
        }
        $scope.openmymsguser();
      }
    }
    $scope.$watch('phone',function() {
      //console.log($scope.phone)
      //console.log(123);
    });
    //$kflHttp.sendRequest(
    //  'data/order_getbyuserid.php?userid=1',
    //  function (serverData) {
    //
    //    $scope.orderList = serverData.data;
    //  }
    //)
}])
//order的控制器
app.controller('orderCtrl',['$scope','$kflHttp',function($scope,$kflHttp){
  $scope.showColor(1);//开始界面的图标颜色
  if($scope.dlmsg.sfdl){
    //定义一个函数发送请求
    $scope.orderdelatefun=function(){
      $kflHttp.sendRequest('data/bl_order.php?userid='+$scope.dlmsg.userid,
        function (data) {
          $scope.orderList = data.date;
        }
      )
    }
    //自调  请求到显示数据
    $scope.orderdelatefun();
    //求和 算得合计的价钱
    $scope.ordersum = function () {
      var result = 0;
      angular.forEach($scope.orderList, function (value, key) {
        result += (value.price * value.dishCount);
      })
      return result;
    }
    //点击删除按钮执行删除操作
    $scope.orderdelate=function(val){
      $kflHttp.sendRequest('data/bl_orderdelate.php?userid='+$scope.dlmsg.userid+
        '&did='+$scope.orderList[val].did,
        function (data) {
          if(data.msg=='succ'){
            $scope.orderdelatefun();
            $scope.showAlert('删除成功！');
          }else{
            $scope.showAlert('删除失败');
          }
        }
      )
    }
  }else{
    //console.log($stateParams.id+123);
  }
}])
//detail的控制器
app.controller('detailCtrl',['$scope','$kflHttp','$stateParams','$ionicPopup',
  function($scope,$kflHttp,$stateParams,$ionicPopup){
  //console.log($stateParams.id);
  //定义一个显示预定的参数
  $scope.detailYd=true;
  $scope.showPopup=function(){
    //同上自定义一个提示登录的方法
    $ionicPopup.show({
      title:'预定失败:您还没有登录！',
      buttons:[
        {text:'去登陆',onTap:function(){return true;}},
        {text:'忽略',onTap:function(){return false;}}
      ]
    }).then(function(result){
      if(result){
        $scope.opendenglu();
      }
    });
  }
  //默认发送请求到详细信息
  $kflHttp.sendRequest('data/detailinfo.php?did='+$stateParams.id,
    function (data) {
      $scope.detailList = data;
    }
  )
  //点击事件跳转登录
  $scope.detailOrder=function(){
    if(!$scope.dlmsg.sfdl){
      $scope.showPopup();
    }else if($scope.dlmsg.sfdl){
      if($scope.detailYd){
        $scope.detailYd=false;
        //添加订单的请求
        $kflHttp.sendRequest('data/detailyd.php?did='+$stateParams.id+
          '&userid='+$scope.dlmsg.userid,
          function (data) {
            if(data.msg=='succ'){
              $scope.showAlert('预定成功！');
            }
          }
        )
      }else{
        //这里传值跳转到订单详情页
        $scope.jump('order',{id:$stateParams.id});
      }
    }
  }
}])

