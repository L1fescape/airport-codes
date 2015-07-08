var csv = require('csv');
var JSONStream = require('JSONStream');
var fs = require('fs');
var _ = require('lodash');

var columns = ['id', 'name', 'city', 'country', 'iata', 'icao', 'latitude', 'longitude', 'altitude', 'timezone', 'dst', 'tz'];

var readStream = fs.createReadStream('airports.dat');
var writeStream = fs.createWriteStream('airports.json');

var transformer = csv.transform(function(data) {
  return _.object(columns, data);
});

readStream
  .pipe(csv.parse())
  .pipe(transformer)
  .pipe(JSONStream.stringify())
  .pipe(writeStream);
