/*
 *  FirmataThreeAxisCompass.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  Connect the Grove Three Axis Compass
 *  to the I2C connector
 *
 *  Declination computed for Toronto using
 *  http://magnetic-declination.com/
 *
 *  Make sure to update declination for your location
 */

"use strict";

var iotdb = require("iotdb")

var MAGNETIC_DECLINATION = -10.5

iotdb
    .iot()
    .connect({
        model: "FirmataThreeAxisCompass",
        declination: MAGNETIC_DECLINATION,
    })
    .on(':heading', function(thing, attribute, value) {
        console.log("+ heading", value)
    })
