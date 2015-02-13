Speed = (function(){
  
  function coord2miles(lat1, lng1, lat2, lng2){
    var d2r = Math.PI / 180.0;
    var dlng = (lng2 - lng1) * d2r;
    var dlat = (lat2 - lat1) * d2r;
    var a = Math.pow(Math.sin(dlat/2.0), 2) + Math.cos(lat1*d2r) * Math.cos(lat2*d2r) * Math.pow(Math.sin(dlng/2.0), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var miles = 3956 * c; 
    return miles;
  }
  
  var avgSpeed;
  return {
    process: function(points){
      Performance.start('CalculateSpeed');
      var lastPnt = null;
      var totalMiles = 0;
      var totalHours = 0;
      var HR_PER_MS = 1 / (1000 * 60 * 60);
      for (var i=0; i<points.length; i++){
        var pnt = points[i];
        if(lastPnt){
          var miles = coord2miles(pnt.lat, pnt.lng, lastPnt.lat, lastPnt.lng);
          var hours = (pnt.date - lastPnt.date) * HR_PER_MS;
          var mph = miles / hours;
          this.dateLog.addData(lastPnt.date, pnt.date, mph);
          
          totalMiles += miles;
          totalHours += hours;
        }
        lastPnt = pnt;
        
        self.postMessage({
          cmd: "progress",
          task: "Calculating Distance",
          val: i,
          max: points.length
        });
      }
      avgSpeed = totalMiles / totalHours;
      Performance.stop('CalculateSpeed');
    },
    dateLog: new DateLogger("Speed"),
    getAvgSpeed: function(){
      return avgSpeed;
    }
  };
})();
