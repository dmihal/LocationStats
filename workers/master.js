importScripts("misc.js");
importScripts("performance.js");

/* Load Modules */
var modules = [];
var handleMsg = function(e){
  self.postMessage(e.data);
};
var modInfo = loadJSON("modules.json");
for (var i = 0; i < modInfo.modules.length; i++) {
  var modName = modInfo.modules[i];
  var worker = new Worker(unCapitalize(modName) + ".js");
  worker.addEventListener("message", handleMsg);
  modules.push(worker);
}

/* Set up file loader */
var loader = new Worker("fileLoader.js");
loader.addEventListener('message', function(e) {
  if (e.data.cmd == "pnt"){
    for (var i = 0; i < modules.length; i++) {
      modules[i].postMessage(e.data);
    }
  }
});

var actions = {
  load: function(msg){
    loader.postMessage({
      cmd: "load",
      file: msg.files[0]
    });
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
  }
}
self.onmessage = function(e){
  if (actions[e.data.cmd]){
    actions[e.data.cmd](e.data);
  } else {
    throw "Incorrect command";
  }
};
