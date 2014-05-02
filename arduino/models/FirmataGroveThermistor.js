/*
 *  FirmataGroveThermistor.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 */

"use strict";

var iotdb = require("iotdb")
var attribute = iotdb.attribute

exports.Model = iotdb.make_model('FirmataGroveThermistor')
    .product("http://www.seeedstudio.com/depot/Grove-Temperature-Sensor-p-774.html")
    .help("make sure to set initd.pin (analog)")
    .attribute(
        iotdb.make_value("temperature_c")
            .unit(":temperature.si.celsius")
    )
    .attribute(
        iotdb.make_value("temperature_f")
            .unit(":temperature.si.fahrenheit")
    )
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.pins = "value:mode=analog-input"
        paramd.initd.B = 3975.0;
    })
    .driver_in(function(paramd) {
        if (paramd.driverd.value !== undefined) {
            var A = paramd.driverd.value * 1023
            var R = (1023.0 - A) * 10000.0 / A
            var B = paramd.initd.B

            paramd.thingd.temperature_c = (1.0 / ((Math.log(R/10000.0) / B) + 1.0/298.15)) - 273.15;
            paramd.thingd.temperature_f = paramd.thingd.temperature_c * 9 / 5 + 32
        }
    })
    .make()
    ;
