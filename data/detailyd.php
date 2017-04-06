<?php
/**
*更新购物车中商品的信息
*请求参数：
  uid-用户ID，必需
  did-dishID，必需
  count-更新的产品数量 必须 如果为-1，则是在之前基础上加一，如果为其他值，就是设置为该值
*输出结果：
* {"code":1,"msg":"succ"}//加入成功
* 或
* {"code":2,"msg":"succ"}//更新数量成功
*/
@$userid = $_REQUEST['userid'] or die('userid required');
@$did = $_REQUEST['did'] or die('did required');
if(empty($did)|empty($userid))
{
    echo '[]';
    return;
}
require('init.php');

//判断购物车表中是否已经存在该商品记录
$sql = "SELECT ctid FROM bl_cart WHERE userid=$userid AND did=$did";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  //如果之前有过记录，则更新购买数量加1
  $sql = "update bl_cart set dishCount=dishCount+1 where userid=$userid AND did=$did";
  mysqli_query($conn,$sql);
  $output['code'] = 2;
  $output['msg'] = 'succ';
}else {     //之前从未购买过该商品，则添加购买记录，购买数量为1
  $sql = "INSERT INTO bl_cart VALUES(NULL,$userid, $did,1)";
  mysqli_query($conn,$sql);
  $output['code'] = 1;
  $output['msg'] = 'succ';
}
echo json_encode($output);
