<?php
header("Content-Type:application/json");
@$phone = $_REQUEST['phone'];
@$pwd = $_REQUEST['pwd'];
if(empty($pwd) || empty($phone))
{
    echo '[]';
    return;
}
require('init.php');
$sql = "insert into bl_user values(null,'$pwd','$phone')";
$result = mysqli_query($conn,$sql);
$output = [];
if($result){
  $output['msg']='succ';
}
echo json_encode($output);
?>