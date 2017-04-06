<?php
header("Content-Type:application/json");
@$did = $_REQUEST['did'];
if(empty($did))
{
    echo '[]';
    return;
}
require('init.php');
$sql = "select did,img_bg,kftime,ryway,qpway,dp,address from bl_dish where did='$did'";

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