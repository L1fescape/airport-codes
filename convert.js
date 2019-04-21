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

var isbFixer = csv.transform(function(data) {
  if (data[5] == 'OPRN') {
    return [data[0], 'Islamabad International Airport', data[2], data[3], 'ISB', data[5], data[6], data[7], data[8], data[9]];
  } else {
    return data;
  }
});

var dohFixer = csv.transform(function (data) {
  if (data[5] == 'OTBD') {
    return [data[0], 'Hamad International Airport', data[2], data[3], 'DOH', data[5], data[6], data[7], data[8], data[9]];
  } else {
    return data;
  }
})

readStream
  .pipe(csv.parse())
  .pipe(isbFixer)
  .pipe(dohFixer)
  .pipe(transformer)
  .pipe(JSONStream.stringify())
  .pipe(writeStream);
