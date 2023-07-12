
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

function badLogin(){
    if(document.cookie.length != 0 && getCookie("badLogin") == "true"){
        var text = document.getElementById("errorMessage");
        text.textContent = "Login unsuccessful. Please try again.";
        text.style.display = "block";
    }
}


function logAllCookies() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    console.log(cookie);
  }
}


//window.addEventListener('beforeunload', eraseCookies);

document.addEventListener("DOMContentLoaded", logAllCookies);
document.addEventListener("DOMContentLoaded", badLogin);