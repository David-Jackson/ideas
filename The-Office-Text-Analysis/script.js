

var text = "<b>Pam:</b> Hey.<b>Jim:</b> Hey.<b>Jim:</b> How are things?<b>Pam:</b> Good. I thought you were going out for a drink with...<b>Jim:</b> Oh no, I just decided not to. How's your headache?<b>Pam:</b> It's better, thanks.<b>Jim:</b> Good. Good.<b>Pam:</b> Yeah.<b>Jim:</b> That's great<b>Pam:</b> Is...?<b>Jim:</b> Yeah?<b>Pam:</b> Um... Are you...<b>Jim:</b> Am I walking out?<b>Pam:</b> Yes.<b>Jim:</b> Yes, I... Do you want to...<b>Pam:</b> Yeah.<b>Jim:</b> Great. Let me just...<b>Jim:</b> [Car horn honking] Oh, Roy.<b>Pam:</b> Yeah. Listen, have a nice weekend.<b>Jim:</b> Yeah, definitely. You too. Enjoy it. [looks at camera] You know what, just come here.";

var arr = text.split("<b>");
arr.splice(0,1);

for (var i = 0; i < arr.length; i++) {
  var a = arr[i].split(":</b>");
  arr[i] = {
    "saidBy": a[0],
    "line": a[1].trim()
  };
}

console.log(arr);







 /* Beginning of Loading Episodes */
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
  //episodes[episodeIndex].quotes = [];
  episodes[episodeIndex].lines = [];
  for (var i = 0; i < quotes.length; i++) {
    var quote = quotes[i].innerHTML.trim().replaceAll("<br>", "");
    var qArr = quote.split("\n");
    for (var j = 0; j < qArr.length; j++) {
      qArr[j] = qArr[j].trim();
    }
    quote = qArr.join("");
    episodes[episodeIndex].quotes.push(quote);
  }

  document.getElementById("epNum").innerHTML = episodeIndex;
  episodeIndex++;
  if (episodeIndex < episodes.length) {
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





String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
 /* End of Loading Episodes */
