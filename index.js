var airportsJSON = require('./airports.json');
var Backbone = require('backbone');

var airports = new Backbone.Collection(airportsJSON);

airports.comparator = 'name';

module.exports = airports;
