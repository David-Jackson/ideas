// load any url with a callback that returns an html element
// theURL (String) - URL to retrieve
// callback (function) - function to call after response has been loaded
// responseType (String) - "html", "json", "xml"

function load(theURL, callback, responseType) {
  var xhttp, doc;
  responseType = responseType || "html";
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (responseType == "html") {
        doc = document.createElement("html");
        doc.innerHTML = xhttp.responseText;
      } else if (responseType == "xml") {
        doc = xhttp.responseXML;
      } else if (responseType == "json") {
        doc = JSON.parse(xhttp.responseText);
      }
      callback(doc);
    }
  }
  xhttp.open("GET", "http://mighty-falls-90233.herokuapp.com/get/?url=" + theURL, true);
  xhttp.send();
}
