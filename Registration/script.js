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

function delete_cookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}

function usernameTaken(){
  if(getCookie("usernameTaken") == "true"){
      var text = document.getElementById("errorMessage");
      text.textContent = "Username taken. Please enter new username.";
      text.style.display = "block";
  }
}

function badUsername(){
  if(getCookie("badUsername") == "true"){
      var text = document.getElementById("errorMessage");
      text.textContent = "Your username was too long. 15 character limit.";
      text.style.display = "block";
  }
}

function badPassword(){
  if(getCookie("badPassword") == "true"){
    var text = document.getElementById("errorMessage");
    text.textContent = "Your password was too long. 20 character limit.";
    text.style.display = "block";
}
}

function checkErrors(){
  badUsername();
  badPassword();
  usernameTaken();
}

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

function updateBadLogin(){
  document.cookie = "badLogin=false";
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

window.addEventListener("beforeunload", eraseCookies);
document.addEventListener("DOMContentLoaded", checkErrors);