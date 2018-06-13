const app = function(){
  const url = 'https://restcountries.eu/rest/v2/all';
  const url2 = 'https://api.coinmarketcap.com/v2/ticker/';
  makeRequest(url, requestComplete);
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
    populateList(contries);
}

const populateList = function(contries) {
  const ul = document.querySelector('#country-list')
  const selectBox = document.createElement('select');
  selectBox.classList.add('#select-country')

  contries.forEach(function(country) {
    const option = document.createElement('option');
    option.textContent = `${country.name}`;
    selectBox.appendChild(option);
  })
  ul.appendChild(selectBox);
}

window.addEventListener('load', app);
