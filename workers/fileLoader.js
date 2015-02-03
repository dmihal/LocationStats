FileLoader = (function(){
  var reader = new FileReaderSync();
  
  function readPoints(xml){
    return [{date: 0, lat: 0, lng: 0}];
  }
  
  return function(file){
    var xmlStr = reader.readAsText(file);
    var points = readPoints(xmlStr);
    return points;
  };
})();
