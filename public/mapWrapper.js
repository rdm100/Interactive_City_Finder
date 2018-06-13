const MapWrapper = function(location, zoom) {
  const osmLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  this.counter = 1;

  //-------------------------------------------------------------------------
  // This draws the map to the html by using the leaflet map framework.
  const mapDiv = document.querySelector('#main-map');
  this.map = L.map(mapDiv).addLayer(osmLayer).setView(location, zoom)

  //-------------------------------------------------------------------------
  // This function calls the draw pin  function to draw a marker with a popup
  // to the map.
  this.map.on('click', function(event) {
    this.drawPin(event.latlng);
  }.bind(this));

  //-------------------------------------------------------------------------
  // This function waits for the move to city button to be clicked then will
  // move the map to Chicago.
  const buttonCityMove = document.querySelector('#take-me-to');
  buttonCityMove.addEventListener('click', function(event) {
    this.moveMap([41.8781, -87.6298]);
  }.bind(this));

  //--------------------------------------------------------------------------
  // This function waits for the locate me button to be clicked then uses the
  // built in geolocation features of the browser to locate and move the map
  // to the users location.
  const whereAmI = document.querySelector('#where-am-i');
  whereAmI.addEventListener('click', function(event) {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.moveMap([position.coords.latitude, position.coords.longitude]);
    }.bind(this));
  }.bind(this));
}

//-------------------------------------------------------------------------
// This function creates a popup on the marker that was dropped and simply
// increments the value of the counter within the message.
MapWrapper.prototype.drawPin = function (coords) {
  var popup = L.popup().setContent(`Hello this is popup no: ${this.counter}`);
  L.marker(coords).addTo(this.map).bindPopup(popup).openPopup();
  this.counter += 1;
};

//--------------------------------------------------------------------------------
// This function simply moves the position of the map when the map is initalised.
MapWrapper.prototype.moveMap = function (coords) {
  this.map.panTo(coords);
};
