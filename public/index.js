const app = function(){
  const url = 'https://restcountries.eu/rest/v2/all';
  const url2 = 'https://api.coinmarketcap.com/v2/ticker/';
  makeRequest(url, requestComplete);
  displaySelectedOption();
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function() {
  if (this.status !== 200) return;
  const contries = JSON.parse(this.response);
    console.log(contries);
    populateList(contries, contries);
}

const populateList = function(contries, response) {
  const section = document.querySelector('#country-list');
  const selectBox = document.createElement('select');
  selectBox.classList.add('#select-country')

  contries.forEach(function(country) {
    const option = document.createElement('option');
    option.textContent = `${country.name}`;
    selectBox.appendChild(option);
  })
  section.appendChild(selectBox);

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
      }
    });
  });
}

window.addEventListener('load', app);
