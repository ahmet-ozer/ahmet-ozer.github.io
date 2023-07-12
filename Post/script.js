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

function logAllCookies() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    console.log(cookie);
  }
}

function noTitle(){
  if(getCookie("noTitle") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "Post needs title.";
    text.style.display = "block";
  }
}

function fileTooBig(){
  if(getCookie("fileTooBig") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "File too big. Max size is 2 MB";
    text.style.display = "block";
  }
}

function wrongFileType(){
  if(getCookie("wrongFileType") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "Wrong file type. Accepted extensions are .jpeg, .jpg, .png, .gif, .svg, .webp, .bmp, .ico";
    text.style.display = "block";
  }
}

function longTitle(){
  if(getCookie("longTitle") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "Title too long. 30 characters max.";
    text.style.display = "block";
  }
}

function longText(){
  if(getCookie("longText") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "Text too long. 200 characters max.";
    text.style.display = "block";
  }
}

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  // use the 1st file from the list
  let f = files[0];
  
  let reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
      return function(e) {
      };
    })(f);

    
}

function checkErrors(){
  noTitle();
  fileTooBig();
  wrongFileType();
  longTitle();
  longText();
}

document.addEventListener("DOMContentLoaded", logAllCookies);
document.addEventListener("DOMContentLoaded", checkErrors);