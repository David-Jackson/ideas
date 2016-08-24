JSONArray json;
Table lines;
void setup() {
  size(600,200);
  
  lines = new Table();
  lines.addColumn("id");
  lines.addColumn("show");
  lines.addColumn("season");
  lines.addColumn("episode");
  lines.addColumn("person");
  lines.addColumn("line");
  
  json = loadJSONArray("quotes.json");  
  println("Got it");
  println(json.size());
  
  for (int i = 0; i < json.size(); i++) {
    JSONObject show = json.getJSONObject(i);
    int epNum = show.getInt("episodeNumber");
    int ep = show.getInt("episode");
    int s = show.getInt("season");
    JSONArray quotes = show.getJSONArray("quotes");
    
    for (int j = 0; j < quotes.size(); j++) {
      String[] arr = quotes.getString(j).split("<b>");
      for (int k = 1; k < arr.length; k++) {
        String[] a = arr[k].split("</b>");
        
        TableRow newRow = lines.addRow();
        newRow.setInt("id", lines.getRowCount() - 1);
        newRow.setInt("show", epNum);
        newRow.setInt("season", s);
        newRow.setInt("episode", ep);
        newRow.setString("person", a[0].trim());
        if(a.length > 1) {
          newRow.setString("line", a[1].trim());
        }
      }
    }
  }
  
  saveTable(lines, "data/quotes.csv");
  
  println("DONE");
}

void draw() {
  background(51);
  ellipse(width/2, height/2, frameCount % (2*width), frameCount % (2*height));
}