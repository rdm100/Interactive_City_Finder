

const app = function(){

  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);
  var glasgow = [55.8642, -4.2518];
  const zoom = 15;
  mainMap = new MapWrapper(glasgow, zoom);
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load',callback);
  request.send();
}

const requestComplete = function() {
  if (this.status !== 200) return;
  const response = JSON.parse(this.response);
    console.log(response);
    populateList(response);
}

const populateList = function(response) {
  const section = document.querySelector('#country-list');
  const selectBox = document.createElement('select');
  selectBox.classList.add('#select-country')

  response.forEach(function(country) {
    const option = document.createElement('option');
    option.textContent = `${country.name}`;
    selectBox.appendChild(option);
  })
  section.appendChild(selectBox);

  displaySelectedOption(section, selectBox, response);
}

const displaySelectedOption = function (section, selectBox, response) {
  selectBox.addEventListener('change', function() {
    const ul = document.createElement('ul');
    const liCountryName = document.createElement('li');
    const liPopulation = document.createElement('li');
    const liCapital = document.createElement('li');
    response.forEach(function(country) {
      if (country.name === selectBox.value) {
          liCountryName.textContent = country.name;
          liPopulation.textContent = country.population;
          liCapital.textContent = country.capital;
          ul.appendChild(liCapital);
          ul.appendChild(liPopulation);
          ul.appendChild(liCountryName);
          section.appendChild(ul);
          storeSelectionInStorage(country.name, country.population, country.capital);
          getLocationData(country.name);
      }
    });
  });
}

const getLocationData = function(countryName) {
  url = 'https://api.teleport.org/api/cities/?search=' + countryName;
  const requestTeleportCity = new XMLHttpRequest();
  requestTeleportCity.open("GET", url);
  requestTeleportCity.addEventListener('load', overallData);
  requestTeleportCity.send();
}

const overallData = function() {
  if (this.status !== 200) return;
    const response = JSON.parse(this.response);
    let url = response['_embedded']['city:search-results'][0]['_links']['city:item']['href'];
    console.log(url);
    makeSecondCall(url);
}

const makeSecondCall = function(url) {
  const cityData = new XMLHttpRequest();
  cityData.open("GET", url);
  cityData.addEventListener('load', locationData);
  cityData.send();
}

const locationData = function() {
  if (this.status !== 200) return;
    const response = JSON.parse(this.response);
    var lonLat = [response['location']['latlon']['latitude'],response['location']['latlon']['longitude']];
    mainMap.moveMap(lonLat);
}

const storeSelectionInStorage = function(name, population, capital) {
  var country = {
    name: name,
    population: population,
    capital: capital
  };

  const JsonString = JSON.stringify(country);
  localStorage.setItem('country', JsonString);
}

window.addEventListener('load', app);
