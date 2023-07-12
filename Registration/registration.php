<?php
$usernames = fopen("../Data/usernames.txt", "r") or die("Unable to open username file!");

$usernameTaken = false;

//check if username is taken
if (isset($_POST['username'])) {
    //check that it isnt too long
    if(strlen($_POST['username']) > 15){
        setcookie("badUsername", "true", 0, '/', "localhost");
        header("Location: registration.html");
        exit;
    }
    while(!feof($usernames)) {
        $username = trim(fgets($usernames));
        if($username == $_POST['username']){
            $usernameTaken = true;
            break;
        }
    }
}

//check that it isnt too long
if(strlen($_POST['password']) > 20){
    setcookie("badPassword", "true", 0, '/', "localhost");
    header("Location: registration.html");
    exit;
}

if($usernameTaken){
    setcookie("usernameTaken", "true", 0, '/', "localhost");
    header("Location: registration.html");
    exit;
}

else{
    $usernamesAppend = fopen("../Data/usernames.txt", "a") or die("Unable to open username file!");
    $passwordsAppend = fopen("../Data/passwords.txt", "a") or die("Unable to open username file!");
    fwrite($usernamesAppend, PHP_EOL . $_POST['username']);
    fwrite($passwordsAppend, PHP_EOL . $_POST['password']);
    fclose($usernamesAppend);
    fclose($passwordsAppend);

    $emptyArray = [];
    $userData = array(
        'username' => $_POST['username'],
        'password' => $_POST['password'],
        'postsLiked' => $emptyArray,
    );
    $jsonString = json_encode($userData);
    file_put_contents("../Data/User Data/" . $_POST['username'] . ".json", $jsonString);
    header("Location: ../Log-In/login.html");
}

?>