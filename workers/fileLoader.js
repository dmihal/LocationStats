FileLoader = (function(){
  var reader = new FileReaderSync();
  
  var re = /<when>([0-9\-T:\.]+)<\/when>\n<gx:coord>(-?\d*(?:.\d+)?) (-?\d*(?:.\d+)?) 0<\/gx:coord>/g;
  
  var file;
  var filePos = 0;
  var chunkSize = 256 * 1024;

  function openFile(f){
    file = f;
  }
  function getNextChunk(){
    var end = chunkSize + filePos;
    var blob = file.slice(filePos, end);
    filePos = end;
    var str = reader.readAsText(blob);

    self.postMessage({
      cmd: "progress",
      task: "Reading DataPoints",
      val: filePos,
      max: file.size
    });
    return str;
  }
  function readPoints(xmlStr){
    var xmlFragment = "";
    var chunk;
    while (chunk = getNextChunk()){
      xmlFragment += chunk;
      var sliceAmmt = 0;
      var match;
      while (match = re.exec(xmlFragment)){
        var pnt = {
          date: new Date(match[1]),
          lat: Number.parseFloat(match[2]),
          lng: Number.parseFloat(match[3])
        }
        self.postMessage({
          cmd: "pnt",
          pnt: pnt
        });
        sliceAmmt = match.index + match[0].length;
      }
      xmlFragment = xmlFragment.slice(sliceAmmt);
    }
  }
  
  return function(file){
    Performance.start('FileReader');
    openFile(file);
    readPoints();
    Performance.stop('FileReader');
  };
})();

self.onmessage = function(e){
  if (e.data.cmd == "load"){
    FileLoader(e.data.file);
  }
};
