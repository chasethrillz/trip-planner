// const buildMarker = require('./marker');

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// THE FUNCTIONALITY HERE IS THE SAME AS IN INDEX.JS
// COULDN'T GET THE MARKER TO SHOW UP ON THE MAP DUE TO ERRORS PASSING IT
// FROM THE INDEX.JS FILE TO HERE
// ────────────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────────────────

// const dropdowns = {
//   hotelsDropdown: document.getElementById('hotels-choices'),
//   restaurantsDropdown: document.getElementById('restaurants-choices'),
//   activitiesDropdown: document.getElementById('activities-choices')
// };

// let attractions = {};

// fetch('/api')
// .then((response) => {
//   return response.json();
// })
// .then((places) => {
//   //associate place coordinates with location name
//   function plotCoordinates(resultVal, attraction) {
//     resultVal[attraction].forEach((place) => {
//       attractions[place.name] = place.place.location;
//     });
//   }
//   plotCoordinates(places, 'hotels');
//   plotCoordinates(places, 'restaurants');
//   plotCoordinates(places, 'activities');
// })
// .then(() => {
//   const options = document.getElementsByClassName('options-btn');

//   Array.prototype.forEach.call(options, (button) => {
//     button.addEventListener('click', (event) => {
//       const addButton = event.target;
//       const buttonCategory = addButton.id.slice(0, addButton.id.indexOf('-'));

//       const targetList = document.getElementById(`${buttonCategory}-list`);
//       const dropdownValue = dropdowns[`${buttonCategory}Dropdown`].value;
//       const listItem = document.createElement('li');
//       listItem.innerHTML = dropdownValue;
//       targetList.appendChild(listItem);

//       const marker = buildMarker(buttonCategory, attractions[dropdownValue]);
//       marker.addTo(map);
//     });
//   });
// });

