const drawMap = function() {
  //--------------------------------------
  // Initial location to draw the map to.
  var glasgow = [55.8642, -4.2518];
  const zoom = 15;
  const mainMap = new MapWrapper(glasgow, zoom);
}

window.addEventListener('load', drawMap);
