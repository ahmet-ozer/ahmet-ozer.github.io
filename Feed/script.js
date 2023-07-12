function eraseCookies() {
  // Get all cookies
  var cookies = document.cookie.split(';');

  // Delete each cookie by setting its expiration to a past date
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var cookieName = cookie.split('=')[0].trim();
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

}

function getCookie(c_name) {
  var c_value = " " + document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
      c_value = null;
  }
  else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1) {
          c_end = c_value.length;
      }
      c_value = decodeURIComponent(c_value.substring(c_start,c_end));
  }
  return c_value;
}

/*window.addEventListener('beforeunload', function() {
  // Get all cookies
  var cookies = document.cookie.split(';');

  // Delete each cookie by setting its expiration to a past date
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var cookieName = cookie.split('=')[0].trim();
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
});*/

function checkFeedString(){
    var feed = getCookie("feed");
    if(feed == null){
        console.log("Going to get feed!");
        window.location.href = "feed.php";
        return false;
    }
    else{
        console.log(feed);
        return true;
    }
}

function loadPost(postId) {
  var parentPost = document.getElementById("dummyPost");
  var post = parentPost.cloneNode(true);
  post.id = postId;
  post.style.display = "block";
  //get json data
  var fileName = "../Data/Posts/" + postId + ".json";
  var postTitle = "", postAuthor = "", postText = "", postFile = "", postLikes = -1;
  fetch(fileName)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Work with the JSON data
      postTitle = data.Title;
      postAuthor = data.Author;
      postText = data.Text;
      postLikes = data.Likes;
      if(data.hasOwnProperty("File")) postFile = data.File;
      //update children
      var header = post.children[0];
      var content = post.children[1];
      var interactions = post.children[2];
      for(var i = 0; i < header.children.length; i++){
        if(header.children[i].id == "title")
          header.children[i].textContent = postTitle; // Use textContent to set the text
        if(header.children[i].id == "author")
          header.children[i].textContent = postAuthor;
      }
      for(var i = 0; i < content.children.length; i++){
        if(content.children[i].id == "text"){
          if(postText != "") content.children[i].textContent = postText;
          else {content.children[i].style.display = "none";}
        }
        if(content.children[i].id == "image"){
          if(data.hasOwnProperty("File")) content.children[i].src = postFile;
          else {content.children[i].style.display = "none";}
        }
      }
      for(var i = 0; i < interactions.children.length; i++){
        if(interactions.children[i].id == "like"){
          //check if user already liked
          var userLiked = false;
          var element = interactions.children[i];
          fetch("../Data/User Data/" + getCookie('username') + '.json')
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            if(data.postsLiked.length){
              for(var p of data.postsLiked){
                if(p == postId){
                  userLiked = true;
                  break;
                }
              }
            }
            if(userLiked){
              element.value = "Unlike";
            }
            else{
              element.value = "Like";
            }
            element.addEventListener('click', like);
          })
          .catch(function(error) {
            console.log('Error:', error);
          });
        }
        if(interactions.children[i].id == "likes"){
          interactions.children[i].textContent = postLikes + " Like(s)";
        }
      }
      document.body.appendChild(post);
    })
    .catch(function(error) {
      console.log('Error:', error);
  });
}

function loadFeed(){
    var feedString;
    if(checkFeedString() == true){
        feedString = getCookie("feed");
        var index = 0;
        var postId = "";
        while(index < feedString.length){
          if(feedString[index] == ':'){
            postId = "";
            index++;
            continue;
          }
          else{
            while(feedString[index] != ':'){
              postId += feedString[index];
              index++;
            }
            loadPost(postId);
          }
        }
    }
}

function logAllCookies() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    console.log(cookie);
  }
}

function getNewFeed(){
  var referrer = document.referrer;
  if(referrer != "http://localhost:8000/Feed/feed.html"){
    console.log(referrer);
    window.location.href = "feed.php";
  }
}

async function like() {
  var postId = this.parentNode.parentNode.id; // Access the parent node ID of the clicked button

  var params = {
    postId: postId,
    userWhoLiked: getCookie('username')
  };

  var url;
  if(this.value == "Like"){
    url = new URL('http://localhost:8000/Feed/like.php');
  }
  else{
    url = new URL('http://localhost:8000/Feed/unlike.php');
  }
  url.search = new URLSearchParams(params).toString();

  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Request failed. Status code: ' + response.status);
      }
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });

  if(this.value == "Like"){
    this.value = "Unlike";
  }
  else{
    console.log("UNLIKE!");
    this.value = "Like";
  }
  var filePath = "../Data/Posts/" + postId + ".json";
  var element = this; // Store a reference to "this" in a separate variable

  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const data = await response.json();
      document.getElementById(postId).children[2].children[1].textContent = data.Likes + " Like(s)"; // Use the stored reference to update the element
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}



function setButtons(){
  var button = document.getElementById("logout");
  button.addEventListener('click', eraseCookies);

  button = document.getElementById("post");
  button.addEventListener('click', function() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var cookieName = cookie.split('=')[0].trim();
      if (cookieName != "username")
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  });
}

function checkLogin(){
  if(getCookie("username") == null){
    window.location.href = "../Log-In/login.html";
  }
}

function load(){
  checkLogin();
  logAllCookies();
  loadFeed();
  setButtons();
}

document.addEventListener("DOMContentLoaded", load);

//document.addEventListener("DOMContentLoaded", getNewFeed);