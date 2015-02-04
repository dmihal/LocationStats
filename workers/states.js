importScripts('../lib/geojson-utils.js');

var stateData = null;
function loadStates(data){
  stateData = data;
}
importScripts('../data/states.js');

States = (function(){
  var stateStats = {};
  return {
    process: function(points){
      for (var i=0; i<points.length; i++){
        var pnt = points[i];
        var state = this.getState(pnt.lat, pnt.lng);
        stateStats[state.properties.STUSPS] = stateStats[state.properties.STUSPS] || {count:0};
        stateStats[state.properties.STUSPS].count++;
        if (!(i % 50)){
          self.postMessage({
            cmd: "progress",
            task: "Processing States",
            val: i,
            max: points.length
          });
        }
      }
    },
    getState: function(lat, lng){
      for (var i=0; i<stateData.features.length; i++){
        var state = stateData.features[i];
        if (gju.pointInPolygon({type:"Point",coordinates:[lat, lng]}, state.geometry)){
          stateData.features.splice(0, 0, stateData.features.splice(i, 1)[0]);
          return state;
        }
      }
      return {properties: {STUSPS: 'None'}};
    },
    getStats: function(){
      return stateStats;
    }
  };
})();
