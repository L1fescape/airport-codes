var csv = require('csv');
var JSONStream = require('JSONStream');
var fs = require('fs');
var _ = require('lodash');

var columns = ['id', 'name', 'primary', 'secondary', 'city', 'country', 'iata', 'icao', 'latitude', 'longitude', 'altitude', 'timezone', 'dst', 'tz'];

var readStream = fs.createReadStream('airports.dat');
var writeStream = fs.createWriteStream('airports.json');

var transformer = csv.transform(function (data) {
  const object = _.object(columns, data);

  const primary = object.primary
  const secondary = object.secondary.length ? object.secondary : null

  object.displayNames = {
    primary,
    secondary
  }

  delete object.primary
  delete object.secondary

  return object
});

readStream
  .pipe(csv.parse())
  .pipe(transformer)
  .pipe(JSONStream.stringify())
  .pipe(writeStream);
