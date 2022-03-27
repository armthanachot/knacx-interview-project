<?php
$foodname = $_POST["foodname"];
$foodprice = $_POST["foodprice"];
$food_data[] = array(
    "foodname" => $foodname,
    "foodprice" => $foodprice
);
$foodlist = json_encode($food_data);
echo $foodlist;
?>