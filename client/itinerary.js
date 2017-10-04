const buildMarker = require('./marker'); 

const dropdowns = {
  hotelsDropdown: document.getElementById('hotels-choices'),
  restaurantsDropdown: document.getElementById('restaurants-choices'),
  activitiesDropdown: document.getElementById('activities-choices')
};

let attractions = {};

fetch('/api')
.then((response) => {
  return response.json();
})
.then(function (places) {
  //associate place coordinates with location name
  attractions = places;
});


const options = document.getElementsByClassName('options-btn');

Array.prototype.forEach.call(options, (button) => {
  button.addEventListener('click', (event) => {
    const addButton = event.target;
    const buttonCategory = addButton.id.slice(0, addButton.id.indexOf('-'));

    const targetList = document.getElementById(`${buttonCategory}-list`);
    const dropdownValue = dropdowns[`${buttonCategory}Dropdown`].value;
    const listItem = document.createElement('li'); 
    listItem.innerHTML = dropdownValue;
    targetList.appendChild(listItem);

    buildMarker(buttonCategory)
  });
});

