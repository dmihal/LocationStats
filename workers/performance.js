Performance = (function(){
  var startTimes = {}; 
  return {
    start: function(task){
      startTimes[task] = performance.now();
    },
    stop: function(task){
      var elapsed = performance.now() - startTimes[task];
      self.postMessage({
        cmd: "performance",
        task: task,
        time: elapsed
      });
    }
  }
})();
