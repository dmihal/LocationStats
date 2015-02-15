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
  
  var lastPnt = null;
  return {
    processPnt: function(pnt){
      var dateStr = pnt.date.toDateString();

      var day = getDate(dateStr);
      day.numPts++;
      
      lastPnt = pnt;
    },
    numDays: function(){
      return days.length;
    }
  };
})();

self.onmessage = function(e){
  if (e.data.cmd == "pnt"){
    BasicStats.processPnt(e.data.pnt);
  }
};
