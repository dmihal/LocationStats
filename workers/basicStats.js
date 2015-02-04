BasicStats = (function(){
  var days = [];
  
  function getDate(dateStr){
    var day;
    if (days.length > 0){
      var lastDay = days[days.length - 1];
      if (lastDay.date == dateStr){
        day = lastDay;
      }
    }
    if (!day){
      day = {
        date: dateStr,
        numPts: 0
      }
      days.push(day);
    }
    return day;
  }
  
  return {
    process: function(points){
      var lastPnt = null;
      
      for (var i=0; i<points.length; i++){
        var pnt = points[i];
        var dateStr = pnt.date.toDateString();
        
        var day = getDate(dateStr);
        day.numPts++;
        
        lastPnt = pnt;
      }
    },
    numDays: function(){
      return days.length;
    }
  }; 
})();
