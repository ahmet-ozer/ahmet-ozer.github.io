<?php
    
    
    $feed = "";

    $globalString = file_get_contents('../Data/global.json');
    $globalData = json_decode($globalString, true);
    $postCount = $globalData['postCount'];
    $idArray = array();
    for ($i = 1; $i <= $postCount; $i++) {
        array_push($idArray, $i);
    }
    $feedCount = 0;
    while($feedCount < $postCount && $feedCount < 50){
        if(count($idArray) == 1){
            $feed = $feed . $idArray[0] . ":";
            unset($idArray[0]);
            $idArray = array_values($idArray);
            $feedCount++;
        }
        else{
            $rand = random_int(0, count($idArray)-1);
            $feed = $feed . $idArray[$rand] . ":";
            unset($idArray[$rand]);
            $idArray = array_values($idArray);
            $feedCount++;
        }
    }

    setcookie('feed', $feed, 0, '/', "localhost");
    header("Location: feed.html");
    
    exit;
?>