<?php
header("Content-Type:application/json");
@$phone = $_REQUEST['phone'];
if(empty($phone))
{
    echo '[]';
    return;
}
require('init.php');
$sql = "select * from bl_user where phone='$phone'";

$result = mysqli_query($conn,$sql);
$output = [];
$row = mysqli_fetch_all($result, MYSQLI_ASSOC);
if(empty($row))
{
    echo '[]';
}
else
{
    $output['msg'] = 'succ';
    $output['data']=$row;
    echo json_encode($output);
}
?>