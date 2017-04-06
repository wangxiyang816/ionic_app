<?php
header("Content-Type:application/json");

@$kw = $_REQUEST['kw'];
if(empty($kw))
{
    echo '[]';
    return;
}

require('init.php');

$sql = "select * from bl_dish where name like '%$kw%' or address like '%$kw%'";
$result = mysqli_query($conn,$sql);
$output = [];
while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);



?>