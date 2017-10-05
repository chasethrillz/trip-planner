const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');
const selects = require('./selects');


mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25zMTIzIiwiYSI6ImNqOGJydmF2bDAxNXIycW8wd2MxZWV0YXMifQ.e2tHK-kLXKdoXZThDMOMEw';

const map = new mapboxgl.Map({
  container: 'map', // id of element in html to add map to
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', [-74.009, 40.705]);
marker.addTo(map);

//──────────────────────────────────────────────────────────────────────────────
//   Section to add user-created markers to map
// ─────────────────────────────────────────────────────────────────────────────
const dropdowns = {
  hotelsDropdown: document.getElementById('hotels-choices'),
  restaurantsDropdown: document.getElementById('restaurants-choices'),
  activitiesDropdown: document.getElementById('activities-choices')
};

let attractions = {};
let state = [];


fetch('/api')
.then((response) => {
  return response.json();
})
.then((places) => {
  //associate place coordinates with location name
  function plotCoordinates(resultVal, attraction) {
    resultVal[attraction].forEach((place) => {
      attractions[place.name] = place.place.location;
    });
  }
  plotCoordinates(places, 'hotels');
  plotCoordinates(places, 'restaurants');
  plotCoordinates(places, 'activities');
})
.then(() => {
  const options = document.getElementsByClassName('options-btn');

  Array.prototype.forEach.call(options, (button) => {
    button.addEventListener('click', (event) => {
      const addButton = event.target;
      const buttonCategory = addButton.id.slice(0, addButton.id.indexOf('-'));

      const targetList = document.getElementById(`${buttonCategory}-list`);
      const dropdownValue = dropdowns[`${buttonCategory}Dropdown`].value;
      const coordinates = attractions[dropdownValue];

      // Add chosen value to state to prevent duplicates in list
      if (state.indexOf(dropdownValue) === -1) {
        state.push(dropdownValue);
        const listItem = document.createElement('li');
        listItem.innerHTML = dropdownValue;
        targetList.append(listItem);

        const newMarker = buildMarker(buttonCategory, coordinates);
        newMarker.addTo(map);
        map.flyTo({ center: coordinates, zoom: 15 });

        const removeListItemButton = document.createElement('button');
        removeListItemButton.id = 'remove-list-item';
        removeListItemButton.innerHTML = 'X';
        listItem.append(removeListItemButton);

        // Remove marker and list item when 'X' is clicked
        removeListItemButton.addEventListener('click', function remove() {
          this.removeEventListener('click', remove);
          listItem.remove();
          newMarker.remove();
          state.splice(state.indexOf(dropdownValue), 1);
          map.flyTo({ center: [-74.009, 40.705], zoom: 12 });
        });
      }
    });
  });
});

