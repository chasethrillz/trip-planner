const express = require('express'); 
const router = express.Router(); 
const models = require('../models');
// const db = models.db; MIGHT NOT BE NEEDED
const Hotel = models.Hotel;
const Restaurant = models.Restaurant;
const Activity = models.Activity;
const Place = models.Place;

const allAttractions = {};

const attractionsArr = [Hotel.findAll({ include: [Place] })
.then(hotels => {
  allAttractions.hotels = hotels;
  return hotels;
}),
Restaurant.findAll({ include: [Place] })
.then(restaurants => {
  allAttractions.restaurants = restaurants;
  return restaurants;
}),
Activity.findAll({ include: [Place] })
.then(activities => {
  allAttractions.activities = activities;
  return activities;
})];

router.route('/') // ===> (url/api)
.get((req, res, next) => {
  Promise.all(attractionsArr)
  .then(() => {
    res.json(allAttractions);
  })
  .catch(next);
});


module.exports = router;
