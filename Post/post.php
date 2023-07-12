<?php
    
    // Set error reporting to include warnings
    error_reporting(E_ALL);

    // Custom error handler function
    function handleWarning($errno, $errstr, $errfile, $errline) {
        if ($errno === E_WARNING) {
            echo "A warning occurred: $errstr";
            exit(); // Exit the script
        }
    }

    // Set the custom error handler
    set_error_handler("handleWarning");
    
    $upload['Author'] = $_COOKIE['username'];
    
    // Read the JSON file
    $globalString = file_get_contents('../Data/global.json');

    // Convert the JSON string to an associative array
    $globalData = json_decode($globalString, true);
    
    // Access the data
    $count = $globalData['postCount'] + 1;
    
    
    if (isset($_POST['title'])) {
        if(empty(trim($_POST['title']))){
            setcookie("noTitle", "true", 0, '/', "localhost");
            header("Location: post.html");
            exit;
        }
        if(strlen($_POST['title']) > 30){
            setcookie("longTitle", "true", 0, '/', "localhost");
            header("Location: post.html");
            exit;
        }
        $upload['Title'] = $_POST['title'];
    }
    
    if (isset($_POST['text'])) {
        if(strlen($_POST['text']) > 200){
            setcookie("longText", "true", 0, '/', "localhost");
            header("Location: post.html");
            exit;
        }
        $upload['Text'] = $_POST['text'];
    }
    if(isset($_FILES['file']) && !empty(trim($_FILES['file']['name']))){
        if($_FILES['file']['size'] == 0){
            setcookie("fileTooBig", "true", 0, '/', "localhost");
            header("Location: post.html");
            exit;
        }
        //check extension
        $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $valid = false;
        $validExtensions = array("jpeg", "jpg", "png", "gif", "svg", "webp", "bmp", "ico");
        $variable = "validExtensions";
        foreach($$variable as $ext){
            if(strtolower($extension) == $ext){
                $valid = true;
                break;
            }
        }
        if(!$valid){
            setcookie("wrongFileType", "true", 0, '/', "localhost");
            header("Location: post.html");
            exit;
        }
        $targetDirectory = '../Data/Files/'; // Specify the target directory where you want to save the image
        $_FILES['file']['name'] = $count . "." . strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
        $targetFile = $targetDirectory . basename($_FILES['file']['name']); // Construct the target file path
        move_uploaded_file($_FILES['file']['tmp_name'], $targetFile);
        $upload['File'] = $targetFile;
    }

    $upload['Likes'] = 0;

    $jsonString = json_encode($upload);
    $targetDirectory = '../Data/Posts/'; // Specify the target directory where you want to save the JSON file

    $fileName = $count . '.json'; // Specify the name of the JSON file
    $targetFile = $targetDirectory . $fileName; // Construct the target file path
    // Write the JSON string to the file
    file_put_contents($targetFile, $jsonString);
    header("Location: ../Feed/feed.html");
    //update count
    $globalData['postCount'] = $count;
    $globalString = json_encode($globalData, JSON_PRETTY_PRINT);
    file_put_contents('../Data/global.json', $globalString);
?>