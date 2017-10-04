const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');
const selects = require('./selects.js'); 
const itinerary = require('./itinerary');
mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25zMTIzIiwiYSI6ImNqOGJydmF2bDAxNXIycW8wd2MxZWV0YXMifQ.e2tHK-kLXKdoXZThDMOMEw';


const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', [-74.009, 40.705]);
marker.addTo(map);

