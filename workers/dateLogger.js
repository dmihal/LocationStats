DateLogger = (function(){
  function initializedArray(length, value){
    var array = new Array(length);
    for (var i=length-1; i>=0; i--){
      array[i] = value;
    }
    return array;
  }
  
  var DateLogger = function(name){
    this.valuesByHour = initializedArray(24, 0);
    this.scalesByHour = initializedArray(24, 0);
  };
  DateLogger.prototype.addData = function(from, to, value){
    var scale = to - from;
    var scalledValue = value * scale;
    if (from.getHours() == to.getHours()){
      this.valuesByHour[from.getHours()] += scalledValue;
      this.scalesByHour[from.getHours()] += scale;
    }
  };
  DateLogger.prototype.getHourlyData = function(){
    var output = this.valuesByHour.map(function(val, index){
      return (val / this.scalesByHour[index]) || 0;
    }, this);
    return output;
  }
  
  return DateLogger;
})();
