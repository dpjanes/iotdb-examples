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
 *  - it will display C/F temperature changes
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    "auto_load_models" : true,
    "auto_load_drivers" : true,
    "auto_iotdb_device_get" : false,
    "auto_iotdb_device_create" : false
});

iot.on_register_things(function() {
    var arduino_tty = iot.cfg_get("arduino_tty")
    assert.ok(arduino_tty && arduino_tty.length)

    iot.discover({
        model: "FirmataGroveThermistor",
        driver_iri: ":firmata",
        initd : {
            api: arduino_tty,
            pin: 1
        }
    })
})

iot.on_thing_with_model("FirmataGroveThermistor", function(iot, thing) {
    thing.on("temperature_c", function(thing, attribute, value) {
        console.log("+ temperature (C)", value)
    })
    thing.on("temperature_f", function(thing, attribute, value) {
        console.log("+ temperature (F)", value)
    })
})
