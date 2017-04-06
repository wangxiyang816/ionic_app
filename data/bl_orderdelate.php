<?php
@$userid = $_REQUEST['userid'] or die('userid required');
@$did = $_REQUEST['did'] or die('did required');
require('init.php');
$sql = "delete from bl_cart where userid=$userid AND did=$did";
$result = mysqli_query($conn,$sql);
$output=[];
if($result){
  $output['msg'] ='succ';
}
echo json_encode($output);