<?php
    //update likes in posts json file
    $postId = $_GET['postId'];

    //open json file
    $jsonPost = file_get_contents("../Data/Posts/" . $postId . ".json");
    $postData = json_decode($jsonPost, true);
    $postData['Likes']--;
    $jsonPost = json_encode($postData, JSON_PRETTY_PRINT);
    file_put_contents("../Data/Posts/" . $postId . ".json", $jsonPost);

    //update users json file
    $userWhoLiked = $_GET['userWhoLiked'];
    $userFileDirectory = "../Data/User Data/" . $userWhoLiked . ".json";
    $jsonString = file_get_contents($userFileDirectory);
    $userData = json_decode($jsonString, true);
    $index = array_search($postId, $userData['postsLiked']);
    unset($userData['postsLiked'][$index]);
    $jsonUser = json_encode($userData, JSON_PRETTY_PRINT);
    file_put_contents($userFileDirectory, $jsonUser);
?>