FileLoader = (function(){
  var reader = new FileReaderSync();
  
  var re = /<when>([0-9\-T:\.]+)<\/when>\n<gx:coord>(-?\d*(?:.\d+)?) (-?\d*(?:.\d+)?) 0<\/gx:coord>/g;
  
  function readPoints(xmlStr){
    Performance.start('FileParser');
    var out = [];
    while (match = re.exec(xmlStr)){
      var pnt = {
        date: new Date(match[1]),
        lat: Number.parseFloat(match[2]),
        lng: Number.parseFloat(match[3])
      }
      out.push(pnt);

      self.postMessage({
        cmd: "progress",
        task: "Reading DataPoints",
        val: match.index,
        max: xmlStr.length
      });
    }
    Performance.stop('FileParser');
    return out;
  }
  
  return function(file){
    Performance.start('FileReader');
    var xmlStr = reader.readAsText(file);
    Performance.stop('FileReader');
    var points = readPoints(xmlStr);
    return points;
  };
})();
