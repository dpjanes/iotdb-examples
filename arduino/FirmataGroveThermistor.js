/*
 *  FirmataGroveThermistor.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  - connect a Grove Thermistor 
 *    (http://www.seeedstudio.com/depot/Grove-Temperature-Sensor-p-774.html)
 *    to pin A1.
 *  - it will display C temperature changes
 *
 *  IMPORTANT: do these commands
 *
 *  iotdb-control set firmata/firmata-grove-thermistor/tty /dev/tty.usbmodem411 
 *  iotdb-control set firmata/firmata-grove-thermistor/pin 1
 */

"use strict";

var iotdb = require("iotdb")

iotdb
    .iot()
    .connect("FirmataGroveThermistor")
    .on(':temperature', function(thing, attribute, value) {
        console.log("+ temperature (C)", value)
    })
