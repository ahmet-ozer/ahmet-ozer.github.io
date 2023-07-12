<?php
$usernames = fopen("../Data/usernames.txt", "r") or die("Unable to open username file!");
$passwords = fopen("../Data/passwords.txt", "r") or die("Unable to open password file!");

$loginMatched = false;
$usernameIndex = -1;

if (isset($_POST['username'])) {
    if (empty(trim($_POST['username']))) {
        setcookie("badLogin", "true", 0, '/', "localhost");
        header("Location: login.html");
        exit;
    }
    $count = 0;
    while(!feof($usernames)) {
        $count++;
        $username = trim(fgets($usernames));
        if($username == $_POST['username']){
            $usernameIndex = $count;
            break;
        }
    }
}

if (isset($_POST['password']) AND $usernameIndex != -1) {
    if (empty(trim($_POST['username']))) {
        setcookie("badLogin", "true", 0, '/', "localhost");
        header("Location: login.html");
        exit;
    }
    $count = 0;
    while(!feof($passwords)) {
        $count++;
        $password = trim(fgets($passwords));
        if($password == $_POST['password'] && $count == $usernameIndex){
            $loginMatched = true;
            break;
        }
    }
}

fclose($usernames);
fclose($passwords);

if($loginMatched){
    setcookie("username", $_POST['username'], 0, '/', "localhost");
    header("Location: ../Feed/feed.html");
    exit;
}
else{
    setcookie("badLogin", "true", 0, '/', "localhost");
    header("Location: login.html");
    exit;
}

?>