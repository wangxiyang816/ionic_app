<?php
/**
*查询指定用户的购物车内容
*请求参数：
  uid-用户ID，必需
*输出结果：
  {
    "uid": 1,
    "data":[
      {"cid":1,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':1},
      {"cid":3,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':3},
      ...
      {"cid":5,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':5}
    ]
  }
*/
@$userid = $_REQUEST['userid'] or die('userid required');

require('init.php');

$output['userid'] = $userid;

$sql = "SELECT bl_cart.userid,bl_cart.did,bl_cart.dishCount,bl_dish.name,bl_dish.img,bl_dish.price FROM bl_dish,bl_cart WHERE bl_cart.did=bl_dish.did AND bl_cart.userid=$userid";
$result = mysqli_query($conn,$sql);
$output['date'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);
