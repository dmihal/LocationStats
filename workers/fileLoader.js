FileLoader = (function(){
  var reader = new FileReaderSync();
  
  var re = /<when>([0-9\-T:\.]+)<\/when>\n<gx:coord>(-?\d*(?:.\d+)?) (-?\d*(?:.\d+)?) 0<\/gx:coord>/g;
  
  function readPoints(xmlStr){
    var out = []
    while (match = re.exec(xmlStr)){
      var pnt = {
        date: new Date(match[1]),
        lat: Number.parseFloat(match[2]),
        lng: Number.parseFloat(match[3])
      }
      out.push(pnt);
    }
    return out;
  }
  
  return function(file){
    var xmlStr = reader.readAsText(file);
    var points = readPoints(xmlStr);
    return points;
  };
})();
