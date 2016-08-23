
var episodes = [];
var episodeIndex = 0;

// load all episodes
function loadAllEpisodes() {
  var url = "http://officequotes.net/";
  load(url, parseAllEpisodes);
}

function parseAllEpisodes(html) {
  // gather all links on page
  console.log("parsing");
  var links = html.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var href = "http://officequotes.net/" + links[i].href.substring(links[i].href.indexOf("no"), links[i].href.length);
    if (isEpisode(href)) {
      episodes.push(
        {
          "episodeNumber": episodes.length + 1,
          "season": parseSeasonNum(href),
          "episode": parseEpisodeNum(href),
          "link": href,
          "title": links[i].innerHTML
        }
      );
    }
  }
  loadEpisode();
}

function loadEpisode() {
  console.log("loading episode");
  load(episodes[episodeIndex].link, parseEpisode);
}

function parseEpisode(html) {
  var quotes = html.getElementsByClassName("quote");
  episodes[episodeIndex].quotes = quotes;
  document.getElementById("epNum").innerHTML = episodeIndex;
  episodeIndex++;
  if (false) {//episodeIndex < episodes.length) {
    load(episodes[episodeIndex].link, parseEpisode);
  } else {
    document.getElementById("epNum").innerHTML = episodeIndex + " - done.";
  }
}

// determine if href is a link to an episode
function isEpisode(link) {
  return link.indexOf("no") >= 0 && link.indexOf("-") >= 0 && link.indexOf(".php") >= 0;
}

// parse the season and episode number from the href
function parseSeasonNum(link) {
  return parseInt(link.split("no")[1].split("-")[0]);
}
function parseEpisodeNum(link) {
  return parseInt(link.split("-")[1].split(".")[0]);
}



// load any url with a callback that returns an html element
function load(theURL, callback) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var xmlDoc = document.createElement("html");
      xmlDoc.innerHTML = xhttp.responseText;
      callback(xmlDoc);
    }
  }
  xhttp.open("GET", "http://mighty-falls-90233.herokuapp.com/get/?url=" + theURL, true);
  xhttp.send();
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
