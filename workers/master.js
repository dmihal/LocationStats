importScripts("fileLoader.js");
importScripts("basicStats.js");
importScripts("states.js");

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
    
    States.process(points);
    self.postMessage({
      cmd: "status",
      msg: "States: " + JSON.stringify(States.getStats(), null, ' ')
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
