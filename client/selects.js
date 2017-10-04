const hotelsDropdown = document.getElementById('hotels-choices');
const restaurantsDropdown = document.getElementById('restaurants-choices');
const activitiesDropdown = document.getElementById('activities-choices');

fetch('/api')
.then((response) => {
  return response.json();
})
.then((place) => {
  populateDropdowns(place, 'hotels', hotelsDropdown);
  populateDropdowns(place, 'restaurants', restaurantsDropdown);
  populateDropdowns(place, 'activities', activitiesDropdown);
})
.catch(console.log);

// Helper function to populate dropdowns dynamically
function populateDropdowns(resultVal, attraction, dropdown) {
  resultVal[attraction].forEach((attractionLocation) => {
    const attractionLocationOption = document.createElement('option');
    attractionLocationOption.innerHTML = attractionLocation.name;
    dropdown.appendChild(attractionLocationOption);
  });
}
