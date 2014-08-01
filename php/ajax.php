<?php

$last15pvArr = getData(20000, 40000);
$last15uvArr = getData(10000, 20000);

foreach ($last15uvArr as $key => $value) {
    $xAxis[] = date("H:i",strtotime(substr($key, -4)));
    $datauv[] = $value['all'];
    $time[] = $key;
}

foreach ($last15pvArr as $key => $value) {
    $datapv[] = $value['all'];
}

$dataArray["xAxis"] = $xAxis;
$dataArray["datapv"] = $datapv;
$dataArray["datauv"] = $datauv;
$dataArray["uvyAxis"] = getYaxis($datauv);
$dataArray["pvyAxis"] = getYaxis($datapv);
$dataArray["uvMax"] = $datauv[array_search(max($datauv), $datauv)];
$dataArray["uvMaxTime"] = $time[array_search(max($datauv), $datauv)];

print_r(json_encode($dataArray));


function getYaxis($arr) {
    $arrMaxKey = array_search(max($arr), $arr);
    $arrMinKey = array_search(min($arr), $arr);
    $arrMax = $arr[$arrMaxKey];
    $arrMin = $arr[$arrMinKey];

    $mid = ($arrMax - $arrMin) / 5;

    $start["min"] = ceil($arrMin - $mid);
    $start["max"] = ceil($arrMax + $mid);
    return $start;
}

function getData($b, $e) {
    for ($i=15; $i > -1; $i--) {
        $arr[date('YmdHi',strtotime("-".$i." min"))] = array(
            "all" => rand($b,$e)
        );
    }
    return $arr;
}
