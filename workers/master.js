importScripts("performance.js");
importScripts("fileLoader.js");
importScripts("basicStats.js");
importScripts("dateLogger.js");
importScripts("speed.js");

points = [];

var actions = {
  load: function(msg){
    for (var i = 0, f; f = msg.files[i]; i++) {
     points = FileLoader(f); 
    }
    self.postMessage({
      cmd: "status",
      msg: "Parsed " + points.length + " points"
    });
    BasicStats.process(points);
    var days = BasicStats.numDays();
    self.postMessage({
      cmd: "status",
      msg: "Found " + days + " days, " + (points.length / days) + " points/day"
    });
    
    Speed.process(points);
    var speed = Speed.getAvgSpeed();
    self.postMessage({
      cmd: "status",
      msg: "Average speed: "+speed+"mph"
    });
  }
}
self.onmessage = function(e){
  if (actions[e.data.cmd]){
    actions[e.data.cmd](e.data);
  } else {
    throw "Incorrect command";
  }
};
